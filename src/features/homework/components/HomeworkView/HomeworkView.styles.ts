import { makeStyles } from '@/theme/makeStyles';
import { fontFamilies } from '@/theme/tokens/typography';

export const useStyles = makeStyles(({ colors, spacing, radius, typography, shadows }) => ({
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 260,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },

  // Шапка
  header: {
    gap: spacing.xxs,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  segment: {
    marginTop: spacing.lg,
  },

  // Картка завдання
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.sm,
  },
  cardOverdue: {
    borderColor: colors.danger,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
  },
  cardMain: {
    flex: 1,
    gap: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  cardTitle: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.semibold,
    color: colors.textPrimary,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  deadlineText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  deadlineOverdue: {
    color: colors.danger,
  },

  // Бейдж статусу
  badge: {
    backgroundColor: colors.accentSubtle,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  badgeSuccess: {
    backgroundColor: colors.successSubtle,
  },
  badgeDanger: {
    backgroundColor: colors.dangerSubtle,
  },
  badgeText: {
    ...typography.small,
    fontFamily: fontFamilies.semibold,
    color: colors.accent,
  },
  badgeTextSuccess: {
    color: colors.success,
  },
  badgeTextDanger: {
    color: colors.danger,
  },

  // Розкрита частина
  details: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
  commentBox: {
    backgroundColor: colors.accentSubtle,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    padding: spacing.md,
    gap: spacing.xs,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  commentLabel: {
    ...typography.small,
    fontFamily: fontFamilies.bold,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  commentText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  actions: {
    gap: spacing.sm,
  },
  actionPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    minHeight: 48,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
  },
  actionPrimaryText: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.semibold,
    color: colors.onAccent,
  },
  actionOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    minHeight: 48,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  actionOutlineText: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.semibold,
    color: colors.accent,
  },

  // Порожній стан і помилка
  emptyCard: {
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    marginTop: spacing.sm,
    ...shadows.sm,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.accentSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyDesc: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.xs,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.semibold,
    color: colors.accent,
  },
}));