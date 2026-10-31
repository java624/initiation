import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
} from 'react-native';
import { makeStyles } from '@/theme/makeStyles';
import { Text } from '../Text';
import { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';

const useStyles = makeStyles(({ colors, spacing, radius, typography: _t }) => ({
  // Base
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  // Variants
  primary: {
    backgroundColor: colors.accent,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  ghost: {
    backgroundColor: colors.transparent,
    borderWidth: 0,
  },
  danger: {
    backgroundColor: colors.danger,
    borderWidth: 0,
  },
  // Sizes
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, minHeight: 36 },
  md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, minHeight: 44 },
  lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, minHeight: 52 },
  // States
  disabled: { opacity: 0.4 },
  fullWidth: { width: '100%' },
  pressed: { opacity: 0.75 },
  // Icon gap
  leftIcon: { marginRight: spacing.xs },
  rightIcon: { marginLeft: spacing.xs },
}));

const TEXT_COLOR: Record<ButtonVariant, 'inverse' | 'accent' | 'danger' | 'primary'> = {
  primary: 'inverse',
  secondary: 'accent',
  ghost: 'accent',
  danger: 'inverse',
};

const TEXT_VARIANT: Record<ButtonSize, 'caption' | 'bodyMedium' | 'bodyMedium'> = {
  sm: 'caption',
  md: 'bodyMedium',
  lg: 'bodyMedium',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  label,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...rest
}: ButtonProps) => {
  const styles = useStyles();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? 'white' : undefined}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text variant={TEXT_VARIANT[size]} color={TEXT_COLOR[variant]}>
            {label}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
};
