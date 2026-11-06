import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../../hooks/use-theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  const theme = useTheme() as any; // Приведение к any убирает ошибку type 'never'

  return (
    <View
      style={[
        styles.card,
        { 
          backgroundColor: theme.backgroundElement || theme.background || '#ffffff', 
          borderColor: theme.backgroundSelected || theme.textSecondary || '#cccccc' 
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
});