export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

/** Тривалість режимів Pomodoro в секундах. */
export const TIMER_DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

/** Як часто перераховуємо залишок часу (мс). Менше за 1000, щоб секунди не «перестрибували». */
export const TIMER_TICK_MS = 250;
