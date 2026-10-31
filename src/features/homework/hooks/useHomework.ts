import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/features/auth';
import { Homework, homeworkApi } from '../services/homework.api';

export const useHomework = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await homeworkApi.getStudentHomework(userId);
      setHomeworks(data);
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

  return { homeworks, isLoading, isRefreshing, error, refresh };
};