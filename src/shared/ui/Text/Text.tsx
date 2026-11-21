import React from 'react';
import { Text as RNText } from 'react-native';
import { makeStyles } from '@/theme/makeStyles';
import { typography } from '@/theme/tokens/typography';
import { TextProps } from './Text.types';

const useStyles = makeStyles(({ colors }) => ({
  primary: { color: colors.textPrimary },
  secondary: { color: colors.textSecondary },
  tertiary: { color: colors.textTertiary },
  inverse: { color: colors.textInverse },
  accent: { color: colors.accent },
  danger: { color: colors.danger },
  success: { color: colors.success },
  warning: { color: colors.warning },
}));

export const Text = ({
  variant = 'body',
  color = 'primary',
  style,
  ...rest
}: TextProps) => {
  const styles = useStyles();

  return (
    <RNText
      style={[typography[variant], styles[color], style]}
      {...rest}
    />
  );
};
