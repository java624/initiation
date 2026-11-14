import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SectionList,
  SectionListRenderItem,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { CalendarDays } from 'lucide-react-native';
import { Screen } from '@/shared/ui/Screen';
import { Text } from '@/shared/ui/Text';
import { SegmentedControl } from '@/shared/ui/SegmentedControl';
import { useTheme } from '@/theme';
import { Lesson } from '../../services/lessons.api';
import { useLessons } from '../../hooks/useLessons';
import { useStyles } from './LessonsView.styles';

type Tab = 'upcoming' | 'past';

interface DaySection {
  key: string;
  label: string;
  dateText: string;
  data: Lesson[];
}

const DAY_MS = 86400000;

const startOfDay = (d: Date): number =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const capitalize = (s: string): string =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

const formatTime = (iso: string, locale: string): string =>
  new Date(iso).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

export const LessonsView = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { lessons, isLoading, isRefreshing, error, refresh } = useLessons();
  const [tab, setTab] = useState<Tab>('upcoming');

  const locale = i18n.language?.startsWith('en') ? 'en-GB' : 'uk-UA';

  const nowMs = Date.now();
  const upcoming = lessons.filter((l) => new Date(l.end_time).getTime() >= nowMs);
  const past = lessons.filter((l) => new Date(l.end_time).getTime() < nowMs).reverse();
  const visible = tab === 'upcoming' ? upcoming : past;
  const nextId = tab === 'upcoming' ? upcoming[0]?.id : undefined;

  const dayLabel = (d: Date): string => {
    const diff = Math.round((startOfDay(d) - startOfDay(new Date())) / DAY_MS);
    if (diff === 0) return t('lessons.today');
    if (diff === 1) return t('lessons.tomorrow');
    if (diff === -1) return t('lessons.yesterday');
    return capitalize(d.toLocaleDateString(locale, { weekday: 'long' }));
  };

  // Групуємо заняття по днях
  const sections: DaySection[] = [];
  visible.forEach((lesson) => {
    const d = new Date(lesson.start_time);
    const key = String(startOfDay(d));
    let section = sections[sections.length - 1];
    if (!section || section.key !== key) {
      section = {
        key,
        label: dayLabel(d),
        dateText: d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }),
        data: [],
      };
      sections.push(section);
    }
    section.data.push(lesson);
  });

  const tabOptions = [
    { value: 'upcoming' as Tab, label: t('lessons.upcoming') },
    { value: 'past' as Tab, label: t('lessons.past') },
  ];

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator color={colors.accent} size="large" />
        </View>
      </Screen>
    );
  }

  const renderItem: SectionListRenderItem<Lesson, DaySection> = ({ item, index }) => {
    const start = new Date(item.start_time).getTime();
    const end = new Date(item.end_time).getTime();
    const now = Date.now();
    const isLive = start <= now && now <= end;
    const isNext = item.id === nextId;
    const statusKey = (item.status ?? '').toLowerCase();
    const isCancelled = statusKey === 'cancelled' || statusKey === 'canceled';
    const isCompleted = statusKey === 'completed';
    const showStatus = statusKey !== '' && statusKey !== 'scheduled';
    const minutes = Math.round((end - start) / 60000);

    return (
      <Animated.View
        entering={FadeInDown.delay(Math.min(index, 6) * 60).duration(400)}
        style={[styles.card, isNext && styles.cardNext]}
      >
        <View style={styles.timeColumn}>
          <Text style={styles.timeStart}>{formatTime(item.start_time, locale)}</Text>
          <Text style={styles.timeEnd}>{formatTime(item.end_time, locale)}</Text>
        </View>
        <View style={[styles.bar, tab === 'past' && styles.barPast]} />
        <View style={styles.info}>
          <Text style={styles.lessonTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.metaRow}>
            {isLive ? (
              <View style={[styles.badge, styles.badgeSuccess]}>
                <Text style={[styles.badgeText, styles.badgeTextSuccess]}>
                  {t('lessons.live')}
                </Text>
              </View>
            ) : isNext ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{t('lessons.next')}</Text>
              </View>
            ) : null}
            {showStatus && (
              <View
                style={[
                  styles.badge,
                  isCancelled && styles.badgeDanger,
                  isCompleted && styles.badgeSuccess,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    isCancelled && styles.badgeTextDanger,
                    isCompleted && styles.badgeTextSuccess,
                  ]}
                >
                  {t(`lessons.status.${statusKey}`, { defaultValue: item.status ?? '' })}
                </Text>
              </View>
            )}
            <Text style={styles.meta}>{t('lessons.minutes', { count: minutes })}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const listHeader = (
    <View style={styles.header}>
      <Text style={styles.title}>{t('lessons.title')}</Text>
      <Text style={styles.subtitle}>{t('lessons.subtitle')}</Text>
      <View style={styles.segment}>
        <SegmentedControl options={tabOptions} value={tab} onChange={setTab} />
      </View>
    </View>
  );

  const listEmpty = error ? (
    <View style={styles.emptyCard}>
      <View style={styles.iconCircle}>
        <CalendarDays size={28} color={colors.danger} />
      </View>
      <Text style={styles.emptyTitle}>{t('lessons.errorTitle')}</Text>
      <Text style={styles.emptyDesc}>{error}</Text>
      <Pressable style={styles.retryButton} onPress={refresh} accessibilityRole="button">
        <Text style={styles.retryText}>{t('common.retry')}</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.emptyCard}>
      <View style={styles.iconCircle}>
        <CalendarDays size={28} color={colors.accent} />
      </View>
      <Text style={styles.emptyTitle}>
        {tab === 'upcoming' ? t('lessons.emptyUpcomingTitle') : t('lessons.emptyPastTitle')}
      </Text>
      <Text style={styles.emptyDesc}>
        {tab === 'upcoming' ? t('lessons.emptyUpcomingDesc') : t('lessons.emptyPastDesc')}
      </Text>
    </View>
  );

  return (
    <Screen>
      <LinearGradient
        colors={[colors.accentSubtle, colors.background]}
        style={styles.glow}
        pointerEvents="none"
      />
      <SectionList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        sections={sections}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>{section.label}</Text>
            <Text style={styles.sectionDate}>{section.dateText}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={listEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      />
    </Screen>
  );
};