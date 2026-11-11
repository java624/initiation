import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { Screen } from '@/shared/ui/Screen';
import { Text } from '@/shared/ui/Text';
import { useThemeController } from '@/theme';
import { useAuth, UserRole } from '@/features/auth';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useStyles } from '../MainDashboard/MainDashboard.styles';
import { MainDashboardProps } from '../MainDashboard/MainDashboard.types';

export const StaffDashboard = ({ onSignOut }: MainDashboardProps) => {
  const styles = useStyles();

  const { t } = useTranslation('translation');
  const { t: tMain, i18n } = useTranslation('main');

  const { user, signOut } = useAuth();
  const { mode, setMode, isDark } = useThemeController();
  const { teacherData, adminData } = useDashboardData();

  const currentRole: UserRole = user?.role ?? 'student';

  const locale = i18n.language.startsWith('uk') ? 'uk-UA' : 'en-GB';

  const handleToggleTheme = () => {
    if (mode === 'system') {
      setMode(isDark ? 'light' : 'dark');
    } else if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('system');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onSignOut?.();
  };

  const roleLabels: Record<UserRole, string> = {
    student: t('roles.student'),
    teacher: t('roles.teacher'),
    admin: t('roles.admin'),
  };

  const rolePillStyles = {
    student: styles.rolePillStudent,
    teacher: styles.rolePillTeacher,
    admin: styles.rolePillAdmin,
  };

  const rolePillTextStyles = {
    student: styles.rolePillTextStudent,
    teacher: styles.rolePillTextTeacher,
    admin: styles.rolePillTextAdmin,
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        {/* Top App Header */}
        <View style={styles.header}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandText}>{t('common.appName')}</Text>
          </View>

          <View style={styles.headerActions}>
            <Button
              variant="ghost"
              size="sm"
              label={isDark ? tMain('staff.themeLight') : tMain('staff.themeDark')}
              onPress={handleToggleTheme}
            />

            <Button variant="ghost" size="sm" label={t('auth.logout')} onPress={handleSignOut} />
          </View>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.profileInfo}>
              <Text variant="h2">{user?.name || user?.email || tMain('staff.defaultUser')}</Text>

              <Text variant="caption" color="secondary">
                {user?.email}
                {user?.learningLanguage ? ` • 🌍 ${user.learningLanguage}` : ''}
              </Text>
            </View>

            <View style={[styles.rolePill, rolePillStyles[currentRole]]}>
              <Text style={[styles.rolePillText, rolePillTextStyles[currentRole]]}>
                {roleLabels[currentRole]}
              </Text>
            </View>
          </View>
        </View>

        {/* TEACHER EXPERIENCE */}
        {currentRole === 'teacher' && (
          <>
            <View style={styles.grid}>
              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>
                  📚
                </Text>

                <Text style={styles.statValue}>{teacherData ? teacherData.myPacketsCount : 0}</Text>

                <Text style={styles.statLabel}>{tMain('staff.teacher.createdDecks')}</Text>
              </View>

              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>
                  👥
                </Text>

                <Text style={styles.statValue}>{teacherData ? teacherData.studentsCount : 0}</Text>

                <Text style={styles.statLabel}>{tMain('staff.teacher.studentsCount')}</Text>
              </View>

              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>
                  📝
                </Text>

                <Text style={styles.statValue}>
                  {teacherData ? teacherData.pendingHomeworksToCheck : 0}
                </Text>

                <Text style={styles.statLabel}>{tMain('staff.teacher.homeworksToCheck')}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>🗓 {tMain('staff.teacher.upcomingLessons')}</Text>

            {teacherData?.upcomingLessons && teacherData.upcomingLessons.length > 0 ? (
              teacherData.upcomingLessons.map((l) => (
                <View key={`lesson-${l.id}`} style={styles.actionCard}>
                  <View style={styles.actionCardRow}>
                    <View style={styles.actionCardInfo}>
                      <Text variant="h3">{l.title}</Text>

                      <Text variant="caption" color="secondary">
                        {new Date(l.start_time).toLocaleString(locale, {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.actionCard}>
                <View style={styles.actionCardInfo}>
                  <Text variant="h3">{tMain('staff.teacher.noLessons')}</Text>

                  <Text variant="caption" color="secondary">
                    {tMain('staff.teacher.lessonsDescription')}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}

        {/* ADMIN EXPERIENCE */}
        {currentRole === 'admin' && (
          <>
            <View style={styles.grid}>
              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>
                  👥
                </Text>

                <Text style={styles.statValue}>{adminData ? adminData.totalProfilesCount : 0}</Text>

                <Text style={styles.statLabel}>{tMain('staff.admin.usersCount')}</Text>
              </View>

              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>
                  📦
                </Text>

                <Text style={styles.statValue}>{adminData ? adminData.totalPacketsCount : 0}</Text>

                <Text style={styles.statLabel}>{tMain('staff.admin.totalDecks')}</Text>
              </View>

              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>
                  🎓
                </Text>

                <Text style={styles.statValue}>{adminData ? adminData.totalLessonsCount : 0}</Text>

                <Text style={styles.statLabel}>{tMain('staff.admin.totalLessons')}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>{tMain('staff.admin.dashboardTitle')}</Text>

            <View style={styles.actionCard}>
              <View style={styles.actionCardRow}>
                <View style={styles.actionCardInfo}>
                  <Text variant="h3">{tMain('staff.admin.syncTitle')}</Text>

                  <Text variant="caption" color="secondary">
                    {tMain('staff.admin.syncDescription')}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </Screen>
  );
};
