import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  ListRenderItem,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, LinearTransition } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  ExternalLink,
  MessageSquare,
} from 'lucide-react-native';
import { Screen } from '@/shared/ui/Screen';
import { Text } from '@/shared/ui/Text';
import { SegmentedControl } from '@/shared/ui/SegmentedControl';
import { useTheme } from '@/theme';
import { Homework } from '../../services/homework.api';
import { useHomework } from '../../hooks/useHomework';
import { useStyles } from './HomeworkView.styles';

const WEBSITE_URL = 'https://novaflow-school.com/dashboard';
const DAY_MS = 86400000;

type Tab = 'active' | 'history';

const startOfDay = (d: Date): number =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const openUrl = (url: string) => {
  Haptics.selectionAsync().catch(() => undefined);
  Linking.openURL(url).catch(() => undefined);
};

export const HomeworkView = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { homeworks, isLoading, isRefreshing, error, refresh } = useHomework();
  const [tab, setTab] = useState<Tab>('active');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const locale = i18n.language?.startsWith('en') ? 'en-GB' : 'uk-UA';

  const active = homeworks.filter((h) => h.status === 'pending');
  const history = homeworks.filter((h) => h.status !== 'pending').reverse();
  const visible = tab === 'active' ? active : history;

  const tabOptions = [
    { value: 'active' as Tab, label: `${t('homework.active')} · ${active.length}` },
    { value: 'history' as Tab, label: `${t('homework.history')} · ${history.length}` },
  ];

  const getDeadline = (item: Homework): { text: string; overdue: boolean } => {
    if (!item.deadline) {
      return { text: t('homework.noDeadline'), overdue: false };
    }
    const d = new Date(item.deadline);
    const dateText = d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
    if (item.status !== 'pending') {
      return { text: dateText, overdue: false };
    }
    const overdue = d.getTime() < Date.now();
    const diff = Math.round((startOfDay(d) - startOfDay(new Date())) / DAY_MS);
    let label: string;
    if (diff < 0) label = t('homework.overdueDays', { count: -diff });
    else if (diff === 0) label = t('homework.dueToday');
    else if (diff === 1) label = t('homework.dueTomorrow');
    else label = t('homework.dueIn', { count: diff });
    return { text: `${label} · ${dateText}`, overdue };
  };

  const toggle = (id: number) => {
    Haptics.selectionAsync().catch(() => undefined);
    setExpandedId((current) => (current === id ? null : id));
  };

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator color={colors.accent} size="large" />
        </View>
      </Screen>
    );
  }

  const renderItem: ListRenderItem<Homework> = ({ item, index }) => {
    const isOpen = expandedId === item.id;
    const deadline = getDeadline(item);
    const isPending = item.status === 'pending';
    const isReviewed = item.status === 'reviewed';

    let badgeLabel = t('homework.statusPending');
    if (isReviewed) badgeLabel = t('homework.statusReviewed');
    else if (item.status === 'completed') badgeLabel = t('homework.statusCompleted');
    else if (deadline.overdue) badgeLabel = t('homework.statusOverdue');

    const badgeDanger = isPending && deadline.overdue;

    return (
      <Animated.View
        entering={FadeInDown.delay(Math.min(index, 6) * 60).duration(400)}
        layout={LinearTransition.duration(250)}
        style={[styles.card, badgeDanger && styles.cardOverdue]}
      >
        <Pressable
          style={styles.cardHeader}
          onPress={() => toggle(item.id)}
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen }}
        >
          <View style={styles.cardMain}>
            <View style={styles.badgeRow}>
              <View
                style={[
                  styles.badge,
                  isReviewed && styles.badgeSuccess,
                  badgeDanger && styles.badgeDanger,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    isReviewed && styles.badgeTextSuccess,
                    badgeDanger && styles.badgeTextDanger,
                  ]}
                >
                  {badgeLabel}
                </Text>
              </View>
            </View>
            <Text style={styles.cardTitle} numberOfLines={isOpen ? undefined : 2}>
              {item.title}
            </Text>
            <View style={styles.deadlineRow}>
              <Clock size={14} color={badgeDanger ? colors.danger : colors.textTertiary} />
              <Text style={[styles.deadlineText, badgeDanger && styles.deadlineOverdue]}>
                {deadline.text}
              </Text>
            </View>
          </View>
          {isOpen ? (
            <ChevronUp size={20} color={colors.textTertiary} />
          ) : (
            <ChevronDown size={20} color={colors.textTertiary} />
          )}
        </Pressable>

        {isOpen && (
          <Animated.View entering={FadeIn.duration(250)} style={styles.details}>
            {item.description ? (
              <Text style={styles.description}>{item.description}</Text>
            ) : null}

            {item.teacher_comment ? (
              <View style={styles.commentBox}>
                <View style={styles.commentHeader}>
                  <MessageSquare size={14} color={colors.accent} />
                  <Text style={styles.commentLabel}>{t('homework.teacherComment')}</Text>
                </View>
                <Text style={styles.commentText}>{item.teacher_comment}</Text>
              </View>
            ) : null}

            <View style={styles.actions}>
              {item.attachment_url ? (
                <Pressable
                  style={styles.actionOutline}
                  onPress={() => openUrl(item.attachment_url as string)}
                  accessibilityRole="button"
                >
                  <ExternalLink size={16} color={colors.accent} />
                  <Text style={styles.actionOutlineText}>{t('homework.openTask')}</Text>
                </Pressable>
              ) : null}
              {item.student_response_url ? (
                <Pressable
                  style={styles.actionOutline}
                  onPress={() => openUrl(item.student_response_url as string)}
                  accessibilityRole="button"
                >
                  <ExternalLink size={16} color={colors.accent} />
                  <Text style={styles.actionOutlineText}>{t('homework.openResponse')}</Text>
                </Pressable>
              ) : null}
              {isPending ? (
                <Pressable
                  style={styles.actionPrimary}
                  onPress={() => openUrl(WEBSITE_URL)}
                  accessibilityRole="button"
                >
                  <Text style={styles.actionPrimaryText}>{t('homework.submitOnWebsite')}</Text>
                </Pressable>
              ) : null}
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const listHeader = (
    <View style={styles.header}>
      <Text style={styles.title}>{t('homework.title')}</Text>
      <Text style={styles.subtitle}>{t('homework.subtitle')}</Text>
      <View style={styles.segment}>
        <SegmentedControl options={tabOptions} value={tab} onChange={setTab} />
      </View>
    </View>
  );

  const listEmpty = error ? (
    <View style={styles.emptyCard}>
      <View style={styles.iconCircle}>
        <ClipboardList size={28} color={colors.danger} />
      </View>
      <Text style={styles.emptyTitle}>{t('homework.errorTitle')}</Text>
      <Text style={styles.emptyDesc}>{error}</Text>
      <Pressable style={styles.retryButton} onPress={refresh} accessibilityRole="button">
        <Text style={styles.retryText}>{t('common.retry')}</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.emptyCard}>
      <View style={styles.iconCircle}>
        <ClipboardList size={28} color={colors.accent} />
      </View>
      <Text style={styles.emptyTitle}>
        {tab === 'active' ? t('homework.emptyActiveTitle') : t('homework.emptyHistoryTitle')}
      </Text>
      <Text style={styles.emptyDesc}>
        {tab === 'active' ? t('homework.emptyActiveDesc') : t('homework.emptyHistoryDesc')}
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
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={visible}
        extraData={expandedId}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
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