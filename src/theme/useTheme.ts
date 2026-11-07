import { useContext } from 'react';

import { useProfileStore } from '@/features/profile/useProfileStore';
import { ThemeContext } from '@/theme/ThemeProvider';

/** Возвращает ОБЪЕКТ темы: { mode, colors, spacing, radius, typography, shadows } */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx.theme;
}

/** Для экрана настроек: 'light' | 'dark' | 'system' (хранится в useProfileStore) */
export function useThemePreference() {
  const preference = useProfileStore((s) => s.theme);
  const setPreference = useProfileStore((s) => s.setTheme);
  return { preference, setPreference };
}
