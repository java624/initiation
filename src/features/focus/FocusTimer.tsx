import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { scheduleTimerCompleteNotification } from '@/shared/lib/notificationService';
import { Button, Text } from '@/shared/ui';
import { makeStyles } from '@/theme';

import { useTimerStore } from './useTimerStore';

const MODES = [
  { mode: 'focus', key: 'timer.focus', fallback: 'Фокус' },
  { mode: 'shortBreak', key: 'timer.shortBreak', fallback: 'Коротка перерва' },
  { mode: 'longBreak', key: 'timer.longBreak', fallback: 'Довга перерва' },
] as const;

const TIMER_SIZE = 240;
const TIMER_BORDER = 6;
const TIMER_FONT_SIZE = 56;

export default function FocusScreen() {
  const styles = useStyles();
  const { t } = useTranslation();
  const { mode, status, timeLeft, setMode, startTimer, pauseTimer, resetTimer, tick } =
    useTimerStore();

  useEffect(() => {
    if (status !== 'running') return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [status, tick]);

  useEffect(() => {
    if (timeLeft === 0 && status === 'idle') {
      scheduleTimerCompleteNotification(
        t('timer.completedTitle', 'Сесія завершена! 🎉'),
        t('timer.completedBody', 'Час зробити перерву або продовжити роботу.'),
      );
    }
  }, [timeLeft, status, t]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <View style={styles.modesContainer}>
        {MODES.map((item) => {
          const active = mode === item.mode;
          const label = t(item.key, item.fallback);
          return (
            <Pressable
              key={item.mode}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ selected: active }}
              style={[styles.modeButton, active && styles.activeModeButton]}
              onPress={() => setMode(item.mode)}
            >
              <Text variant="caption" style={active ? styles.activeModeText : styles.modeText}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.timerCircle}>
        <Text variant="h1" style={styles.timerText}>
          {formattedTime}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        {status === 'running' ? (
          <Button label={t('timer.pause', 'Пауза')} variant="primary" onPress={pauseTimer} />
        ) : (
          <Button label={t('timer.start', 'Старт')} variant="primary" onPress={startTimer} />
        )}
        <Button label={t('timer.reset', 'Скинути')} variant="secondary" onPress={resetTimer} />
      </View>
    </View>
  );
}

const useStyles = makeStyles(({ colors, spacing, radius, typography }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.sm,
  },
  modesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  modeButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  activeModeButton: {
    backgroundColor: colors.accent,
  },
  modeText: {
    color: colors.textPrimary,
  },
  activeModeText: {
    ...typography.bodyMedium,
    color: colors.onAccent,
  },
  timerCircle: {
    width: TIMER_SIZE,
    height: TIMER_SIZE,
    borderRadius: TIMER_SIZE / 2,
    borderWidth: TIMER_BORDER,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  timerText: {
    fontSize: TIMER_FONT_SIZE,
    lineHeight: TIMER_FONT_SIZE + spacing.xs,
    color: colors.textPrimary,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
}));
