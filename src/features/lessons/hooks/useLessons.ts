import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/features/auth';
import { Lesson, lessonsApi } from '../services/lessons.api';

export const useLessons = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await lessonsApi.getStudentLessons(userId);
      setLessons(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    }
  }, [userId]);

  // Дані оновлюються щоразу, коли вкладка стає активною
  useFocusEffect(
    useCallback(() => {
      let active = true;
      load().finally(() => {
        if (active) setIsLoading(false);
      });
      return () => {
        active = false;
      };
    }, [load]),
  );

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await load();
    setIsRefreshing(false);
  }, [load]);

  return { lessons, isLoading, isRefreshing, error, refresh };
};