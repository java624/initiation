import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text } from '@/shared/ui';
import { useTimerStore } from './useTimerStore';

export const FocusTimer: React.FC = () => {
  const { timeLeft, isRunning, mode, startTimer, pauseTimer, resetTimer, tick } =
    useTimerStore();

  useEffect(() => {
    let interval: any = null; // Заменили NodeJS.Timeout на any
    if (isRunning) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, tick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card style={styles.card}>
      <Text variant="title" style={styles.title}>
        {mode === 'work' ? '🎯 Режим фокусу' : '☕ Перерва'}
      </Text>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      <View style={styles.controls}>
        {isRunning ? (
          <Button title="Пауза" onPress={pauseTimer} variant="secondary" />
        ) : (
          <Button title="Старт" onPress={startTimer} />
        )}
        <Button title="Скинути" onPress={resetTimer} variant="secondary" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 24,
    margin: 16,
  },
  title: {
    marginBottom: 16,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
});