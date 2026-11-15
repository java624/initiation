import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  /** Підпис поля */
  label?: string;
  /** Текст помилки */
  error?: string;
  /** Іконка ліворуч */
  leftIcon?: React.ReactNode;
  /** Іконка праворуч */
  rightIcon?: React.ReactNode;
  /** Кнопка очищення поля */
  clearable?: boolean;
  /** Підказка під полем */
  hint?: string;
}
