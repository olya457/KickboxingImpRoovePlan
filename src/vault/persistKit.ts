import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NS = '@kroove:';

export function usePersistedState<T>(key: string, seed: T) {
  const [value, setValue] = useState<T>(seed);
  const [hydrated, setHydrated] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(NS + key);
        if (raw != null && mounted.current) {
          setValue(JSON.parse(raw) as T);
        }
      } catch {}
      if (mounted.current) setHydrated(true);
    })();
    return () => {
      mounted.current = false;
    };
  }, [key]);

  const commit = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue(prev => {
        const resolved =
          typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        AsyncStorage.setItem(NS + key, JSON.stringify(resolved)).catch(() => {});
        return resolved;
      });
    },
    [key],
  );

  return { value, commit, hydrated };
}

export const wipeKey = (key: string) => AsyncStorage.removeItem(NS + key);
