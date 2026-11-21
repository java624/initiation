import { StyleSheet } from 'react-native';

import { makeStyles } from '@/theme';

const MIN_TOUCH_SIZE = 44;

export const useStyles = makeStyles(({ colors, spacing }) => ({
  container: {
    padding: spacing.sm,
  },
  card: {
    gap: spacing.sm,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  list: {
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  deleteButton: {
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
