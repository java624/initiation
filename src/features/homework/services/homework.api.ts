import { supabase } from '@/shared/lib/supabase';

export interface Homework {
  id: number;
  title: string;
  description: string | null;
  deadline: string | null;
  status: string;
  attachment_url: string | null;
  student_response_url: string | null;
  teacher_comment: string | null;
  created_at: string;
}

export const homeworkApi = {
  async getStudentHomework(userId: string): Promise<Homework[]> {
    const { data, error } = await supabase
      .from('homeworks')
      .select(
        'id, title, description, deadline, status, attachment_url, student_response_url, teacher_comment, created_at',
      )
      .eq('student_id', userId)
      .order('deadline', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  },
};