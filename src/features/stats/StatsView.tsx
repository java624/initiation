import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useDictionaryStore } from '@/features/dictionary/useDictionaryStore';
import { Card, Screen, Text } from '@/shared/ui';

import { useStyles } from './StatsView.styles';
import { useStatsStore } from './useStatsStore';

const SCREEN_EDGES = ['left', 'right', 'bottom'] as const;

export const StatsView: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { completedSessions, focusedMinutes } = useStatsStore();
  const wordsCount = useDictionaryStore((state) => state.words.length);

  const stats = [
    { key: 'sessions', value: String(completedSessions), label: t('statsView.sessions') },
    {
      key: 'focusTime',
      value: t('statsView.minutes', { count: focusedMinutes }),
      label: t('statsView.focusTime'),
    },
    { key: 'words', value: String(wordsCount), label: t('statsView.words') },
  ];

  return (
    <Screen scrollable edges={SCREEN_EDGES}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.statsGrid}>
            {stats.map((item) => (
              <View
                key={item.key}
                style={styles.statBox}
                accessible
                accessibilityLabel={`${item.label}: ${item.value}`}
              >
                <Text variant="h2">{item.value}</Text>
                <Text variant="caption">{item.label}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </Screen>
  );
};
