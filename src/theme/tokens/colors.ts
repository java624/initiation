import { palette } from './palette';

/**
 * Семантичні кольори теми (Light & Dark).
 * NovaFlow brand: #5E077E, warm off-white #FAF8F5, graphite text #1F2024.
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

  // Брендовий акцент (#5E077E)
  accent: string;
  accentHover: string;
  accentSubtle: string;
  accentBorder: string;
  accentGlow: string;

  // Градієнт брендових кнопок
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;

  // Колір контенту поверх акценту/градієнта (білий в обох темах)
  onAccent: string;

  // Семантичні стани
  success: string;
  successSubtle: string;
  warning: string;
  warningSubtle: string;
  danger: string;
  dangerSubtle: string;

  // Межі
  border: string;
  borderStrong: string;
  borderFocus: string;

  // Допоміжні
  card: string;
  overlay: string;
  transparent: string;
}

export const lightColors: SemanticColors = {
  // Теплий майже білий фон
  background: palette.warmWhite,
  surface: palette.warmSurface,
  surfaceSecondary: palette.warmSurfaceSecondary,
  surfaceElevated: palette.warmSurface,

  // Графітовий текст
  textPrimary: palette.graphite900,
  textSecondary: palette.graphite700,
  textTertiary: palette.graphite500,
  textInverse: palette.white,

  // Фірмовий фіолетовий #5E077E
  accent: palette.brandPurple,
  accentHover: palette.brandPurpleHover,
  accentSubtle: palette.brandPurpleSubtle,
  accentBorder: palette.brandPurpleBorder,
  accentGlow: palette.brandPurpleGlow,

  // Градієнт кнопок
  gradientStart: palette.brandGradientStart,
  gradientMid: palette.brandGradientMid,
  gradientEnd: palette.brandPurple,
  onAccent: palette.white,

  // Стани
  success: palette.emerald600,
  successSubtle: palette.emeraldSubtle,
  warning: palette.amber500,
  warningSubtle: palette.amberSubtle,
  danger: palette.rose600,
  dangerSubtle: palette.roseSubtle,

  // Межі
  border: palette.warmBorder,
  borderStrong: palette.warmBorderStrong,
  borderFocus: palette.brandPurple,

  card: palette.warmSurface,
  overlay: 'rgba(31, 32, 36, 0.45)',
  transparent: palette.transparent,
};

export const darkColors: SemanticColors = {
  // Темний фон - глибокий графіт
  background: palette.darkBg,
  surface: palette.darkSurface,
  surfaceSecondary: palette.darkSurfaceSecondary,
  surfaceElevated: palette.darkSurfaceSecondary,

  // Текст
  textPrimary: palette.darkTextPrimary,
  textSecondary: palette.darkTextSecondary,
  textTertiary: palette.darkTextTertiary,
  textInverse: palette.darkBg,

  // Брендовий акцент для темної теми
  accent: palette.darkPurpleAccent,
  accentHover: palette.brandPurpleLight,
  accentSubtle: palette.darkPurpleSubtle,
  accentBorder: palette.brandPurpleLight,
  accentGlow: 'rgba(157, 59, 196, 0.2)',

  // Градієнт кнопок (однаковий в обох темах)
  gradientStart: palette.brandGradientStart,
  gradientMid: palette.brandGradientMid,
  gradientEnd: palette.brandPurple,
  onAccent: palette.white,

  // Стани
  success: palette.emerald500,
  successSubtle: 'rgba(16, 185, 129, 0.15)',
  warning: palette.amber500,
  warningSubtle: 'rgba(245, 158, 11, 0.15)',
  danger: palette.rose500,
  dangerSubtle: 'rgba(225, 29, 72, 0.15)',

  // Межі
  border: palette.darkBorder,
  borderStrong: palette.darkBorderStrong,
  borderFocus: palette.darkPurpleAccent,

  card: palette.darkSurface,
  overlay: 'rgba(0, 0, 0, 0.7)',
  transparent: palette.transparent,
};
