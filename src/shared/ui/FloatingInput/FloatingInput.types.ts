import { TextInputProps } from 'react-native';

export interface FloatingInputProps extends TextInputProps {
  label: string;
  error?: string | null;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
