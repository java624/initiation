import { useColorScheme as useRNSColorScheme } from 'react-native';

export function useTheme() {
  const colorScheme = useRNSColorScheme();

  return colorScheme ?? 'light';
}