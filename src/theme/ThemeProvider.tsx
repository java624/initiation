import { createContext, ReactNode, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { useProfileStore } from '@/features/profile/useProfileStore';
import { darkTheme, lightTheme, Theme } from '@/theme';

type ThemeContextValue = { theme: Theme };

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const preference = useProfileStore((s) => s.theme); // 'light' | 'dark' | 'system'

  const value = useMemo<ThemeContextValue>(() => {
    const isDark = preference === 'system' ? systemScheme === 'dark' : preference === 'dark';
    return { theme: isDark ? darkTheme : lightTheme };
  }, [preference, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
