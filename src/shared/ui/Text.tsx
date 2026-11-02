import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface TextProps extends RNTextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'body', 
  style, 
  children, 
  ...props 
}) => {
  const theme = useTheme();

  return (
    <RNText
      style={[
        styles.base,
        { color: theme.text },
        styles[variant],
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
    opacity: 0.7,
  },
});