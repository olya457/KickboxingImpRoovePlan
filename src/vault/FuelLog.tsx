import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { usePersistedState } from './persistKit';

export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

interface FuelShape {
  dayKey: string;
  goalId: string | null;
  goalKcal: number | null;
  meals: Record<MealSlot, number>;
  history: { day: string; total: number; goal: number }[];
}

interface FuelApi {
  goalId: string | null;
  goalKcal: number | null;
  meals: Record<MealSlot, number>;
  total: number;
  history: { day: string; total: number; goal: number }[];
  setGoal: (id: string, kcal: number) => void;
  logMeal: (slot: MealSlot, kcal: number) => void;
  finishDay: () => number;
}

const todayKey = () => new Date().toDateString();

const FuelCtx = createContext<FuelApi | null>(null);

export const FuelLogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value, commit, hydrated } = usePersistedState<FuelShape>('fuel', {
    dayKey: todayKey(),
    goalId: null,
    goalKcal: null,
    meals: { breakfast: 0, lunch: 0, dinner: 0 },
    history: [],
  });

  useEffect(() => {
    if (!hydrated) return;
    const now = todayKey();
    if (value.dayKey !== now) {
      commit(prev => {
        const prevTotal =
          prev.meals.breakfast + prev.meals.lunch + prev.meals.dinner;
        const archive =
          prevTotal > 0 && prev.goalKcal
            ? [
                { day: prev.dayKey, total: prevTotal, goal: prev.goalKcal },
                ...prev.history,
              ].slice(0, 30)
            : prev.history;
        return {
          ...prev,
          dayKey: now,
          meals: { breakfast: 0, lunch: 0, dinner: 0 },
          history: archive,
        };
      });
    }
  }, [hydrated, value.dayKey, commit]);

  const api = useMemo<FuelApi>(() => {
    const total = value.meals.breakfast + value.meals.lunch + value.meals.dinner;
    return {
      goalId: value.goalId,
      goalKcal: value.goalKcal,
      meals: value.meals,
      history: value.history,
      total,
      setGoal: (id, kcal) => commit(p => ({ ...p, goalId: id, goalKcal: kcal })),
      logMeal: (slot, kcal) =>
        commit(p => ({ ...p, meals: { ...p.meals, [slot]: kcal } })),
      finishDay: () => (value.goalKcal ? total - value.goalKcal : 0),
    };
  }, [value, commit]);

  return <FuelCtx.Provider value={api}>{children}</FuelCtx.Provider>;
};

export const useFuelLog = () => {
  const ctx = useContext(FuelCtx);
  if (!ctx) throw new Error('useFuelLog outside provider');
  return ctx;
};
