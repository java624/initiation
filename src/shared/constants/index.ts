export const ROUTES = {
  AUTH: {
    SIGN_IN: '/(auth)/sign-in',
    SIGN_UP: '/(auth)/sign-up',
    FORGOT_PASSWORD: '/(auth)/forgot-password',
    ONBOARDING: '/(auth)/onboarding',
  },
  TABS: {
    HOME: '/(tabs)/home',
    DECKS: '/(tabs)/decks',
    FOCUS: '/(tabs)/focus',
    STATS: '/(tabs)/stats',
    SETTINGS: '/(tabs)/settings',
  },
} as const;

export const QUERY_KEYS = {
  DECKS: ['decks'] as const,
  CARDS: ['cards'] as const,
  STUDY_SESSION: ['study-session'] as const,
  USER_STATS: ['user-stats'] as const,
  USER_PROFILE: ['user-profile'] as const,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'novaflow_auth_token',
  THEME_MODE: 'novaflow_theme_mode',
  APP_LANGUAGE: 'novaflow_app_language',
  FOCUS_TIMER_STATE: 'novaflow_timer_state',
} as const;
