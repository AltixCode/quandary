import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';

import Home from '../index';
import { testRouter } from './testRouter';
import { renderWithProviders } from '@/components/__tests__/renderWithProviders';
import { t } from '@/i18n';
import { DAILY_COUNT, dayNumber, questionsFor } from '@/logic/daily';
import { useAdsConsentStore } from '@/store/useAdsConsentStore';
import { usePremiumStore } from '@/store/usePremiumStore';
import { useQuizStore } from '@/store/useQuizStore';

const TODAY = dayNumber(Date.now());

beforeEach(async () => {
  jest.clearAllMocks();
  await AsyncStorage.clear();
  usePremiumStore.setState({ isPremium: false, isReady: true });
  useAdsConsentStore.setState({ consent: { canServeAds: true, offerPrivacyOptions: false } });
  useQuizStore.setState({ days: {} });
});

describe('Home', () => {
  it('renders the app name and routes to settings', async () => {
    const { getByText, getByLabelText } = await renderWithProviders(<Home />);
    expect(getByText(t('appName'))).toBeTruthy();
    await fireEvent.press(getByLabelText(t('settingsTitle')));
    expect(testRouter.push).toHaveBeenCalledWith('/settings');
  });

  it('shows a banner to a free user and none to a premium one', async () => {
    const free = await renderWithProviders(<Home />);
    expect(free.queryByTestId('banner-ad')).not.toBeNull();
    usePremiumStore.setState({ isPremium: true });
    const paid = await renderWithProviders(<Home />);
    expect(paid.queryByTestId('banner-ad')).toBeNull();
  });

  it('asks the first question of the day', async () => {
    const { getByText } = await renderWithProviders(<Home />);
    expect(getByText(questionsFor(TODAY)[0]!.prompt)).toBeTruthy();
    expect(getByText(t('questionOf', { n: 1, total: DAILY_COUNT }))).toBeTruthy();
  });

  it('marks a correct answer and explains it', async () => {
    const q = questionsFor(TODAY)[0]!;
    const { getByLabelText, getByText } = await renderWithProviders(<Home />);
    await fireEvent.press(getByLabelText(q.options[q.answerIndex]!));
    await waitFor(() => expect(getByText(t('correctTitle'))).toBeTruthy());
    expect(getByText(q.explanation)).toBeTruthy();
  });

  it('marks a wrong answer and still explains it, which is the point', async () => {
    const q = questionsFor(TODAY)[0]!;
    const wrong = (q.answerIndex + 1) % q.options.length;
    const { getByLabelText, getByText } = await renderWithProviders(<Home />);
    await fireEvent.press(getByLabelText(q.options[wrong]!));
    await waitFor(() => expect(getByText(t('wrongTitle'))).toBeTruthy());
    expect(getByText(q.explanation)).toBeTruthy();
  });

  it('will not let the same question be answered twice', async () => {
    const q = questionsFor(TODAY)[0]!;
    const wrong = (q.answerIndex + 1) % q.options.length;
    const { getByLabelText } = await renderWithProviders(<Home />);
    await fireEvent.press(getByLabelText(q.options[wrong]!));
    await fireEvent.press(getByLabelText(q.options[q.answerIndex]!));
    await waitFor(() => expect(useQuizStore.getState().answersFor(TODAY)).toEqual([false]));
  });

  it('shows the score once the day is finished', async () => {
    useQuizStore.setState({ days: { [TODAY]: [true, true, false, true, true] } });
    const { getByText } = await renderWithProviders(<Home />);
    expect(getByText(t('doneTitle'))).toBeTruthy();
    expect(getByText(t('scoreLine', { score: 4, total: DAILY_COUNT }))).toBeTruthy();
  });

  it('shows a streak once consecutive days are finished', async () => {
    const full = [true, true, true, true, true];
    useQuizStore.setState({ days: { [TODAY]: full, [TODAY - 1]: full } });
    const { getByText } = await renderWithProviders(<Home />);
    expect(getByText(t('streakLabel', { n: 2 }))).toBeTruthy();
  });

  // The paid claim: the archive beyond the free window.
  it('sends a free user opening an old day to the paywall', async () => {
    const { getAllByLabelText } = await renderWithProviders(<Home />);
    // Every locked day shares the same label, so take the first rather than
    // asking for a unique match that cannot exist.
    await fireEvent.press(getAllByLabelText(t('dayLocked'))[0]!);
    expect(testRouter.push).toHaveBeenCalledWith('/paywall');
  });

  it('lets a premium user open one', async () => {
    usePremiumStore.setState({ isPremium: true, isReady: true });
    const { getByLabelText, getByText } = await renderWithProviders(<Home />);
    await fireEvent.press(getByLabelText('-9'));
    await waitFor(() => expect(getByText(questionsFor(TODAY - 9)[0]!.prompt)).toBeTruthy());
  });
});
