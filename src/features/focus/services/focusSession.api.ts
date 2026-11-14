import { supabase } from '../../../shared/lib/supabase';

export async function saveFocusSession(durationMinutes: number, mode: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('focus_sessions').insert({
      user_id: user.id,
      duration_minutes: durationMinutes,
      mode: mode,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Помилка збереження сесії фокусу:', error.message);
    }
  } catch (err) {
    console.error('Непередбачена помилка:', err);
  }
}