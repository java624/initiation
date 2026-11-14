import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from './types';
import { useTheme } from './useTheme';

/**
 * Хелпер для створення типізованих стилів на базі токенів теми.
 * Забезпечує динамічну зміну теми та усуває використання «сирих» або інлайн-значень.
 *
 * @example
 * export const useStyles = makeStyles(({ colors, spacing, radius }) => ({
 *   container: {
 *     padding: spacing.lg,
 *     borderRadius: radius.md,
 *     backgroundColor: colors.surface,
 *   },
 * }));
 */
export const makeStyles = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  P extends Record<string, any> = Record<string, never>,
>(
  stylesFactory: (theme: Theme, props?: P) => T,
) => {
  return (props?: P): T => {
    const theme = useTheme();
    return useMemo(() => {
      return StyleSheet.create(stylesFactory(theme, props));
    }, [theme, props]);
  };
};
