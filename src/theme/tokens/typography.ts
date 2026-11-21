import { TextStyle } from 'react-native';

/**
 * Типографіка NovaFlow на базі Manrope (підтримує кирилицю).
 * Шрифти підвантажуються в src/app/index.tsx через useFonts.
 * Кожна вага = окремий fontFamily, тому fontWeight у варіантах не задаємо.
 */

export const fontFamilies = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extrabold: 'Manrope_800ExtraBold',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 26,
  xxxl: 32,
} as const;

export const lineHeights = {
  xs: 16,
  sm: 18,
  base: 22,
  md: 22,
  lg: 24,
  xl: 28,
  xxl: 32,
  xxxl: 38,
} as const;

// Залишено для сумісності, якщо десь імпортується. У варіантах не використовується.
export const fontWeights: Record<string, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const typography = {
  h1: {
    fontFamily: fontFamilies.extrabold,
    fontSize: fontSizes.xxl,
    lineHeight: lineHeights.xxl,
    letterSpacing: -0.4,
  },
  h2: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: fontFamilies.semibold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },
  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
  },
  bodyMedium: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
  },
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  small: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
} as const satisfies Record<string, TextStyle>;

export type Typography = typeof typography;
export type TypographyVariant = keyof Typography;
