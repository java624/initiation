import { makeStyles } from '@/theme/makeStyles';
import { fontFamilies } from '@/theme/tokens/typography';

// Ширина однієї опції перемикача мови (повзунок рухається рівно на цю відстань)
export const LANG_OPTION_WIDTH = 44;

export const useStyles = makeStyles(({ colors, spacing, radius, typography }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },

  // Фіолетове сяйво зверху екрана
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  innerContainer: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },

  // Обгортка блоку на всю ширину (для SwapBlock)
  swapFull: {
    width: '100%',
  },

  // Перемикач мови UA / EN
  topBar: {
    width: '100%',
    alignItems: 'flex-end',
  },
  langSwitch: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9999,
    padding: 3,
  },
  langIndicator: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: LANG_OPTION_WIDTH,
    height: 32,
    borderRadius: 9999,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  langOption: {
    width: LANG_OPTION_WIDTH,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langText: {
    ...typography.small,
    fontFamily: fontFamilies.semibold,
    textAlign: 'center',
  },

  // Центральний блок (лого + форма)
  content: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
  },

  // Header / Branding
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
    width: '100%',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 9999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  logo: {
    width: 52,
    height: 40,
  },
  welcomeTitle: {
    ...typography.h1,
    fontSize: 30,
    lineHeight: 36,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxs,
  },

  // Форма (без видимої картки)
  mainCard: {
    width: '100%',
    gap: spacing.sm,
  },
  form: {
    width: '100%',
    gap: spacing.sm,
  },
  passwordToggle: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Forgot Password
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    minHeight: 36,
    justifyContent: 'center',
    paddingVertical: spacing.xxs,
  },
  forgotPasswordText: {
    ...typography.caption,
    fontFamily: fontFamilies.semibold,
    color: colors.accent,
  },

  // Кнопка "Увійти": свічення, глянець, рамка, відблиск, коло зі стрілкою
  submitButtonWrapper: {
    marginTop: spacing.xs,
    borderRadius: 9999,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 22,
    elevation: 12,
  },
  gradientButton: {
    borderRadius: 9999,
    width: '100%',
    overflow: 'hidden',
  },
  buttonHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    opacity: 0.22,
  },
  buttonBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.onAccent,
    opacity: 0.25,
  },
  buttonShine: {
    position: 'absolute',
    top: -30,
    bottom: -30,
    left: 0,
    width: 70,
    backgroundColor: colors.onAccent,
    opacity: 0.16,
  },
  submitButton: {
    minHeight: 60,
    borderRadius: 9999,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  submitButtonDisabled: {
    opacity: 0.8,
  },
  submitButtonText: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.bold,
    fontSize: 17,
    color: colors.onAccent,
    letterSpacing: 0.4,
  },
  arrowSlot: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  arrowCircleBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.onAccent,
    opacity: 0.22,
  },

  // General Error Banner
  errorBanner: {
    backgroundColor: colors.dangerSubtle,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.danger,
    width: '100%',
  },
  errorBannerText: {
    ...typography.caption,
    color: colors.danger,
    textAlign: 'center',
  },

  // Information banner
  infoBanner: {
    backgroundColor: colors.accentSubtle,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    width: '100%',
  },
  infoBannerText: {
    ...typography.caption,
    color: colors.accent,
    textAlign: 'center',
  },

  // Низ екрана
  bottomSection: {
    marginTop: spacing.lg,
    alignItems: 'center',
    width: '100%',
    gap: spacing.xs,
  },
  trialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    width: '100%',
    minHeight: 54,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: colors.accent,
    paddingHorizontal: spacing.md,
  },
  trialText: {
    ...typography.bodyMedium,
    fontFamily: fontFamilies.semibold,
    color: colors.accent,
  },
  demoButton: {
    minHeight: 44,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoText: {
    ...typography.small,
    color: colors.textTertiary,
  },
}));