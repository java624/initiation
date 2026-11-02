import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ProfileState {
  username: string;
  notificationsEnabled: boolean;
  dailyGoalMinutes: number;
  theme: ThemeMode; 
  setUsername: (name: string) => void;
  toggleNotifications: () => void;
  setDailyGoalMinutes: (minutes: number) => void;
  setTheme: (theme: ThemeMode) => void; 
}

export const useProfileStore = create<ProfileState>((set) => ({
  username: 'Иван',
  notificationsEnabled: true,
  dailyGoalMinutes: 20,
  theme: 'system', // 👈 Значение по умолчанию
  setUsername: (username) => set({ username }),
  toggleNotifications: () =>
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  setDailyGoalMinutes: (dailyGoalMinutes) => set({ dailyGoalMinutes }),
  setTheme: (theme) => set({ theme }), 
}));