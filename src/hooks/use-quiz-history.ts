'use client';

import { useState, useEffect, useCallback } from 'react';
import type { QuizResult } from '@/types';

const STORAGE_KEY = 'smartBuddyQuizHistory';

export function useQuizHistory() {
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        setHistory(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to parse quiz history from localStorage', error);
      setHistory([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addResult = useCallback((result: Omit<QuizResult, 'date'>) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory, { ...result, date: Date.now() }];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Failed to save quiz history to localStorage', error);
      }
      return newHistory;
    });
  }, []);

  return { history, addResult, isLoaded };
}
