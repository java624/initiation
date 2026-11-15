export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  avatarUrl?: string;
  lessonsLeft?: number;
  learningLanguage?: string;
  planType?: string;
  dailyGoal: number;
  streakDays: number;
  createdAt: string;
}

export interface AuthSession {
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
