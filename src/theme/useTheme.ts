import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import { lightColors } from './tokens/colors';
import { spacing } from './tokens/spacing';
import { radius } from './tokens/radius';
import { typography } from './tokens/typography';
import { shadows } from './tokens/shadows';
import { motion } from './tokens/motion';
import { Theme } from './types';

const defaultFallbackTheme: Theme = {
  colors: lightColors,
  spacing,
  radius,
  typography,
  shadows,
  motion,
  isDark: false,
  mode: 'light',
};

/**
 * Хук для отримання поточних токенів теми (colors, spacing, radius, typography, shadows, motion).
 */
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    return defaultFallbackTheme;
  }
  return context.theme;
};

/**
 * Хук для отримання стану теми та методу зміни режиму (setMode).
 */
export const useThemeController = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeController must be used within a ThemeProvider');
  }
  return context;
};
