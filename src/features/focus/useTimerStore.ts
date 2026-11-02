import { create } from 'zustand';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused';

const MODE_DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number;
  targetEndTimestamp: number | null;
  setMode: (mode: TimerMode) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  mode: 'focus',
  status: 'idle',
  timeLeft: MODE_DURATIONS.focus,
  targetEndTimestamp: null,

  setMode: (mode) => {
    set({
      mode,
      status: 'idle',
      timeLeft: MODE_DURATIONS[mode],
      targetEndTimestamp: null,
    });
  },

  startTimer: () => {
    const { timeLeft } = get();

    const targetEndTimestamp = Date.now() + timeLeft * 1000;
    set({ status: 'running', targetEndTimestamp });
  },

  pauseTimer: () => {
    const { targetEndTimestamp } = get();
    if (targetEndTimestamp) {
      const remainingSeconds = Math.max(0, Math.ceil((targetEndTimestamp - Date.now()) / 1000));
      set({ status: 'paused', timeLeft: remainingSeconds, targetEndTimestamp: null });
    } else {
      set({ status: 'paused' });
    }
  },

  resetTimer: () => {
    const { mode } = get();
    set({
      status: 'idle',
      timeLeft: MODE_DURATIONS[mode],
      targetEndTimestamp: null,
    });
  },

  tick: () => {
    const { status, targetEndTimestamp } = get();
    if (status !== 'running' || !targetEndTimestamp) return;

    const remainingSeconds = Math.max(0, Math.ceil((targetEndTimestamp - Date.now()) / 1000));
    
    if (remainingSeconds === 0) {
      set({ status: 'idle', timeLeft: 0, targetEndTimestamp: null });
    } else {
      set({ timeLeft: remainingSeconds });
    }
  },
}));