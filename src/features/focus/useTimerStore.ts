import { create } from 'zustand';

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  mode: 'work' | 'break';
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

const WORK_TIME = 25 * 60; // 25 минут
const BREAK_TIME = 5 * 60;  // 5 минут

export const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: WORK_TIME,
  isRunning: false,
  mode: 'work',

  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),
  resetTimer: () =>
    set((state) => ({
      isRunning: false,
      timeLeft: state.mode === 'work' ? WORK_TIME : BREAK_TIME,
    })),

  tick: () => {
    const { timeLeft, mode } = get();
    if (timeLeft > 1) {
      set({ timeLeft: timeLeft - 1 });
    } else {
      const nextMode = mode === 'work' ? 'break' : 'work';
      set({
        mode: nextMode,
        timeLeft: nextMode === 'work' ? WORK_TIME : BREAK_TIME,
        isRunning: false,
      });
    }
  },
}));