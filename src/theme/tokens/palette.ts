/**
 * NovaFlow Brand Palette
 * Фірмова палітра NovaFlow:
 * - Фірмовий фіолетовий #5E077E як головний акцент
 * - Теплий майже білий фон #FAF8F5
 * - Графітовий текст #1F2024
 */

export const palette = {
  // Фірмовий фіолетовий NovaFlow (#5E077E)
  brandPurple: '#5E077E',
  brandPurpleHover: '#4C0566',
  brandPurpleActive: '#3C0352',
  brandPurpleLight: '#7A15A3',
  brandPurpleMuted: '#9634C2',
  brandPurpleSubtle: '#F6ECFA',
  brandPurpleBorder: '#E5C9F2',
  brandPurpleGlow: 'rgba(94, 7, 126, 0.12)',
  brandGradientStart: '#A31FCB',
  brandGradientMid: '#7E15A3',

  // Смарагдовий (Emerald - Успіх)
  emerald500: '#10B981',
  emerald600: '#059669',
  emeraldSubtle: '#ECFDF5',

  // Бурштиновий (Amber - Увага)
  amber500: '#F59E0B',
  amberSubtle: '#FFFBEB',

  // Червоний (Rose - Помилка)
  rose500: '#E11D48',
  rose600: '#BE123C',
  roseSubtle: '#FFF1F2',

  // Світла тема: Теплий фон та графіт
  warmWhite: '#FAF8F5',
  warmSurface: '#FFFFFF',
  warmSurfaceSecondary: '#F4F1EA',
  warmBorder: '#E8E4DA',
  warmBorderStrong: '#D7D2C7',

  // Графіт (текст для світлої теми)
  graphite900: '#1F2024',
  graphite700: '#484B54',
  graphite500: '#717582',
  graphite300: '#A4A8B5',

  // Темна тема: Глибокий графіт та акценти
  darkBg: '#121316',
  darkSurface: '#191B20',
  darkSurfaceSecondary: '#21242B',
  darkBorder: '#2B2E38',
  darkBorderStrong: '#3A3E4B',
  darkTextPrimary: '#F6F7F9',
  darkTextSecondary: '#A0A4B2',
  darkTextTertiary: '#6E7280',
  darkPurpleAccent: '#9D3BC4',
  darkPurpleSubtle: '#2A1237',

  // Базові
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type Palette = typeof palette;
export type PaletteColor = keyof Palette;
