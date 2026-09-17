/**
 * The capture-mode price, end to end.
 *
 * `capture-price.test.ts` proves the fallback returns a package. This proves the
 * paywall actually *renders* its price — which is the only reason the fallback
 * exists, and the thing 21 pending App Store screenshots depend on.
 *
 * Worth testing separately because the two halves fail independently: the
 * package can be correct and the screen can still show its no-price variant, in
 * which case the capture looks plausible and says nothing about what the
 * purchase costs. That is exactly the defect that reached ten live IAP review
 * screenshots.
 */
import React from 'react';

import Paywall from '../paywall';
import { renderWithProviders } from '@/components/__tests__/renderWithProviders';
import { lifetimePackage } from '@/monetization/purchases';
import { usePremiumStore } from '@/store/usePremiumStore';

const ORIGINAL_PRICE = process.env.EXPO_PUBLIC_CAPTURE_PRICE;
const ORIGINAL_MODE = process.env.EXPO_PUBLIC_CAPTURE_MODE;

function seedFromFallback() {
  usePremiumStore.setState({
    isPremium: false,
    isReady: true,
    // The real fallback, not a fixture: if it stops returning a package this
    // test fails for the right reason.
    lifetime: lifetimePackage(null),
    isPurchasing: false,
    error: null,
    refreshOfferings: jest.fn().mockResolvedValue(undefined),
    purchase: jest.fn().mockResolvedValue('purchased'),
    restore: jest.fn().mockResolvedValue('none'),
  } as never);
}

afterEach(() => {
  if (ORIGINAL_PRICE === undefined) delete process.env.EXPO_PUBLIC_CAPTURE_PRICE;
  else process.env.EXPO_PUBLIC_CAPTURE_PRICE = ORIGINAL_PRICE;
  if (ORIGINAL_MODE === undefined) delete process.env.EXPO_PUBLIC_CAPTURE_MODE;
  else process.env.EXPO_PUBLIC_CAPTURE_MODE = ORIGINAL_MODE;
  (globalThis as { __DEV__?: boolean }).__DEV__ = true;
});

describe('Paywall in capture mode with no store', () => {
  it('shows the real price on the buy button', async () => {
    (globalThis as { __DEV__?: boolean }).__DEV__ = true;
    process.env.EXPO_PUBLIC_CAPTURE_MODE = '1';
    process.env.EXPO_PUBLIC_CAPTURE_PRICE = '3.99';
    seedFromFallback();

    const { getByText } = await renderWithProviders(<Paywall />);
    // The assertion a reviewer makes: can I see what this costs.
    getByText(/3\.99/);
  });

  it('shows no fabricated price in a release build', async () => {
    // The guard that matters. A store screenshot may state a price the build was
    // told; a shipped app may only state one the store gave it.
    (globalThis as { __DEV__?: boolean }).__DEV__ = false;
    process.env.EXPO_PUBLIC_CAPTURE_MODE = '1';
    process.env.EXPO_PUBLIC_CAPTURE_PRICE = '3.99';
    seedFromFallback();

    const { queryByText } = await renderWithProviders(<Paywall />);
    expect(queryByText(/3\.99/)).toBeNull();
  });
});
