import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { makeStyles } from '@/theme/makeStyles';
import { Text } from '../Text';
import { InputProps } from './Input.types';

const useStyles = makeStyles(({ colors, spacing, radius, typography }) => ({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  wrapperFocused: {
    borderColor: colors.borderFocus,
  },
  wrapperError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    ...typography.body,
    paddingVertical: spacing.sm,
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  errorText: {
    marginTop: spacing.xs,
  },
  hintText: {
    marginTop: spacing.xs,
  },
  clearButton: {
    padding: spacing.xs,
  },
}));

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  clearable = false,
  hint,
  onChangeText,
  value,
  style: _style,
  ...rest
}: InputProps) => {
  const styles = useStyles();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="caption" color="secondary" style={styles.label}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.wrapper,
          focused && styles.wrapperFocused,
          !!error && styles.wrapperError,
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={label}
          {...rest}
        />
        {clearable && !!value && (
          <Pressable
            onPress={() => onChangeText?.('')}
            style={styles.clearButton}
            accessibilityLabel="Очистити поле"
            hitSlop={8}
          >
            <Text variant="caption" color="tertiary">✕</Text>
          </Pressable>
        )}
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {!!error && (
        <Text variant="small" color="danger" style={styles.errorText}>
          {error}
        </Text>
      )}
      {!!hint && !error && (
        <Text variant="small" color="tertiary" style={styles.hintText}>
          {hint}
        </Text>
      )}
    </View>
  );
};
