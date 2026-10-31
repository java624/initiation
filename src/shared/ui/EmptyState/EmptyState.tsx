import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@/theme/makeStyles';
import { Text } from '../Text';
import { Button } from '../Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
  },
  icon: {
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
}));

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text variant="h3" style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text variant="body" color="secondary" style={styles.description}>
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} variant="primary" />
      )}
    </View>
  );
};
