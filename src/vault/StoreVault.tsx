import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, Linking, Platform } from 'react-native';
import {
  useIAP,
  finishTransaction as finalizeTx,
  getAvailablePurchases as queryAvailablePurchases,
  getActiveSubscriptions as queryActiveSubscriptions,
  type Purchase,
  type PurchaseError,
} from 'react-native-iap';
import { useTierGate } from './TierGate';

export type PlanId = 'month' | 'year' | 'life';

export const PLAN_SKUS: Record<PlanId, string> = {
  month: 'com.kickboxing.improove.premium.monthly',
  year: 'com.kickboxing.improove.premium.yearly',
  life: 'com.kickboxing.improove.premium.lifetime',
};

const SUB_SKUS = [PLAN_SKUS.month, PLAN_SKUS.year];
const ONCE_SKUS = [PLAN_SKUS.life];

const MANAGE_URL = Platform.select({
  ios: 'https://apps.apple.com/account/subscriptions',
  android: 'https://play.google.com/store/account/subscriptions',
  default: 'https://apps.apple.com/account/subscriptions',
});

const isCancel = (err?: PurchaseError) => {
  const code = String(err?.code ?? '').toLowerCase();
  return code.includes('cancel');
};

// Entitlement is derived from the store (never trusted from the client alone).
// hasLifetime = a non-consumable purchase is owned.
// hasActiveSub = an active, non-expired subscription exists.
const entitledFrom = (purchases: Purchase[], activeSubs: { productId: string; isActive: boolean }[]) => {
  const hasLifetime = purchases.some(p => p.productId === PLAN_SKUS.life);
  const hasActiveSub = activeSubs.some(
    s => s.isActive && SUB_SKUS.includes(s.productId),
  );
  return hasLifetime || hasActiveSub;
};

// Gate before unlocking. Rejects pending purchases. The production step is a
// server-side receipt/JWS check — send `purchase.purchaseToken` to your backend,
// validate it with Apple/Google, and only then trust the entitlement.
const verifyPurchase = async (purchase: Purchase): Promise<boolean> => {
  if (purchase.purchaseState === 'pending') return false;
  // TODO(server): POST purchase.purchaseToken to your backend for App Store /
  // Play Developer API validation; return its verdict instead of `true`.
  return true;
};

interface StoreApi {
  ready: boolean;
  busy: boolean;
  priceFor: (plan: PlanId) => string | null;
  buy: (plan: PlanId) => Promise<void>;
  restore: () => Promise<void>;
  manage: () => void;
}

const StoreCtx = createContext<StoreApi | null>(null);

