import { create } from 'zustand';

interface ProfileState {
  username: string;
  notificationsEnabled: boolean;
  dailyGoalMinutes: number;
  setUsername: (name: string) => void;
  toggleNotifications: () => void;
  setDailyGoal: (minutes: number) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  username: 'Користувач NovaFlow',
  notificationsEnabled: true,
  dailyGoalMinutes: 120,
  
  setUsername: (username) => set({ username }),
  toggleNotifications: () => 
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  setDailyGoal: (dailyGoalMinutes) => set({ dailyGoalMinutes }),
}));