import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { DockKey, FlowKey, FLOW, DOCK } from './routePaths';

interface Frame {
  key: FlowKey;
  params?: any;
}

interface FlowApi {
  frame: Frame;
  tab: DockKey;
  push: (key: FlowKey, params?: any) => void;
  pop: () => void;
  swap: (key: FlowKey, params?: any) => void;
  goTab: (tab: DockKey) => void;
  jumpToTab: (tab: DockKey) => void;
}

const FlowCtx = createContext<FlowApi | null>(null);

export const FlowOrchestrator: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stack, setStack] = useState<Frame[]>([{ key: FLOW.gate }]);
  const [tab, setTab] = useState<DockKey>(DOCK.catalog);

  const push = useCallback((key: FlowKey, params?: any) => {
    setStack(s => [...s, { key, params }]);
  }, []);

  const pop = useCallback(() => {
    setStack(s => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const swap = useCallback((key: FlowKey, params?: any) => {
    setStack([{ key, params }]);
  }, []);

  const goTab = useCallback((next: DockKey) => setTab(next), []);

  const jumpToTab = useCallback((next: DockKey) => {
    setTab(next);
    setStack([{ key: FLOW.shell }]);
  }, []);

  const api = useMemo<FlowApi>(
    () => ({
      frame: stack[stack.length - 1],
      tab,
      push,
      pop,
      swap,
      goTab,
      jumpToTab,
    }),
    [stack, tab, push, pop, swap, goTab, jumpToTab],
  );

  return <FlowCtx.Provider value={api}>{children}</FlowCtx.Provider>;
};

export const useFlow = () => {
  const ctx = useContext(FlowCtx);
  if (!ctx) throw new Error('useFlow outside provider');
  return ctx;
};
