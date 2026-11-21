import { makeStyles } from '@/theme';

const TRACK_HEIGHT = 8;

type StyleProps = {
  /** Прогрес від 0 до 1. */
  progress: number;
};

export const useStyles = makeStyles(
  ({ colors, spacing, radius, typography }, props?: StyleProps) => ({
    card: {
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.sm,
      gap: spacing.xs,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      ...typography.h3,
      color: colors.textPrimary,
    },
    value: {
      ...typography.bodyMedium,
      color: colors.textSecondary,
    },
    track: {
      height: TRACK_HEIGHT,
      borderRadius: radius.full,
      backgroundColor: colors.surfaceSecondary,
      overflow: 'hidden',
    },
    fill: {
      height: TRACK_HEIGHT,
      width: `${Math.round((props?.progress ?? 0) * 100)}%`,
      borderRadius: radius.full,
      backgroundColor: colors.accent,
    },
  }),
);
