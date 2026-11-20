import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Text } from '@/shared/ui/Text';

import { useStyles } from './DailyGoalCard.styles';
import type { DailyGoalCardProps } from './DailyGoalCard.types';

export const DailyGoalCard = ({ focusedMinutes, goalMinutes }: DailyGoalCardProps) => {
  const { t } = useTranslation();
  const progress = goalMinutes > 0 ? Math.min(focusedMinutes / goalMinutes, 1) : 0;
  const styles = useStyles({ progress });
  const title = t('student.dailyGoalTitle');

  return (
    <View
      style={styles.card}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={title}
      accessibilityValue={{ min: 0, max: goalMinutes, now: Math.min(focusedMinutes, goalMinutes) }}
    >
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>
          {t('student.dailyGoalValue', { done: focusedMinutes, goal: goalMinutes })}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={styles.fill} />
      </View>
    </View>
  );
};
