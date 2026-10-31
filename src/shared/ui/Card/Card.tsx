import React from 'react';
import { Pressable, View } from 'react-native';
import { makeStyles } from '@/theme/makeStyles';
import { CardProps } from './Card.types';

const useStyles = makeStyles(({ colors, radius, shadows }) => ({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  elevated: {
    ...shadows.md,
    borderWidth: 0,
  },
}));

export const Card = ({
  onPress,
  elevated = false,
  style,
  children,
  ...rest
}: CardProps) => {
  const styles = useStyles();

  const content = (
    <View style={[styles.card, elevated && styles.elevated, style]} {...rest}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return content;
};
