import { supabase } from '@/shared/lib/supabase';
import { SignInInput, SignUpInput } from '../schemas/auth.schema';
import { UserProfile, UserRole } from '../types';

interface RawProfile {
  id: string;
  email?: string | null;
  role?: string | null;
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  lessons_left?: number | null;
  lessons_balance?: number | null;
  learning_language?: string | null;
  language_focus?: string | null;
  plan_type?: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
}

const buildUserProfile = (
  authUserId: string,
  authUserEmail: string,
  authCreatedAt: string,
  profile?: RawProfile | null,
  metadata?: Record<string, unknown>,
): UserProfile => {
  const rawRole = String(profile?.role || (typeof metadata?.role === 'string' ? metadata.role : '') || 'student').toLowerCase();
  const role: UserRole = rawRole === 'teacher' || rawRole === 'admin' ? rawRole : 'student';

  const constructedName =
    profile?.full_name?.trim() ||
    [profile?.first_name, profile?.last_name].filter(Boolean).join(' ').trim() ||
    (typeof metadata?.name === 'string' ? metadata.name : '') ||
    authUserEmail.split('@')[0] ||
    'Користувач';

  return {
    id: authUserId,
    email: authUserEmail,
    name: constructedName,
    fullName: profile?.full_name || undefined,
    firstName: profile?.first_name || undefined,
    lastName: profile?.last_name || undefined,
    role,
    avatarUrl: profile?.avatar_url || undefined,
    lessonsLeft: profile?.lessons_left ?? profile?.lessons_balance ?? 0,
    learningLanguage: profile?.learning_language ?? profile?.language_focus ?? 'Англійська',
    planType: profile?.plan_type || undefined,
    dailyGoal: 20,
    streakDays: 7,
    createdAt: profile?.created_at || authCreatedAt,
  };
};

export const authApi = {
  async signIn({ email, password }: SignInInput): Promise<{ user: UserProfile; token: string }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user || !data.session) {
      throw new Error(error?.message ?? 'Не вдалося увійти');
    }

    // Запит до реальної таблиці profiles веб-сайту
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    const user = buildUserProfile(
      data.user.id,
      data.user.email ?? email,
      data.user.created_at,
      profile as RawProfile | null,
      data.user.user_metadata,
    );

    return { user, token: data.session.access_token };
  },

  async signUp({ email, password, name, role = 'student' }: SignUpInput): Promise<{ user: UserProfile; token: string | null }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (error || !data.user) {
      throw new Error(error?.message ?? 'Не вдалося зареєструватися');
    }

    // Спроба зберегти профіль у таблицю profiles
    try {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: name,
        role,
        lessons_left: 0,
      });
    } catch {
      // Якщо RLS забороняє або є тригер, ігноруємо
    }

    const user = buildUserProfile(
      data.user.id,
      data.user.email ?? email,
      data.user.created_at,
      null,
      { name, role },
    );

    return { user, token: data.session?.access_token ?? null };
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },

  async getCurrentSession(): Promise<{ user: UserProfile | null; token: string | null }> {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user) {
      return { user: null, token: null };
    }

    const u = data.session.user;

    // Підтягуємо профіль з public.profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', u.id)
      .maybeSingle();

    const user = buildUserProfile(
      u.id,
      u.email ?? '',
      u.created_at,
      profile as RawProfile | null,
      u.user_metadata,
    );

    return { user, token: data.session.access_token };
  },

  demoLogin(role: UserRole): { user: UserProfile; token: string } {
    const roleNames: Record<UserRole, string> = {
      student: 'Олександр (Учень)',
      teacher: 'Марія Коваль (Вчитель)',
      admin: 'NovaFlow Admin',
    };

    const user: UserProfile = {
      id: `demo-${role}-${Date.now()}`,
      email: `${role}@novaflow.app`,
      name: roleNames[role],
      fullName: roleNames[role],
      role,
      lessonsLeft: role === 'student' ? 8 : 45,
      learningLanguage: 'Польська мова',
      dailyGoal: role === 'student' ? 20 : 50,
      streakDays: role === 'student' ? 7 : 42,
      createdAt: new Date().toISOString(),
    };

    return { user, token: `demo-token-${role}` };
  },
};