export const StoreVaultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const tier = useTierGate();
  const [busy, setBusy] = useState(false);

  const onPurchaseSuccess = useCallback(
    (purchase: Purchase) => {
      (async () => {
        if (purchase.purchaseState === 'pending') {
          setBusy(false);
          Alert.alert(
            'Purchase Pending',
            'Your purchase is awaiting approval. Premium will unlock once it completes.',
          );
          return;
        }
        const ok = await verifyPurchase(purchase);
        if (!ok) {
          setBusy(false);
          Alert.alert('Purchase Not Verified', 'This purchase could not be verified.');
          return;
        }
        // Finalizes AND acknowledges (Android) the transaction.
        try {
          await finalizeTx({ purchase, isConsumable: false });
        } catch {}
        tier.unlock();
        setBusy(false);
        Alert.alert(
          'Premium Unlocked',
          'Enjoy full access to Kickboxing ImpRoove Plan!',
        );
      })();
    },
    [tier],
  );

  const onPurchaseError = useCallback((err: PurchaseError) => {
    setBusy(false);
    if (!isCancel(err)) {
      Alert.alert('Purchase Failed', err?.message ?? 'Please try again later.');
    }
  }, []);

  const {
    connected,
    products,
    subscriptions,
    fetchProducts,
    requestPurchase,
  } = useIAP({ onPurchaseSuccess, onPurchaseError });

  // Re-derive entitlement from the store on launch: active subscription OR
  // owned lifetime. Expired subscriptions correctly drop Premium.
  const syncEntitlement = useCallback(async () => {
    try {
      const [purchases, activeSubs] = await Promise.all([
        queryAvailablePurchases(),
        queryActiveSubscriptions(),
      ]);
      if (entitledFrom(purchases ?? [], activeSubs ?? [])) {
        tier.unlock();
      } else {
        tier.relinquish();
      }
    } catch {}
  }, [tier]);

  useEffect(() => {
    if (!connected) return;
    fetchProducts({ skus: SUB_SKUS, type: 'subs' });
    fetchProducts({ skus: ONCE_SKUS, type: 'in-app' });
    syncEntitlement();
  }, [connected, fetchProducts, syncEntitlement]);

  const priceFor = useCallback(
    (plan: PlanId) => {
      const sku = PLAN_SKUS[plan];
      const hit = [...products, ...subscriptions].find(p => p.id === sku);
      return hit?.displayPrice ?? null;
    },
    [products, subscriptions],
  );

  const buy = useCallback(
    async (plan: PlanId) => {
      const sku = PLAN_SKUS[plan];
      const subs = plan !== 'life';
      if (!connected) {
        Alert.alert(
          'Store Unavailable',
          'The store is not reachable. On the simulator, run from Xcode with the StoreKit configuration selected, or test on a real device.',
        );
        return;
      }
      setBusy(true);
      try {
        if (subs) {
          const found = subscriptions.find(s => s.id === sku) as any;
          // Google requires exactly one selected offer token, not all of them.
          const firstOffer = found?.subscriptionOfferDetailsAndroid?.[0];
          const offers =
            Platform.OS === 'android' && firstOffer
              ? [{ sku, offerToken: firstOffer.offerToken }]
              : [];
          await requestPurchase({
            request: {
              apple: { sku },
              google: { skus: [sku], subscriptionOffers: offers },
            },
            type: 'subs',
          });
        } else {
          await requestPurchase({
            request: { apple: { sku }, google: { skus: [sku] } },
            type: 'in-app',
          });
        }
        // Success/failure resolves asynchronously via the listeners above,
        // which own the `busy` reset. Only synchronous throws land here.
      } catch (e: any) {
        setBusy(false);
        if (!isCancel(e)) {
          Alert.alert('Purchase Failed', e?.message ?? 'Please try again later.');
        }
      }
    },
    [connected, requestPurchase, subscriptions],
  );

  const restore = useCallback(async () => {
    if (!connected) {
      Alert.alert('Store Unavailable', 'Please try again later.');
      return;
    }
    setBusy(true);
    try {
      // Use the returned arrays directly — do not read possibly-stale hook state.
      const [purchases, activeSubs] = await Promise.all([
        queryAvailablePurchases(),
        queryActiveSubscriptions(),
      ]);
      if (entitledFrom(purchases ?? [], activeSubs ?? [])) {
        tier.unlock();
        Alert.alert('Purchases Restored', 'Your Premium access has been restored.');
      } else {
        tier.relinquish();
        Alert.alert('Nothing to Restore', 'No active Premium purchase was found.');
      }
    } catch (e: any) {
      Alert.alert('Restore Failed', e?.message ?? 'Please try again later.');
    } finally {
      setBusy(false);
    }
  }, [connected, tier]);

  // Cancelling a subscription must happen in the store, not in-app.
  const manage = useCallback(() => {
    Linking.openURL(MANAGE_URL).catch(() => {});
  }, []);

  const api = useMemo<StoreApi>(
    () => ({ ready: connected, busy, priceFor, buy, restore, manage }),
    [connected, busy, priceFor, buy, restore, manage],
  );

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore outside provider');
  return ctx;
};

export const STORE_PLATFORM = Platform.OS;
