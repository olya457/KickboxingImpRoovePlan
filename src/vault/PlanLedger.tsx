import React, { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from './persistKit';
import { QuizAnswers, pickProgram, PROGRAM_VAULT, TrainProgram } from '../ledger/programVault';

interface LedgerShape {
  answers: QuizAnswers;
  programId: string | null;
}

interface LedgerApi {
  answers: QuizAnswers;
  hasPlan: boolean;
  program: TrainProgram | null;
  savePlan: (answers: QuizAnswers) => TrainProgram;
  resetPlan: () => void;
}

const LedgerCtx = createContext<LedgerApi | null>(null);

export const PlanLedgerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value, commit } = usePersistedState<LedgerShape>('planledger', {
    answers: {},
    programId: null,
  });

  const api = useMemo<LedgerApi>(() => {
    const program = value.programId ? PROGRAM_VAULT[value.programId] : null;
    return {
      answers: value.answers,
      hasPlan: !!value.programId,
      program,
      savePlan: answers => {
        const id = pickProgram(answers);
        commit({ answers, programId: id });
        return PROGRAM_VAULT[id];
      },
      resetPlan: () => commit({ answers: {}, programId: null }),
    };
  }, [value, commit]);

  return <LedgerCtx.Provider value={api}>{children}</LedgerCtx.Provider>;
};

export const usePlanLedger = () => {
  const ctx = useContext(LedgerCtx);
  if (!ctx) throw new Error('usePlanLedger outside provider');
  return ctx;
};
