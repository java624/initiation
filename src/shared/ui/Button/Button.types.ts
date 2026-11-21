import { PressableProps } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** Варіант кнопки */
  variant?: ButtonVariant;
  /** Розмір кнопки */
  size?: ButtonSize;
  /** Текст на кнопці */
  label: string;
  /** Стан завантаження */
  loading?: boolean;
  /** Іконка ліворуч від тексту */
  leftIcon?: React.ReactNode;
  /** Іконка праворуч від тексту */
  rightIcon?: React.ReactNode;
  /** Чи займає кнопка всю ширину */
  fullWidth?: boolean;
}
