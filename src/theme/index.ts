import { darkColors, lightColors, ColorTokens } from './tokens/colors';
import { radius } from './tokens/radius';
import { shadows } from './tokens/shadows';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';

export type ThemeMode = 'light' | 'dark';

export type Theme = {
  mode: ThemeMode;
  colors: ColorTokens;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  shadows: typeof shadows;
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  spacing,
  radius,
  typography,
  shadows,
};

export const darkTheme: Theme = { ...lightTheme, mode: 'dark', colors: darkColors };

export { spacing, radius, typography, shadows };
export type { ColorTokens };
