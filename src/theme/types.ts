import { SemanticColors } from './tokens/colors';
import { Spacing } from './tokens/spacing';
import { Radius } from './tokens/radius';
import { Typography } from './tokens/typography';
import { Shadows } from './tokens/shadows';
import { Motion } from './tokens/motion';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  colors: SemanticColors;
  spacing: Spacing;
  radius: Radius;
  typography: Typography;
  shadows: Shadows;
  motion: Motion;
  isDark: boolean;
  mode: ThemeMode;
}

export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}
