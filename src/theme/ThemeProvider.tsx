import React, { createContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './tokens/colors';
import { spacing } from './tokens/spacing';
import { radius } from './tokens/radius';
import { typography } from './tokens/typography';
import { shadows } from './tokens/shadows';
import { motion } from './tokens/motion';
import { Theme, ThemeContextValue, ThemeMode } from './types';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'system',
}) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const isDark = useMemo(() => {
    if (mode === 'system') {
      return systemColorScheme === 'dark';
    }
    return mode === 'dark';
  }, [mode, systemColorScheme]);

  const theme: Theme = useMemo(() => {
    return {
      colors: isDark ? darkColors : lightColors,
      spacing,
      radius,
      typography,
      shadows,
      motion,
      isDark,
      mode,
    };
  }, [isDark, mode]);

  const value: ThemeContextValue = useMemo(() => {
    return {
      theme,
      mode,
      setMode,
      isDark,
    };
  }, [theme, mode, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
