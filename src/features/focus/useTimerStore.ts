import { create } from 'zustand';

import { TIMER_DURATIONS, type TimerMode } from '@/shared/constants/timer';
import {
  cancelTimerNotification,
  scheduleTimerNotification,
  type TimerNotificationTexts,
} from '@/shared/lib/notificationService';

export type { TimerMode };
export type TimerStatus = 'idle' | 'running' | 'paused';

interface LastCompleted {
  mode: TimerMode;
  minutes: number;
  at: number;
}

interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number;
  /** Момент завершення (мс). Час рахуємо від нього, тому у фоні відлік не збивається. */
  targetEndTimestamp: number | null;
  /** id запланованого локального сповіщення про завершення. */
  notificationId: string | null;
  /** Остання завершена сесія. З неї зберігаємо хвилини фокусу у focus_sessions. */
  lastCompleted: LastCompleted | null;
  setMode: (mode: TimerMode) => void;
  startTimer: (texts?: TimerNotificationTexts) => Promise<void>;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

const remainingSeconds = (target: number): number =>
  Math.max(0, Math.ceil((target - Date.now()) / 1000));

export const useTimerStore = create<TimerState>((set, get) => ({
  mode: 'focus',
  status: 'idle',
  timeLeft: TIMER_DURATIONS.focus,
  targetEndTimestamp: null,
  notificationId: null,
  lastCompleted: null,

  setMode: (mode) => {
    const { notificationId } = get();
    set({
      mode,
      status: 'idle',
      timeLeft: TIMER_DURATIONS[mode],
      targetEndTimestamp: null,
      notificationId: null,
    });
    void cancelTimerNotification(notificationId);
  },

  startTimer: async (texts) => {
    const { status, timeLeft } = get();
    if (status === 'running') return;

    const targetEndTimestamp = Date.now() + timeLeft * 1000;
    set({ status: 'running', targetEndTimestamp });

    if (!texts) return;

    // Сповіщення плануємо наперед: воно спрацює, навіть якщо застосунок згорнуто.
    const id = await scheduleTimerNotification(timeLeft, texts);

    // Поки планувалось, таймер могли поставити на паузу або скинути.
    if (get().targetEndTimestamp !== targetEndTimestamp) {
      await cancelTimerNotification(id);
      return;
    }
    set({ notificationId: id });
  },

  pauseTimer: () => {
    const { targetEndTimestamp, notificationId } = get();
    if (targetEndTimestamp) {
      set({
        status: 'paused',
        timeLeft: remainingSeconds(targetEndTimestamp),
        targetEndTimestamp: null,
        notificationId: null,
      });
    } else {
      set({ status: 'paused' });
    }
    void cancelTimerNotification(notificationId);
  },

  resetTimer: () => {
    const { mode, notificationId } = get();
    set({
      status: 'idle',
      timeLeft: TIMER_DURATIONS[mode],
      targetEndTimestamp: null,
      notificationId: null,
    });
    void cancelTimerNotification(notificationId);
  },

  tick: () => {
    const { status, targetEndTimestamp, mode } = get();
    if (status !== 'running' || !targetEndTimestamp) return;

    const left = remainingSeconds(targetEndTimestamp);
    if (left > 0) {
      set({ timeLeft: left });
      return;
    }

    // Час вийшов. Сповіщення вже спрацювало саме, скасовувати його не треба.
    set({
      status: 'idle',
      timeLeft: TIMER_DURATIONS[mode],
      targetEndTimestamp: null,
      notificationId: null,
      lastCompleted: { mode, minutes: TIMER_DURATIONS[mode] / 60, at: Date.now() },
    });
  },
}));
