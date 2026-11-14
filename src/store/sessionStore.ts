import { create } from 'zustand';
import { UserProfile, UserRole } from '@/features/auth/types';

interface SessionState {
  user: UserProfile | null;
  accessToken: string | null;
  /** Початкова перевірка токена при старті додатка (для Splash) */
  isInitialized: boolean;
  /** Стан відправки форми входу / реєстрації (для кнопки) */
  isSubmitting: boolean;
  isAuthenticated: boolean;
  setSession: (user: UserProfile | null, token: string | null) => void;
  setRole: (role: UserRole) => void;
  clearSession: () => void;
  setInitialized: (isInitialized: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  accessToken: null,
  isInitialized: false,
  isSubmitting: false,
  isAuthenticated: false,

  setSession: (user, token) =>
    set({
      user,
      accessToken: token,
      isAuthenticated: !!user,
      isInitialized: true,
      isSubmitting: false,
    }),

  setRole: (role) =>
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    })),

  clearSession: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitialized: true,
      isSubmitting: false,
    }),

  setInitialized: (isInitialized) => set({ isInitialized }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
