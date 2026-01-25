import { useState, useEffect, useCallback } from 'react';
import { UserProgress, ExerciseAttempt, ProgrammingLanguage } from '@/types';

const STORAGE_KEY = 'codetrainer-progress';

const defaultProgress: UserProgress = {
oderId: '',
  oderlanguage: 'python',
  completedExercises: [],
  exerciseHistory: [],
  streak: 0,
  lastActivityDate: '',
  totalPoints: 0,
  badges: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {
        setProgress(defaultProgress);
      }
    }
  }, []);

  const saveProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  }, []);

  const markExerciseComplete = useCallback((
    exerciseId: string,
    code: string,
    output: string,
    passed: boolean
  ) => {
    const attempt: ExerciseAttempt = {
      exerciseId,
      timestamp: new Date().toISOString(),
      code,
      passed,
      output,
    };

    const today = new Date().toDateString();
    const lastActivity = progress.lastActivityDate ? new Date(progress.lastActivityDate).toDateString() : '';
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    let newStreak = progress.streak;
    if (lastActivity === yesterday) {
      newStreak += 1;
    } else if (lastActivity !== today) {
      newStreak = 1;
    }

    const newProgress: UserProgress = {
      ...progress,
      completedExercises: passed && !progress.completedExercises.includes(exerciseId)
        ? [...progress.completedExercises, exerciseId]
        : progress.completedExercises,
      exerciseHistory: [...progress.exerciseHistory, attempt],
      streak: newStreak,
      lastActivityDate: new Date().toISOString(),
      totalPoints: passed ? progress.totalPoints + 10 : progress.totalPoints,
    };

    saveProgress(newProgress);
  }, [progress, saveProgress]);

  const getCompletedByLanguage = useCallback((language: ProgrammingLanguage): number => {
    return progress.completedExercises.filter(id => id.startsWith(language)).length;
  }, [progress.completedExercises]);

  const isExerciseCompleted = useCallback((exerciseId: string): boolean => {
    return progress.completedExercises.includes(exerciseId);
  }, [progress.completedExercises]);

  const getRecentAttempts = useCallback((limit: number = 10): ExerciseAttempt[] => {
    return [...progress.exerciseHistory]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }, [progress.exerciseHistory]);

  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
  }, [saveProgress]);

  return {
    progress,
    markExerciseComplete,
    getCompletedByLanguage,
    isExerciseCompleted,
    getRecentAttempts,
    resetProgress,
  };
}
