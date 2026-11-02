import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Text } from './Text';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  style,
  disabled,
  ...props
}) => {
  const theme = useTheme();

  const isPrimary = variant === 'primary';
  
  // Виправляємо theme.colors.tint на (theme as any).tint || '#007AFF'
  const backgroundColor = isPrimary ? (theme as any).tint || '#007AFF' : 'transparent';
  // Виправляємо theme.colors.text на theme.text
  const textColor = isPrimary ? '#ffffff' : theme.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor: (theme as any).tint || '#007AFF' },
        !isPrimary && styles.outline,
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
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outline: {
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});