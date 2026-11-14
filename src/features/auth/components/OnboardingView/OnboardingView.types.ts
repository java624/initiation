import { UserRole } from '../../types';

export interface OnboardingViewProps {
  /** Викликається, коли користувач натискає «Почати» */
  onGetStarted: () => void;
  /** Викликається, коли користувач обирає «Вже маю акаунт» */
  onSignIn: () => void;
  /** Викликається для швидкого демо-входу */
  onDemoLogin?: (role: UserRole) => void;
  /** Викликається при пропуску онбордингу */
  onSkip?: () => void;
}
