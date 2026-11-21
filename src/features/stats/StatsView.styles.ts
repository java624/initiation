import { makeStyles } from '@/theme';

export const useStyles = makeStyles(({ spacing }) => ({
  container: {
    padding: spacing.sm,
  },
  card: {
    gap: spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
}));
