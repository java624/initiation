import { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { Theme } from '@/theme';
import { useTheme } from '@/theme/useTheme';

type Styles = Record<string, ViewStyle | TextStyle | ImageStyle>;

/**
 * const useStyles = makeStyles(({ colors, spacing, radius }) => ({
 *   container: { padding: spacing.base, backgroundColor: colors.surface },
 * }));
 *
 * В компоненте: const styles = useStyles();
 * Стили пересоздаются при смене темы (светлая/тёмная).
 */
export function makeStyles<T extends Styles>(factory: (theme: Theme) => T) {
  return function useStyles(): T {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
  };
}
