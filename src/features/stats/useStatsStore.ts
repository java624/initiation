import { create } from 'zustand';

interface StatsState {
  completedSessions: number;
  focusedMinutes: number;
  incrementSessions: () => void;
}

export const useStatsStore = create<StatsState>((set) => ({
  completedSessions: 3,
  focusedMinutes: 75,
  incrementSessions: () =>
    set((state) => ({
      completedSessions: state.completedSessions + 1,
      focusedMinutes: state.focusedMinutes + 25,
    })),
}));