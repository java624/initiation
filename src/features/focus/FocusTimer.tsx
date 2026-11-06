import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTimerStore } from './useTimerStore';
import { makeStyles } from '../../constants/theme';
import { useTranslation } from 'react-i18next';
import { scheduleTimerCompleteNotification } from '../../shared/lib/notificationService';

export default function FocusScreen() {
  const styles = useStyles();
  const { t } = useTranslation();
  const { mode, status, timeLeft, setMode, startTimer, pauseTimer, resetTimer, tick } = useTimerStore();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === 'running') {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, tick]);

  useEffect(() => {
    if (timeLeft === 0 && status === 'idle') {
      scheduleTimerCompleteNotification(
        t('timer.completedTitle', 'Сесія завершена! 🎉'),
        t('timer.completedBody', 'Час зробити перерву або продовжити роботу.')
      );
    }
  }, [timeLeft, status, t]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <View style={styles.modesContainer}>
        <TouchableOpacity 
          style={[styles.modeButton, mode === 'focus' && styles.activeModeButton]} 
          onPress={() => setMode('focus')}
        >
          <Text style={[styles.modeText, mode === 'focus' && styles.activeModeText]}>
            {t('timer.focus', 'Фокус')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, mode === 'shortBreak' && styles.activeModeButton]} 
          onPress={() => setMode('shortBreak')}
        >
          <Text style={[styles.modeText, mode === 'shortBreak' && styles.activeModeText]}>
            {t('timer.shortBreak', 'Коротка перерва')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, mode === 'longBreak' && styles.activeModeButton]} 
          onPress={() => setMode('longBreak')}
        >
          <Text style={[styles.modeText, mode === 'longBreak' && styles.activeModeText]}>
            {t('timer.longBreak', 'Довга перерва')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{formattedTime}</Text>
      </View>

      <View style={styles.controlsContainer}>
        {status === 'running' ? (
          <TouchableOpacity style={styles.button} onPress={pauseTimer}>
            <Text style={styles.buttonText}>{t('timer.pause', 'Пауза')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>{t('timer.start', 'Старт')}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetTimer}>
          <Text style={styles.buttonText}>{t('timer.reset', 'Скинути')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.base,
  },
  modesContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  modeButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
  },
  activeModeButton: {
    backgroundColor: theme.colors.primary,
  },
  modeText: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
  },
  activeModeText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  timerCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 6,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
  },
  timerText: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
  },
  resetButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
    fontSize: theme.typography.sizes.md,
  },
}));