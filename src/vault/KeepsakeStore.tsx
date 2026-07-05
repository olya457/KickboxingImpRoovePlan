import React, { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from './persistKit';

interface KeepsakeShape {
  drills: string[];
  reads: string[];
}

interface KeepsakeApi {
  savedDrills: string[];
  savedReads: string[];
  isDrillSaved: (id: string) => boolean;
  isReadSaved: (id: string) => boolean;
  toggleDrill: (id: string) => void;
  toggleRead: (id: string) => void;
}

const KeepsakeCtx = createContext<KeepsakeApi | null>(null);

const flip = (list: string[], id: string) =>
  list.includes(id) ? list.filter(x => x !== id) : [...list, id];

export const KeepsakeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value, commit } = usePersistedState<KeepsakeShape>('keepsake', {
    drills: [],
    reads: [],
  });

  const api = useMemo<KeepsakeApi>(
    () => ({
      savedDrills: value.drills,
      savedReads: value.reads,
      isDrillSaved: id => value.drills.includes(id),
      isReadSaved: id => value.reads.includes(id),
      toggleDrill: id => commit(p => ({ ...p, drills: flip(p.drills, id) })),
      toggleRead: id => commit(p => ({ ...p, reads: flip(p.reads, id) })),
    }),
    [value, commit],
  );

  return <KeepsakeCtx.Provider value={api}>{children}</KeepsakeCtx.Provider>;
};

export const useKeepsake = () => {
  const ctx = useContext(KeepsakeCtx);
  if (!ctx) throw new Error('useKeepsake outside provider');
  return ctx;
};
