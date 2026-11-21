import { useProfileStore } from '@/features/profile';

// TODO: focusedMinutes считать из focus_sessions, когда таблица будет готова
const STUB_FOCUSED_MINUTES = 15;

export const useDailyGoal = () => {
  const goalMinutes = useProfileStore((state) => state.dailyGoalMinutes);

  return { focusedMinutes: STUB_FOCUSED_MINUTES, goalMinutes };
};
