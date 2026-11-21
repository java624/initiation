import { makeStyles } from '@/theme/makeStyles';

export const useStyles = makeStyles(({ colors, spacing, radius, typography }) => ({
  container: {
    width: '100%',
  },
  inputWrapper: {
    minHeight: 60,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    // М'яка тінь, щоб поле "піднімалося" над фоном
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: colors.borderFocus,
    backgroundColor: colors.surface,
    // Фіолетове свічення на фокусі
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 4,
  },
  inputWrapperError: {
    borderColor: colors.danger,
  },
  leftIconContainer: {
    marginRight: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xxs,
  },
  floatingLabel: {
    position: 'absolute',
    left: 0,
    ...typography.body,
    color: colors.textTertiary,
  },
  textInput: {
    ...typography.body,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
    paddingTop: 14,
  },
  rightIconContainer: {
    marginLeft: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  errorText: {
    ...typography.small,
    color: colors.danger,
    marginTop: spacing.xxs,
    marginLeft: spacing.xxs,
  },
}));