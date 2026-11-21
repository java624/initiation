import React from 'react';
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
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { mode, setMode, isDark } = useThemeController();
  const { teacherData, adminData } = useDashboardData();

  const currentRole: UserRole = user?.role ?? 'student';

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
              label={isDark ? '☀️ Light' : '🌙 Dark'}
              onPress={handleToggleTheme}
            />
            <Button
              variant="ghost"
              size="sm"
              label={t('auth.logout')}
              onPress={handleSignOut}
            />
          </View>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.profileInfo}>
              <Text variant="h2">{user?.name || user?.email || 'Користувач'}</Text>
              <Text variant="caption" color="secondary">
                {user?.email} {user?.learningLanguage ? `• 🌍 ${user.learningLanguage}` : ''}
              </Text>
            </View>
            <View style={[styles.rolePill, rolePillStyles[currentRole]]}>
              <Text style={[styles.rolePillText, rolePillTextStyles[currentRole]]}>
                {roleLabels[currentRole]}
              </Text>
            </View>
          </View>
        </View>

        {/* 👨‍🏫 ROLE: TEACHER EXPERIENCE (Live data from DB) */}
        {currentRole === 'teacher' && (
          <>
            <View style={styles.grid}>
              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>📚</Text>
                <Text style={styles.statValue}>
                  {teacherData ? teacherData.myPacketsCount : 0}
                </Text>
                <Text style={styles.statLabel}>Створених колод</Text>
              </View>

              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>👥</Text>
                <Text style={styles.statValue}>
                  {teacherData ? teacherData.studentsCount : 0}
                </Text>
                <Text style={styles.statLabel}>Учнів на курсі</Text>
              </View>

              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>📝</Text>
                <Text style={styles.statValue}>
                  {teacherData ? teacherData.pendingHomeworksToCheck : 0}
                </Text>
                <Text style={styles.statLabel}>ДЗ на перевірку</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>🗓 Найближчі уроки з учнями</Text>
            {teacherData?.upcomingLessons && teacherData.upcomingLessons.length > 0 ? (
              teacherData.upcomingLessons.map((l) => (
                <View key={`lesson-${l.id}`} style={styles.actionCard}>
                  <View style={styles.actionCardRow}>
                    <View style={styles.actionCardInfo}>
                      <Text variant="h3">{l.title}</Text>
                      <Text variant="caption" color="secondary">
                        {new Date(l.start_time).toLocaleString('uk-UA', {
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
                  <Text variant="h3">Немає запланованих уроків</Text>
                  <Text variant="caption" color="secondary">
                    Усі уроки з бази даних відображатимуться тут
                  </Text>
                </View>
              </View>
            )}
          </>
        )}

        {/* ⚡ ROLE: ADMIN EXPERIENCE (Live data from DB) */}
        {currentRole === 'admin' && (
          <>
            <View style={styles.grid}>
              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>👥</Text>
                <Text style={styles.statValue}>
                  {adminData ? adminData.totalProfilesCount : 0}
                </Text>
                <Text style={styles.statLabel}>Користувачів</Text>
              </View>

              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>📦</Text>
                <Text style={styles.statValue}>
                  {adminData ? adminData.totalPacketsCount : 0}
                </Text>
                <Text style={styles.statLabel}>Всього колод</Text>
              </View>

              <View style={styles.statCard}>
                <Text variant="h1" style={styles.statIcon}>🎓</Text>
                <Text style={styles.statValue}>
                  {adminData ? adminData.totalLessonsCount : 0}
                </Text>
                <Text style={styles.statLabel}>Всього уроків</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Панель адміністратора NovaFlow</Text>
            <View style={styles.actionCard}>
              <View style={styles.actionCardRow}>
                <View style={styles.actionCardInfo}>
                  <Text variant="h3">Синхронізація з веб-платформою</Text>
                  <Text variant="caption" color="secondary">
                    Усі бази даних підключені та працюють у режимі реального часу
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