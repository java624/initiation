// TODO: goalMinutes брать из useProfileStore (dailyGoalMinutes),
// focusedMinutes считать из focus_sessions, когда таблица будет готова
const STUB_FOCUSED_MINUTES = 15;
const STUB_GOAL_MINUTES = 60;

export const useDailyGoal = () => ({
  focusedMinutes: STUB_FOCUSED_MINUTES,
  goalMinutes: STUB_GOAL_MINUTES,
});
