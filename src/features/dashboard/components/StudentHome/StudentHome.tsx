import React from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Flame,
  Globe,
  GraduationCap,
  LogOut,
  Moon,
  Sun,
  Timer,
} from 'lucide-react-native';
import { Button } from '@/shared/ui/Button';
import { Screen } from '@/shared/ui/Screen';
import { Text } from '@/shared/ui/Text';
import { useTheme, useThemeController } from '@/theme';
import { useAuth } from '@/features/auth';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useStyles } from './StudentHome.styles';

const WEBSITE_DASHBOARD_URL = 'https://novaflow-school.com/dashboard';

// Плавна поява блоків по черзі
const enter = (index: number) => FadeInDown.delay(index * 80).duration(450);

const getInitials = (name?: string, email?: string): string => {
  const source = (name ?? '').trim() || (email ?? '').trim();
  if (!source) return '?';
  const parts = source.split(/\s+/);
  const letters = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : source.slice(0, 2);
  return letters.toUpperCase();
};

const fmt = (value?: number): string => (value === undefined ? '–' : String(value));

interface StudentHomeProps {
  onSignOut?: () => void;
}

export const StudentHome = ({ onSignOut }: StudentHomeProps) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const { setMode, isDark } = useThemeController();
  const { studentData } = useDashboardData();

  const locale = i18n.language?.startsWith('en') ? 'en-GB' : 'uk-UA';

  const fullName = user?.name || user?.fullName || '';
  const firstName =
    user?.firstName || fullName.split(' ')[0] || user?.email?.split('@')[0] || '';

  // "english:English for Communication" -> "English for Communication"
  const rawCourse = user?.learningLanguage ?? '';
  const course = rawCourse.includes(':')
    ? rawCourse.split(':').slice(1).join(':').trim()
    : rawCourse;

  const nextLesson = studentData?.nextLesson ?? null;
  const wordsToReview = studentData?.wordsToReview;
  const balance = studentData?.lessonsBalance ?? user?.lessonsLeft;
  const homework = studentData?.pendingHomeworkCount;
  const packets = studentData?.assignedPackets ?? [];

  const getCountdown = (iso: string): string => {
    const diffMin = Math.floor((new Date(iso).getTime() - Date.now()) / 60000);
    if (diffMin <= 0) return t('student.lessonNow');
    if (diffMin < 60) return t('student.inMinutes', { minutes: diffMin });
    if (diffMin < 1440) {
      return t('student.inHours', {
        hours: Math.floor(diffMin / 60),
        minutes: diffMin % 60,
      });
    }
    return t('student.inDays', { days: Math.floor(diffMin / 1440) });
  };

  const handleOpenLesson = () => {
    Linking.openURL(WEBSITE_DASHBOARD_URL);
  };

  const handleToggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  const handleSignOut = async () => {
    await signOut();
    onSignOut?.();
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.accentSubtle, colors.background]}
          style={styles.glow}
          pointerEvents="none"
        />

        {/* Шапка: привітання + аватар */}
        <Animated.View entering={enter(0)} style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>{t('student.greeting', { name: firstName })}</Text>
            <Text style={styles.subtitle}>{t('student.subtitle')}</Text>
          </View>
          <View style={styles.avatar}>
            {user?.avatarUrl ? (
              <Image
                source={{ uri: user.avatarUrl }}
                style={styles.avatarImage}
                contentFit="cover"
              />
            ) : (
              <Text style={styles.avatarText}>{getInitials(fullName, user?.email)}</Text>
            )}
          </View>
        </Animated.View>

        {/* Чіпи: курс і серія днів */}
        {(course || (user?.streakDays ?? 0) > 0) && (
          <Animated.View entering={enter(1)} style={styles.chipsRow}>
            {course ? (
              <View style={styles.chip}>
                <Globe size={14} color={colors.accent} />
                <Text style={styles.chipText}>{course}</Text>
              </View>
            ) : null}
            {(user?.streakDays ?? 0) > 0 ? (
              <View style={styles.chip}>
                <Flame size={14} color={colors.warning} />
                <Text style={styles.chipText}>
                  {t('student.streak', { count: user?.streakDays })}
                </Text>
              </View>
            ) : null}
          </Animated.View>
        )}

        {/* Наступний урок */}
        {nextLesson ? (
          <Animated.View entering={enter(2)} style={styles.heroWrapper}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={styles.heroBadgeRow}>
                <Clock size={14} color={colors.onAccent} />
                <Text style={styles.heroBadgeText}>{t('student.nextLesson')}</Text>
              </View>
              <Text style={styles.heroTitle}>{nextLesson.title}</Text>
              <Text style={styles.heroMeta}>
                {new Date(nextLesson.start_time).toLocaleString(locale, {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <View style={styles.heroPill}>
                <View style={styles.heroPillBg} />
                <Text style={styles.heroPillText}>{getCountdown(nextLesson.start_time)}</Text>
              </View>
              <Pressable
                style={styles.heroButton}
                onPress={handleOpenLesson}
                accessibilityRole="button"
                accessibilityLabel={t('student.openLesson')}
              >
                <Text style={styles.heroButtonText}>{t('student.openLesson')}</Text>
                <ArrowRight size={18} color={colors.accent} />
              </Pressable>
            </LinearGradient>
          </Animated.View>
        ) : (
          <Animated.View entering={enter(2)} style={styles.emptyCard}>
            <View style={styles.iconCircle}>
              <Calendar size={22} color={colors.accent} />
            </View>
            <Text style={styles.emptyTitle}>{t('student.noLessonTitle')}</Text>
            <Text style={styles.emptyDesc}>{t('student.noLessonDesc')}</Text>
          </Animated.View>
        )}

        {/* Баланс уроків і активні ДЗ */}
        <Animated.View entering={enter(3)} style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.iconCircle}>
              <GraduationCap size={22} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>{fmt(balance)}</Text>
            <Text style={styles.statLabel}>{t('student.lessonsBalance')}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.iconCircle}>
              <FileText size={22} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>{fmt(homework)}</Text>
            <Text style={styles.statLabel}>{t('student.activeHomework')}</Text>
          </View>
        </Animated.View>

        {/* Слова на повторення */}
        <Animated.View entering={enter(4)} style={styles.wordsCard}>
          <View style={styles.wordsRow}>
            <Text style={styles.wordsCount}>{fmt(wordsToReview)}</Text>
            <View style={styles.wordsInfo}>
              <Text style={styles.wordsTitle}>{t('student.wordsTitle')}</Text>
              <Text style={styles.wordsDesc}>
                {wordsToReview === 0 ? t('student.wordsAllDone') : t('student.wordsDesc')}
              </Text>
            </View>
          </View>
          <Button
            variant="primary"
            size="md"
            label={t('student.review')}
            onPress={() => undefined}
          />
        </Animated.View>

        {/* Колоди слів */}
        <Animated.View entering={enter(5)}>
          <Text style={styles.sectionTitle}>{t('student.decksTitle')}</Text>
          {packets.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.packetsScroll}
              contentContainerStyle={styles.packetsContent}
            >
              {packets.map((pkt) => (
                <View key={`packet-${pkt.id}`} style={styles.packetCard}>
                  <View style={styles.iconCircle}>
                    <BookOpen size={22} color={colors.accent} />
                  </View>
                  <View>
                    <Text style={styles.packetTitle} numberOfLines={2}>
                      {pkt.title}
                    </Text>
                    <Text style={styles.packetMeta}>
                      {pkt.target_language || t('student.defaultLanguage')}
                      {pkt.level ? ` • ${t('student.level', { level: pkt.level })}` : ''}
                    </Text>
                  </View>
                  <Button
                    variant="primary"
                    size="md"
                    label={t('student.learnCards')}
                    onPress={() => undefined}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>{t('student.noDecksTitle')}</Text>
              <Text style={styles.emptyDesc}>{t('student.noDecksDesc')}</Text>
            </View>
          )}
        </Animated.View>

        {/* Pomodoro */}
        <Animated.View entering={enter(6)} style={styles.pomodoroCard}>
          <View style={styles.iconCircle}>
            <Timer size={22} color={colors.accent} />
          </View>
          <View style={styles.pomodoroInfo}>
            <Text style={styles.pomodoroTitle}>{t('student.pomodoroTitle')}</Text>
            <Text style={styles.pomodoroDesc}>{t('student.pomodoroDesc')}</Text>
          </View>
          <Button
            variant="secondary"
            size="sm"
            label={t('student.startTimer')}
            onPress={() => undefined}
          />
        </Animated.View>

        {/* Тимчасово: тема і вихід, доки немає вкладки "Профіль" */}
        <Animated.View entering={enter(7)} style={styles.footer}>
          <Pressable
            style={styles.footerButton}
            onPress={handleToggleTheme}
            accessibilityRole="button"
          >
            {isDark ? (
              <Sun size={18} color={colors.textSecondary} />
            ) : (
              <Moon size={18} color={colors.textSecondary} />
            )}
            <Text style={styles.footerText}>
              {isDark ? t('student.themeLight') : t('student.themeDark')}
            </Text>
          </Pressable>
          <Pressable
            style={styles.footerButton}
            onPress={handleSignOut}
            accessibilityRole="button"
          >
            <LogOut size={18} color={colors.textSecondary} />
            <Text style={styles.footerText}>{t('auth.logout')}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Screen>
  );
};