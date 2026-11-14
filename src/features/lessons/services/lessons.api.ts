import { supabase } from '@/shared/lib/supabase';

export interface Lesson {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  status: string | null;
  teacher_id: string | null;
}

export const lessonsApi = {
  async getStudentLessons(userId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select('id, title, start_time, end_time, status, teacher_id')
      .eq('student_id', userId)
      .order('start_time', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  },
};