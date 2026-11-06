import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    error: '#ff5252',
  },
  spacing: {
    base: 16,
    sm: 8,
    md: 12,
    xl: 24,
  },
  radius: {
    md: 8,
  },
  typography: {
    sizes: {
      sm: 14,
      md: 16,
      xxl: 48,
    },
  },
};

export type AppTheme = typeof theme;

export const makeStyles = <T extends StyleSheet.NamedStyles<T>>(
  stylesFactory: (theme: AppTheme) => T
) => {
  return () => StyleSheet.create(stylesFactory(theme));
};