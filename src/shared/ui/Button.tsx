import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../../hooks/use-theme';
import { theme as globalTheme } from '../../constants/theme';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const colorScheme = useTheme();
  
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  // Выбираем цвета строго по дизайн-токенам
  const backgroundColor = isPrimary 
    ? globalTheme.colors.primary 
    : isSecondary 
      ? globalTheme.colors.surface 
      : 'transparent';

  const textColor = isPrimary 
    ? globalTheme.colors.background 
    : isSecondary 
      ? globalTheme.colors.text 
      : globalTheme.colors.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor,
          borderColor: globalTheme.colors.primary,
        },
        isOutline && styles.outline,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: globalTheme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: globalTheme.colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: globalTheme.typography.sizes.md,
    fontWeight: 'bold',
  },
});