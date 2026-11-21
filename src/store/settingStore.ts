import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'uk' | 'en';

interface SettingsState {
  theme: ThemeMode;
  language: Language;
  dailyGoal: number; // Дневная цель (например, 20 карточек)
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  setDailyGoal: (goal: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'system',
  language: 'uk',
  dailyGoal: 20,
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setDailyGoal: (dailyGoal) => set({ dailyGoal }),
}));
