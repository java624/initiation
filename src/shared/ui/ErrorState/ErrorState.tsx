import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@/theme/makeStyles';
import { Text } from '../Text';
import { Button } from '../Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const useStyles = makeStyles(({ colors, spacing, radius }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.dangerSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
}));

export const ErrorState = ({
  title = 'Щось пішло не так',
  message,
  onRetry,
  retryLabel = 'Спробувати знову',
}: ErrorStateProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text variant="h2" color="danger">✕</Text>
      </View>
      <Text variant="h3" color="danger" style={styles.title}>
        {title}
      </Text>
      {message && (
        <Text variant="body" color="secondary" style={styles.message}>
          {message}
        </Text>
      )}
      {onRetry && (
        <Button
          label={retryLabel}
          onPress={onRetry}
          variant="secondary"
        />
      )}
    </View>
  );
};
