'use client';

import { useState, useCallback } from 'react';
import { ConversionHistory } from '@/types/currency';
import { generateId } from '@/lib/utils/formatters';

const STORAGE_KEY = 'currencyhub_history';
const MAX_ENTRIES = 20;

function loadFromStorage(): ConversionHistory[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as ConversionHistory[];
  } catch {
    // localStorage unavailable or corrupt
  }
  return [];
}

export function useHistory() {
  const [history, setHistory] = useState<ConversionHistory[]>(loadFromStorage);

  const persist = useCallback((entries: ConversionHistory[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Storage full or unavailable
    }
  }, []);

  const addEntry = useCallback(
    (entry: Omit<ConversionHistory, 'id' | 'timestamp'>) => {
      const newEntry: ConversionHistory = {
        ...entry,
        id: generateId(),
        timestamp: Date.now(),
      };

      setHistory((prev) => {
        const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES);
        persist(updated);
        return updated;
      });
    },
    [persist]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    persist([]);
  }, [persist]);

  const removeEntry = useCallback(
    (id: string) => {
      setHistory((prev) => {
        const updated = prev.filter((entry) => entry.id !== id);
        persist(updated);
        return updated;
      });
    },
    [persist]
  );

  return {
    history,
    addEntry,
    clearHistory,
    removeEntry,
  };
}
