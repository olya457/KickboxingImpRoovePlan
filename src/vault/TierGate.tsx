import React, { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from './persistKit';

interface TierApi {
  premium: boolean;
  unlock: () => void;
  restore: () => void;
  relinquish: () => void;
}

const TierCtx = createContext<TierApi | null>(null);

export const TierGateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value, commit } = usePersistedState<boolean>('tier', false);

  const api = useMemo<TierApi>(
    () => ({
      premium: value,
      unlock: () => commit(true),
      restore: () => commit(true),
      relinquish: () => commit(false),
    }),
    [value, commit],
  );

  return <TierCtx.Provider value={api}>{children}</TierCtx.Provider>;
};

export const useTierGate = () => {
  const ctx = useContext(TierCtx);
  if (!ctx) throw new Error('useTierGate outside provider');
  return ctx;
};
