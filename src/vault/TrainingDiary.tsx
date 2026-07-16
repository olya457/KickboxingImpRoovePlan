import React, { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from './persistKit';

export interface TrainingEntry {
  date: string;
  drills: string[];
  updatedAt: number;
}

type DiaryEntries = Record<string, TrainingEntry>;

interface TrainingDiaryApi {
  entries: DiaryEntries;
  saveEntry: (date: string, drills: string[]) => void;
  removeEntry: (date: string) => void;
}

const TrainingDiaryCtx = createContext<TrainingDiaryApi | null>(null);

export const TrainingDiaryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value, commit } = usePersistedState<DiaryEntries>('training-diary', {});

  const api = useMemo<TrainingDiaryApi>(
    () => ({
      entries: value,
      saveEntry: (date, drills) =>
        commit(prev => ({
          ...prev,
          [date]: { date, drills, updatedAt: Date.now() },
        })),
      removeEntry: date =>
        commit(prev => {
          const next = { ...prev };
          delete next[date];
          return next;
        }),
    }),
    [value, commit],
  );

  return <TrainingDiaryCtx.Provider value={api}>{children}</TrainingDiaryCtx.Provider>;
};

export const useTrainingDiary = () => {
  const ctx = useContext(TrainingDiaryCtx);
  if (!ctx) throw new Error('useTrainingDiary outside provider');
  return ctx;
};
