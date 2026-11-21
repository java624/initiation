import { makeStyles } from '@/theme/makeStyles';

export const useStyles = makeStyles(({ colors, spacing }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 100,
  },
  glow: {
    position: 'absolute',
    width: 180,
    height: 140,
    borderRadius: 9999,
    backgroundColor: colors.accentGlow,
  },
}));
