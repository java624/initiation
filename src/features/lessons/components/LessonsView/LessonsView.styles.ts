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

  // Заголовок дня
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  // Картка заняття
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  cardNext: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSubtle,
  },
  timeColumn: {
    width: 52,
  },
  timeStart: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.bold,
    color: colors.textPrimary,
  },
  timeEnd: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  bar: {
    alignSelf: 'stretch',
    width: 3,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
  },
  barPast: {
    backgroundColor: colors.borderStrong,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  lessonTitle: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.semibold,
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.xs,
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
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

  // Порожній стан і помилка
  emptyCard: {
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    marginTop: spacing.lg,
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