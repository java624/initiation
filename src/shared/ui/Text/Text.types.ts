import { TextProps as RNTextProps } from 'react-native';
import { TypographyVariant } from '@/theme/tokens/typography';

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent' | 'danger' | 'success' | 'warning';
}
