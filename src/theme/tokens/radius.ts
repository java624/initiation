/**
 * Токени скруглення відповідно до Розділу 5 ТЗ.
 */

export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 12,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

export type Radius = typeof radius;
export type RadiusValue = keyof Radius;
