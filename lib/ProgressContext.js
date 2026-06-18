'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getDefaultState,
  loadProgress,
  saveProgressImmediate,
  PROGRESS_UPDATED_EVENT,
} from '@/lib/storage';
import { applyStreakOnVisit } from '@/lib/streak';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = loadProgress();
    const withStreak = applyStreakOnVisit(initial);
    if (withStreak !== initial) {
      saveProgressImmediate(withStreak);
    }
    setProgress(withStreak);
    setReady(true);

    const onProgressUpdated = (event) => {
      if (event.detail) {
        setProgress(event.detail);
      } else {
        setProgress(loadProgress());
      }
    };

    window.addEventListener(PROGRESS_UPDATED_EVENT, onProgressUpdated);
    return () => window.removeEventListener(PROGRESS_UPDATED_EVENT, onProgressUpdated);
  }, []);

  const updateProgress = useCallback((updater) => {
    setProgress((prev) => {
      const base = prev || getDefaultState();
      const next = typeof updater === 'function' ? updater(base) : { ...base, ...updater };
      saveProgressImmediate(next);
      return next;
    });
  }, []);

  const resetProgressState = useCallback((state) => {
    const next = state || getDefaultState();
    saveProgressImmediate(next);
    setProgress(next);
  }, []);

  const value = useMemo(
    () => ({
      progress,
      ready,
      updateProgress,
      resetProgressState,
    }),
    [progress, ready, updateProgress, resetProgressState]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
