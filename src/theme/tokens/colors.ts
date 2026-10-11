import { palette } from './palette';

/**
 * Семантичні кольори теми (Light & Dark).
 * Компоненти використовують ЛИШЕ семантичні назви (напр. colors.surface, colors.textPrimary).
 */

export interface SemanticColors {
  // Фони та поверхні
  background: string;
  surface: string;
  surfaceSecondary: string;
  surfaceElevated: string;

  // Текст
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // Брендовий акцент (Purple)
  accent: string;
  accentHover: string;
  accentSubtle: string;

  // Семантичні стани (Успіх, Увага, Помилка)
  success: string;
  successSubtle: string;
  warning: string;
  warningSubtle: string;
  danger: string;
  dangerSubtle: string;

  // Межі та розділювачі
  border: string;
  borderStrong: string;
  borderFocus: string;

  // Інше
  card: string;
  overlay: string;
  transparent: string;
}

export const lightColors: SemanticColors = {
  // Фони та поверхні
  background: palette.slate50,
  surface: palette.white,
  surfaceSecondary: palette.slate100,
  surfaceElevated: palette.white,

  // Текст
  textPrimary: palette.slate900,
  textSecondary: palette.slate600,
  textTertiary: palette.slate400,
  textInverse: palette.white,

  // Брендовий акцент (Purple)
  accent: palette.purple600,
  accentHover: palette.purple700,
  accentSubtle: palette.purple50,

  // Семантичні стани (Успіх, Увага, Помилка)
  success: palette.emerald600,
  successSubtle: palette.emerald50,
  warning: palette.amber500,
  warningSubtle: palette.amber50,
  danger: palette.rose600,
  dangerSubtle: palette.rose50,

  // Межі та розділювачі
  border: palette.slate200,
  borderStrong: palette.slate300,
  borderFocus: palette.purple600,

  // Інше
  card: palette.white,
  overlay: 'rgba(15, 23, 42, 0.5)',
  transparent: palette.transparent,
};

export const darkColors: SemanticColors = {
  // Фони та поверхні
  background: palette.slate950,
  surface: palette.slate900,
  surfaceSecondary: palette.slate800,
  surfaceElevated: palette.slate800,

  // Текст
  textPrimary: palette.slate50,
  textSecondary: palette.slate400,
  textTertiary: palette.slate500,
  textInverse: palette.slate950,

  // Брендовий акцент (Purple)
  accent: palette.purple500,
  accentHover: palette.purple400,
  accentSubtle: palette.purple950,

  // Семантичні стани
  success: palette.emerald500,
  successSubtle: palette.emerald950,
  warning: palette.amber400,
  warningSubtle: palette.amber950,
  danger: palette.rose500,
  dangerSubtle: palette.rose950,

  // Межі та розділювачі
  border: palette.slate800,
  borderStrong: palette.slate700,
  borderFocus: palette.purple400,

  // Інше
  card: palette.slate900,
  overlay: 'rgba(2, 6, 23, 0.75)',
  transparent: palette.transparent,
};
