import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Screen, Text } from '@/shared/ui';
import { fontFamilies, makeStyles } from '@/theme';

export default function HomeScreen() {
  const router = useRouter();
  const streakDays = 5;
  const completedSessions = 3;
  const targetSessions = 8;
  const pendingWordsCount = 12;

  const progressPercent = Math.min((completedSessions / targetSessions) * 100, 100);
  const styles = useStyles({ progressPercent });

  return (
    <Screen style={styles.container}>
      {/* Приветствие и Стрік 🔥 */}
      <View style={styles.header}>
        <View>
          <Text variant="h2">Привіт, Іване! 👋</Text>
          <Text variant="caption">Час продуктивного фокусу</Text>
        </View>
        <Card style={styles.streakCard}>
          <Text variant="bodyMedium">🔥 {streakDays} днів</Text>
        </Card>
      </View>

      {/* Прогрес-бар денної цілі */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text variant="subtitle">Денна ціль</Text>
          <Text variant="body">
            {completedSessions} / {targetSessions} сесій
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>
      </Card>

      {/* Карточка «На повторення сьогодні» */}
      <Card style={styles.sectionCard}>
        <Text variant="subtitle">Словник</Text>
        <Text variant="body" style={styles.cardDesc}>
          Сьогодні до повторення: <Text style={styles.boldText}>{pendingWordsCount} слів</Text>
        </Text>
        <Button
          label="Почати вчити"
          variant="primary"
          onPress={() => router.push('/dictionary' as any)}
        />
      </Card>

      {/* Швидкий запуск Pomodoro */}
      <Card style={styles.sectionCard}>
        <Text variant="subtitle">Pomodoro Таймер</Text>
        <Text variant="body" style={styles.cardDesc}>
          Режим фокусу: 25 хвилин
        </Text>
        <Button
          label="Швидкий старт"
          variant="secondary"
          onPress={() => router.push('/(tabs)/focus' as any)}
        />
      </Card>
    </Screen>
  );
}

type StyleProps = { progressPercent: number };

const PROGRESS_BAR_HEIGHT = 8;

const useStyles = makeStyles(({ colors, spacing, radius }, props?: StyleProps) => ({
  container: {
    padding: spacing.sm,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakCard: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
  },
  sectionCard: {
    padding: spacing.sm,
    gap: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarBackground: {
    height: PROGRESS_BAR_HEIGHT,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.sm,
    overflow: 'hidden',
    marginTop: spacing.xs,
  },
  progressBarFill: {
    height: '100%',
    width: `${props?.progressPercent ?? 0}%`,
    backgroundColor: colors.accent,
    borderRadius: radius.sm,
  },
  cardDesc: {
    marginVertical: spacing.xxs,
  },
  boldText: {
    fontFamily: fontFamilies.bold,
  },
}));
