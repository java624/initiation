import { UserRole } from '../../types';

export interface AuthViewProps {
  onSuccess?: () => void;
  defaultRole?: UserRole;
  initialMode?: 'signIn' | 'signUp';
  onBackToOnboarding?: () => void;
}
