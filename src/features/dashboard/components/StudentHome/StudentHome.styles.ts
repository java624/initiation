import { makeStyles } from '@/theme/makeStyles';
import { fontFamilies } from '@/theme/tokens/typography';

export const useStyles = makeStyles(({ colors, spacing, radius, typography, shadows }) => ({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },

  // Фіолетове сяйво за шапкою
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },

  // Шапка
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    marginRight: spacing.md,
  },
  greeting: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: colors.accentSubtle,
    borderWidth: 1.5,
    borderColor: colors.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.bold,
    color: colors.accent,
  },

  // Чіпи під шапкою
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipText: {
    ...typography.small,
    color: colors.textSecondary,
  },

  // Головна картка "Наступний урок"
  heroWrapper: {
    borderRadius: radius.xl,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
    elevation: 10,
  },
  heroGradient: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.md,
    overflow: 'hidden',
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  heroBadgeText: {
    ...typography.small,
    color: colors.onAccent,
    opacity: 0.85,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroTitle: {
    ...typography.h2,
    color: colors.onAccent,
  },
  heroMeta: {
    ...typography.body,
    color: colors.onAccent,
    opacity: 0.9,
  },
  heroPill: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    overflow: 'hidden',
  },
  heroPillBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.onAccent,
    opacity: 0.2,
  },
  heroPillText: {
    ...typography.caption,
    fontFamily: fontFamilies.bold,
    color: colors.onAccent,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    minHeight: 52,
    borderRadius: radius.full,
    backgroundColor: colors.onAccent,
  },
  heroButtonText: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.bold,
    color: colors.accent,
  },

  // Порожній стан (немає уроку)
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.accentSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  emptyDesc: {
    ...typography.body,
    color: colors.textSecondary,
  },

  // Дві картки статистики
  statsRow: {
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
    gap: spacing.sm,
    ...shadows.sm,
  },
  statValue: {
    ...typography.h1,
    fontSize: 30,
    lineHeight: 36,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  // Слова на повторення
  wordsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.md,
  },
  wordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  wordsCount: {
    ...typography.h1,
    fontFamily: fontFamilies.extrabold,
    fontSize: 48,
    lineHeight: 54,
    color: colors.accent,
  },
  wordsInfo: {
    flex: 1,
    gap: spacing.xxs,
  },
  wordsTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  wordsDesc: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  // Колоди (горизонтальна карусель)
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  packetsScroll: {
    marginHorizontal: -spacing.lg,
  },
  packetsContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  packetCard: {
    width: 260,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.sm,
  },
  packetTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  packetMeta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },

  // Pomodoro
  pomodoroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  pomodoroInfo: {
    flex: 1,
  },
  pomodoroTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  pomodoroDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },

  // Нижній ряд (тимчасово, доки немає вкладки "Профіль")
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  footerText: {
    ...typography.caption,
    fontFamily: fontFamilies.semibold,
    color: colors.textSecondary,
  },
}));