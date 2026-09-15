import AsyncStorage from '@react-native-async-storage/async-storage';

import { DAILY_COUNT, dayNumber } from '@/logic/daily';
import { QUIZ_CACHE_KEY, useQuizStore } from '../useQuizStore';

const DAY = dayNumber(Date.UTC(2026, 8, 15));
const reset = () => useQuizStore.setState({ days: {} });

beforeEach(async () => {
  await AsyncStorage.clear();
  reset();
});

describe('answering', () => {
  it('records an answer against its day and question', () => {
    useQuizStore.getState().answer(DAY, 0, true);
    expect(useQuizStore.getState().answersFor(DAY)).toEqual([true]);
  });

  it('keeps the first answer, so a question cannot be retried into a better score', () => {
    useQuizStore.getState().answer(DAY, 0, false);
    useQuizStore.getState().answer(DAY, 0, true);
    expect(useQuizStore.getState().answersFor(DAY)).toEqual([false]);
  });

  it('knows when the day is finished', () => {
    for (let i = 0; i < DAILY_COUNT; i += 1) {
      expect(useQuizStore.getState().isComplete(DAY)).toBe(false);
      useQuizStore.getState().answer(DAY, i, true);
    }
    expect(useQuizStore.getState().isComplete(DAY)).toBe(true);
  });

  it('scores the day', () => {
    useQuizStore.getState().answer(DAY, 0, true);
    useQuizStore.getState().answer(DAY, 1, false);
    useQuizStore.getState().answer(DAY, 2, true);
    expect(useQuizStore.getState().scoreFor(DAY)).toBe(2);
  });

  it('reports nothing for a day never played', () => {
    expect(useQuizStore.getState().answersFor(DAY)).toEqual([]);
    expect(useQuizStore.getState().scoreFor(DAY)).toBe(0);
  });
});

describe('streaks', () => {
  const complete = (day: number) => {
    for (let i = 0; i < DAILY_COUNT; i += 1) useQuizStore.getState().answer(day, i, true);
  };

  it('counts only days that were finished', () => {
    complete(DAY - 1);
    complete(DAY);
    useQuizStore.getState().answer(DAY - 2, 0, true); // started, not finished
    expect(useQuizStore.getState().streak(DAY)).toBe(2);
  });

  it('is zero when today is unfinished', () => {
    complete(DAY - 1);
    expect(useQuizStore.getState().streak(DAY)).toBe(0);
  });
});

describe('hydrate', () => {
  it('restores answers', async () => {
    useQuizStore.getState().answer(DAY, 0, true);
    await useQuizStore.getState().persist();
    reset();
    await useQuizStore.getState().hydrate();
    expect(useQuizStore.getState().answersFor(DAY)).toEqual([true]);
  });

  it('starts empty rather than throwing on unreadable storage', async () => {
    await AsyncStorage.setItem(QUIZ_CACHE_KEY, 'nope');
    await useQuizStore.getState().hydrate();
    expect(useQuizStore.getState().answersFor(DAY)).toEqual([]);
  });

  it('drops anything that is not a list of booleans', async () => {
    await AsyncStorage.setItem(
      QUIZ_CACHE_KEY,
      JSON.stringify({ days: { [DAY]: ['yes', true], [DAY - 1]: [true] } }),
    );
    await useQuizStore.getState().hydrate();
    expect(useQuizStore.getState().answersFor(DAY)).toEqual([]);
    expect(useQuizStore.getState().answersFor(DAY - 1)).toEqual([true]);
  });
});
