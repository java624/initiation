import { PressableProps, ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  /** Якщо onPress задано — картка тапабельна */
  onPress?: PressableProps['onPress'];
  /** Підвищена тінь */
  elevated?: boolean;
}
