import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ProfileState {
  username: string;
  notificationsEnabled: boolean;
  dailyGoalMinutes: number;
  setUsername: (name: string) => void;
  toggleNotifications: () => void;
  setDailyGoalMinutes: (minutes: number) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  username: 'Иван',
  notificationsEnabled: true,
  dailyGoalMinutes: 20,
  setUsername: (username) => set({ username }),
  toggleNotifications: () =>
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  setDailyGoalMinutes: (dailyGoalMinutes) => set({ dailyGoalMinutes }),
}));
