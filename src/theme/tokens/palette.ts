/**
 * NovaFlow Brand Palette
 * Фірмова палітра NovaFlow: пурпурний (акцент), смарагдовий (успіх/серія), бурштиновий (фокус/увага), слейт (нейтральний).
 * Hex-кольори дозволені ТІЛЬКИ в цьому файлі відповідно до ТЗ (Розділ 5).
 */

export const palette = {
  // Пурпурний (NovaFlow Purple - Primary Brand)
  purple50: '#FAF5FF',
  purple100: '#F3E8FF',
  purple200: '#E9D5FF',
  purple300: '#D8B4FE',
  purple400: '#C084FC',
  purple500: '#A855F7',
  purple600: '#9333EA',
  purple700: '#7E22CE',
  purple800: '#6B21A8',
  purple900: '#581C87',
  purple950: '#3B0764',

  // Смарагдовий (Emerald - Success / Streak / Easy)
  emerald50: '#ECFDF5',
  emerald100: '#D1FAE5',
  emerald200: '#A7F3D0',
  emerald300: '#6EE7B7',
  emerald400: '#34D399',
  emerald500: '#10B981',
  emerald600: '#059669',
  emerald700: '#047857',
  emerald800: '#065F46',
  emerald900: '#064E3B',
  emerald950: '#022C22',

  // Бурштиновий (Amber - Warning / Review / Hard)
  amber50: '#FFFBEB',
  amber100: '#FEF3C7',
  amber200: '#FDE68A',
  amber300: '#FCD34D',
  amber400: '#FBBF24',
  amber500: '#F59E0B',
  amber600: '#D97706',
  amber700: '#B45309',
  amber800: '#92400E',
  amber900: '#78350F',
  amber950: '#451A03',

  // Трояндовий / Червоний (Rose - Danger / Again / Reset)
  rose50: '#FFF1F2',
  rose100: '#FFE4E6',
  rose200: '#FECDD3',
  rose300: '#FDA4AF',
  rose400: '#FB7185',
  rose500: '#F43F5E',
  rose600: '#E11D48',
  rose700: '#BE123C',
  rose800: '#9F1239',
  rose900: '#881337',
  rose950: '#4C0519',

  // Слейт (Slate - Neutrals, Backgrounds & Borders)
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  slate950: '#020617',

  // Базові
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type Palette = typeof palette;
export type PaletteColor = keyof Palette;
