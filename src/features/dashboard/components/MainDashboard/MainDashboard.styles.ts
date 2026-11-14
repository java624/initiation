import { makeStyles } from '@/theme/makeStyles';

export const useStyles = makeStyles(({ colors, spacing, radius, typography, shadows }) => ({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.xl,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandBadge: {
    backgroundColor: colors.accentSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  brandText: {
    ...typography.small,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  profileTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  rolePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  rolePillStudent: {
    backgroundColor: colors.accentSubtle,
    borderColor: colors.accent,
  },
  rolePillTeacher: {
    backgroundColor: colors.successSubtle,
    borderColor: colors.success,
  },
  rolePillAdmin: {
    backgroundColor: colors.warningSubtle,
    borderColor: colors.warning,
  },
  rolePillText: {
    ...typography.caption,
    textTransform: 'uppercase',
  },
  rolePillTextStudent: {
    color: colors.accent,
  },
  rolePillTextTeacher: {
    color: colors.success,
  },
  rolePillTextAdmin: {
    color: colors.warning,
  },
  roleSwitcherRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  roleSwitchButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
  },
  roleSwitchButtonActive: {
    backgroundColor: colors.accent,
  },
  roleSwitchButtonText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  roleSwitchButtonTextActive: {
    ...typography.caption,
    color: colors.textInverse,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.sm,
  },
  statIcon: {
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.sm,
  },
  actionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionCardInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  tagList: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  tag: {
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
  },
  tagText: {
    ...typography.small,
    color: colors.textSecondary,
  },
}));
