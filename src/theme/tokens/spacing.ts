/**
 * Шкала відступів (кратна 8pt) за вимогами дизайну NovaFlow.
 */

export const spacing = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
  xxxl: 64,
} as const;

export type Spacing = typeof spacing;
export type SpacingValue = keyof Spacing;
