import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles, useThemeController } from '@/theme';

const useStyles = makeStyles(({ colors, spacing, radius, typography, shadows }) => ({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.md,
  },
  badge: {
    backgroundColor: colors.accentSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    marginBottom: spacing.lg,
  },
  badgeText: {
    ...typography.small,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  statusGrid: {
    width: '100%',
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statusCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
  },
  statusLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xxs,
  },
  statusValue: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  themeButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    alignItems: 'center',
    width: '100%',
  },
  themeButtonText: {
    ...typography.bodyMedium,
    color: colors.textInverse,
  },
}));

export default function HomeScreen() {
  const styles = useStyles();
  const { mode, setMode, isDark } = useThemeController();

  const handleToggleTheme = () => {
    if (mode === 'system') {
      setMode(isDark ? 'light' : 'dark');
    } else if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('system');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>NovaFlow Foundation</Text>
          </View>

          <Text style={styles.title}>«Кроки»</Text>
          <Text style={styles.subtitle}>
            Платформа інтервального повторення та фокусованого навчання
          </Text>

          <View style={styles.statusGrid}>
            <View style={styles.statusCard}>
              <Text style={styles.statusLabel}>Режим теми</Text>
              <Text style={styles.statusValue}>{mode.toUpperCase()}</Text>
            </View>
            <View style={styles.statusCard}>
              <Text style={styles.statusLabel}>Вигляд</Text>
              <Text style={styles.statusValue}>{isDark ? 'Dark' : 'Light'}</Text>
            </View>
          </View>

          <Pressable style={styles.themeButton} onPress={handleToggleTheme}>
            <Text style={styles.themeButtonText}>Перемкнути тему</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
