import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../shared/ui/Screen';
import { Text } from '../../shared/ui/Text';
import { Card } from '../../shared/ui/Card';
import { Button } from '../../shared/ui/Button';
import { theme } from '../../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  // Заглушки данных (позже подключим сторы)
  const streakDays = 5;
  const completedSessions = 3;
  const targetSessions = 8;
  const pendingWordsCount = 12;

  const progressPercent = Math.min((completedSessions / targetSessions) * 100, 100);

  return (
    <Screen style={styles.container}>
      {/* Приветствие и Стрік 🔥 */}
      <View style={styles.header}>
        <View>
          <Text variant="title">Привіт, Іване! 👋</Text>
          <Text variant="caption">Час продуктивного фокусу</Text>
        </View>
        <Card style={styles.streakCard}>
          <Text style={styles.streakText}>🔥 {streakDays} днів</Text>
        </Card>
      </View>

      {/* Прогрес-бар денної цілі */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text variant="subtitle">Денна ціль</Text>
          <Text variant="body">{completedSessions} / {targetSessions} сесій</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </Card>

      {/* Карточка «На повторення сьогодні» */}
      <Card style={styles.sectionCard}>
        <Text variant="subtitle">Словник</Text>
        <Text variant="body" style={styles.cardDesc}>
          Сьогодні до повторення: <Text style={styles.boldText}>{pendingWordsCount} слів</Text>
        </Text>
        <Button 
  title="Почати вчити" 
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
  title="Швидкий старт" 
  variant="secondary" 
  onPress={() => router.push('/(tabs)/focus' as any)} 
/>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.base,
    gap: theme.spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakCard: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  streakText: {
    fontWeight: 'bold',
    fontSize: theme.typography.sizes.md,
  },
  sectionCard: {
    padding: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    marginTop: theme.spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
  },
  cardDesc: {
    marginVertical: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
});