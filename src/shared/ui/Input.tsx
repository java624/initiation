import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export const Input: React.FC<TextInputProps> = ({ style, ...props }) => {
  const theme = useTheme() as any;

  return (
    <TextInput
      style={[
        styles.input,
        {
          color: theme.text || '#000000',
          backgroundColor: theme.backgroundElement || '#f0f0f0',
          borderColor: theme.backgroundSelected || '#cccccc',
        },
        style,
      ]}
      placeholderTextColor={theme.textSecondary || '#888888'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
});