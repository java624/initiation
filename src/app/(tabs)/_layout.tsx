import { useAuth } from '@/features/auth';
import { useTheme } from '@/theme';
import { makeStyles } from '@/theme/makeStyles';
import { fontFamilies } from '@/theme/tokens/typography';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import { BookOpen, CalendarDays, ClipboardList, Home, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function TabsLayout() {
  const styles = useStyles();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { user } = useAuth();

  const isStudent = (user?.role ?? 'student') === 'student';
  const studentOnly = isStudent ? undefined : null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
      screenListeners={{
        tabPress: () => {
          Haptics.selectionAsync().catch(() => undefined);
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: t('tabs.lessons'),
          href: studentOnly,
          tabBarIcon: ({ color, size }) => <CalendarDays size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          title: t('tabs.vocabulary'),
          href: studentOnly,
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="homework"
        options={{
          title: t('tabs.homework'),
          href: studentOnly,
          tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const useStyles = makeStyles(({ colors, spacing, radius, typography }) => ({
  tabBar: {
    paddingTop: spacing.xs,
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 12,
  },
  tabLabel: {
    ...typography.small,
    fontFamily: fontFamilies.semibold,
  },
}));