import { makeStyles } from '@/theme';

const AVATAR_SIZE = 48;

export const useStyles = makeStyles(({ colors, spacing, radius, typography }) => ({
  container: {
    padding: spacing.sm,
    gap: spacing.sm,
  },
  card: {
    marginBottom: spacing.xs,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h3,
    color: colors.onAccent,
  },
  emailText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  editContainer: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  infoContainer: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  logoutWrapper: {
    marginTop: spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  settingBlock: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
}));
