import { ScrollViewProps, ViewProps } from 'react-native';

export interface ScreenProps extends ViewProps {
  /** Зробити екран з прокруткою */
  scrollable?: boolean;
  /** Пропси для ScrollView (якщо scrollable=true) */
  scrollViewProps?: ScrollViewProps;
  /** Відступ від клавіатури */
  keyboardAware?: boolean;
}
