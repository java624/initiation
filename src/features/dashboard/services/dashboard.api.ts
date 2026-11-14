import { supabase } from '@/shared/lib/supabase';

export interface DashboardPacket {
  id: number;
  title: string;
  target_language?: string;
  level?: string;
  due_date?: string;
}

export interface DashboardLesson {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  status?: string;
}

export interface DashboardHomework {
  id: number;
  title: string;
  deadline?: string;
  status: string;
}

export interface StudentDashboardData {
  wordsToReview: number;
  assignedPackets: DashboardPacket[];
  nextLesson: DashboardLesson | null;
  pendingHomeworkCount: number;
  lessonsBalance: number;
}

export interface TeacherDashboardData {
  myPacketsCount: number;
  upcomingLessons: DashboardLesson[];
  studentsCount: number;
  pendingHomeworksToCheck: number;
}

export interface AdminDashboardData {
  totalProfilesCount: number;
  totalPacketsCount: number;
  totalLessonsCount: number;
}

export const dashboardApi = {
  async getStudentData(userId: string): Promise<StudentDashboardData> {
    try {
      const nowIso = new Date().toISOString();

      // 1. Слова, які вже пора повторити (не вивчені до кінця, дата повторення настала)
      const { count: wordsCount } = await supabase
        .from('student_word_progress')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', userId)
        .neq('status', 'mastered')
        .or(`next_review_date.is.null,next_review_date.lte.${nowIso}`);

      // 2. Призначені колоди слів (packet_assignments -> word_packets)
      const { data: assignments } = await supabase
        .from('packet_assignments')
        .select('packet_id, due_date, word_packets(id, title, target_language, level)')
        .eq('student_id', userId)
        .limit(5);

      const assignedPackets: DashboardPacket[] = [];
      if (assignments && assignments.length > 0) {
        for (const item of assignments) {
          const wp = item.word_packets as unknown as {
            id: number;
            title: string;
            target_language?: string;
            level?: string;
          } | null;
          if (wp) {
            assignedPackets.push({
              id: wp.id,
              title: wp.title,
              target_language: wp.target_language,
              level: wp.level,
              due_date: item.due_date,
            });
          }
        }
      }

      // Якщо колод ще не призначено, спробуємо взяти перші публічні з word_packets
      if (assignedPackets.length === 0) {
        const { data: publicPackets } = await supabase
          .from('word_packets')
          .select('id, title, target_language, level')
          .limit(3);

        if (publicPackets) {
          publicPackets.forEach((p) => {
            assignedPackets.push({
              id: p.id,
              title: p.title,
              target_language: p.target_language,
              level: p.level,
            });
          });
        }
      }

      // 3. Найближчий урок (без скасованих)
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, title, start_time, end_time, status')
        .eq('student_id', userId)
        .neq('status', 'cancelled')
        .gte('end_time', nowIso)
        .order('start_time', { ascending: true })
        .limit(1);

      const nextLesson = lessons && lessons.length > 0 ? lessons[0] : null;

      // 4. Активні домашні завдання (ще не виконані учнем)
      const { count: hwCount } = await supabase
        .from('homeworks')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', userId)
        .eq('status', 'pending');

      // 5. Баланс уроків
      const { data: profile } = await supabase
        .from('profiles')
        .select('lessons_left, lessons_balance')
        .eq('id', userId)
        .maybeSingle();

      const balance = profile?.lessons_left ?? profile?.lessons_balance ?? 0;

      return {
        wordsToReview: wordsCount ?? 0,
        assignedPackets,
        nextLesson,
        pendingHomeworkCount: hwCount ?? 0,
        lessonsBalance: balance,
      };
    } catch {
      return {
        wordsToReview: 0,
        assignedPackets: [],
        nextLesson: null,
        pendingHomeworkCount: 0,
        lessonsBalance: 0,
      };
    }
  },

  async getTeacherData(userId: string): Promise<TeacherDashboardData> {
    try {
      // 1. Створені колоди
      const { count: packetsCount } = await supabase
        .from('word_packets')
        .select('*', { count: 'exact', head: true })
        .eq('teacher_id', userId);

      // 2. Найближчі уроки вчителя (майбутні, без скасованих)
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, title, start_time, end_time, status')
        .eq('teacher_id', userId)
        .neq('status', 'cancelled')
        .gte('end_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(5);

      // 3. Кількість учнів
      const { data: assignments } = await supabase
        .from('packet_assignments')
        .select('student_id');

      const uniqueStudents = new Set(assignments?.map((a) => a.student_id));

      // 4. Домашки на перевірку (учень виконав, вчитель ще не перевірив)
      const { count: hwCount } = await supabase
        .from('homeworks')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      return {
        myPacketsCount: packetsCount ?? 0,
        upcomingLessons: lessons ?? [],
        studentsCount: uniqueStudents.size,
        pendingHomeworksToCheck: hwCount ?? 0,
      };
    } catch {
      return {
        myPacketsCount: 0,
        upcomingLessons: [],
        studentsCount: 0,
        pendingHomeworksToCheck: 0,
      };
    }
  },

  async getAdminData(): Promise<AdminDashboardData> {
    try {
      const { count: profilesCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: packetsCount } = await supabase
        .from('word_packets')
        .select('*', { count: 'exact', head: true });

      const { count: lessonsCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true });

      return {
        totalProfilesCount: profilesCount ?? 0,
        totalPacketsCount: packetsCount ?? 0,
        totalLessonsCount: lessonsCount ?? 0,
      };
    } catch {
      return {
        totalProfilesCount: 0,
        totalPacketsCount: 0,
        totalLessonsCount: 0,
      };
    }
  },
};