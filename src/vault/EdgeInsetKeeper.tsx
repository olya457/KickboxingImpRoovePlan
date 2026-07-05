import React, { createContext, useContext, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePersistedState } from './persistKit';
import { isDroid, EDGE } from '../palette/tokens';

interface EdgeShape {
  top: number;
  bottom: number;
  active: boolean;
}

interface EdgeApi {
  droidTop: number;
  droidBottom: number;
  active: boolean;
  enable: () => void;
  clear: () => void;
}

const EdgeCtx = createContext<EdgeApi | null>(null);

export const EdgeInsetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value, commit } = usePersistedState<EdgeShape>('droidedge', {
    top: EDGE.androidPersistPad,
    bottom: EDGE.androidPersistPad,
    active: true,
  });

  const api = useMemo<EdgeApi>(() => {
    const on = isDroid && value.active;
    return {
      droidTop: on ? value.top : 0,
      droidBottom: on ? value.bottom : 0,
      active: value.active,
      enable: () =>
        commit({
          top: EDGE.androidPersistPad,
          bottom: EDGE.androidPersistPad,
          active: true,
        }),
      clear: () => commit(p => ({ ...p, active: false })),
    };
  }, [value, commit]);

  return <EdgeCtx.Provider value={api}>{children}</EdgeCtx.Provider>;
};

export const useEdgeKeeper = () => {
  const ctx = useContext(EdgeCtx);
  if (!ctx) throw new Error('useEdgeKeeper outside provider');
  return ctx;
};

export const useCanvasInsets = () => {
  const safe = useSafeAreaInsets();
  const edge = useEdgeKeeper();
  return {
    top: safe.top + edge.droidTop,
    bottom: safe.bottom + edge.droidBottom,
    rawBottom: safe.bottom,
    dockGap: isDroid ? EDGE.androidDockGap : EDGE.iosDockGap,
  };
};
