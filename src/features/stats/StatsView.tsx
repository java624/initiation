import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@/shared/ui';
import { useStatsStore } from './useStatsStore';
import { useDictionaryStore } from '../dictionary/useDictionaryStore';

export const StatsView: React.FC = () => {
  const { completedSessions, focusedMinutes } = useStatsStore();
  const wordsCount = useDictionaryStore((state) => state.words.length);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="h2">📊 Статистика за сьогодні</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text variant="h2">{completedSessions}</Text>
            <Text variant="caption">Сесій фокусу</Text>
          </View>

          <View style={styles.statBox}>
            <Text variant="h2">{focusedMinutes} хв</Text>
            <Text variant="caption">Час у фокусі</Text>
          </View>

          <View style={styles.statBox}>
            <Text variant="h2">{wordsCount}</Text>
            <Text variant="caption">Слів у словнику</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    gap: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
});
