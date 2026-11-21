import React, { useState } from 'react';
import { Alert, Switch, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useAuth } from '@/features/auth';
import { Button, Card, Input, Screen, Text } from '@/shared/ui';
import { useThemeController } from '@/theme';

import { useStyles } from './ProfileView.styles';
import { useProfileStore } from './useProfileStore';

export const ProfileView: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { mode, setMode } = useThemeController();
  const { username, notificationsEnabled, dailyGoalMinutes, setUsername, toggleNotifications } =
    useProfileStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(username);

  const handleSave = () => {
    if (tempName.trim()) {
      setUsername(tempName);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(t('profileView.logoutTitle'), t('profileView.logoutMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('auth.logout'), style: 'destructive', onPress: () => void signOut() },
    ]);
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        {/* Блок профілю */}
        <Card style={styles.card}>
          <Text variant="h2">{t('profileView.title')}</Text>

          {/* Аватар та Email за ТЗ */}
          <View style={styles.userInfoRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{username.charAt(0).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.emailText}>{user?.email ?? ''}</Text>
            </View>
          </View>

          {isEditing ? (
            <View style={styles.editContainer}>
              <Input
                value={tempName}
                onChangeText={setTempName}
                placeholder={t('profileView.namePlaceholder')}
              />
              <Button label={t('profileView.save')} onPress={handleSave} />
            </View>
          ) : (
            <View style={styles.infoContainer}>
              <Text variant="subtitle">{t('profileView.usernameLabel', { name: username })}</Text>
              <Button
                label={t('profileView.editProfile')}
                onPress={() => setIsEditing(true)}
                variant="secondary"
              />
            </View>
          )}

          {/* Кнопка виходу за ТЗ */}
          <View style={styles.logoutWrapper}>
            <Button label={t('profileView.logout')} onPress={handleLogout} variant="secondary" />
          </View>
        </Card>

        {/* Блок налаштувань */}
        <Card style={styles.card}>
          <Text variant="h2">{t('profileView.settingsTitle')}</Text>

          <View style={styles.settingRow}>
            <Text>{t('profileView.notifications')}</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              accessibilityLabel={t('profileView.notifications')}
            />
          </View>

          <View style={styles.settingRow}>
            <Text>{t('profileView.dailyGoal', { minutes: dailyGoalMinutes })}</Text>
          </View>
          <View style={styles.settingBlock}>
            <Button
              label={t('profileView.openStats')}
              variant="secondary"
              onPress={() => router.push('/stats')}
            />
          </View>
          {/* Перемикання теми за ТЗ */}
          <View style={styles.settingBlock}>
            <Text style={styles.label}>{t('profileView.themeLabel')}</Text>
            <View style={styles.buttonRow}>
              <Button
                label={t('profileView.themeLight')}
                onPress={() => setMode('light')}
                variant={mode === 'light' ? 'primary' : 'secondary'}
              />
              <Button
                label={t('profileView.themeDark')}
                onPress={() => setMode('dark')}
                variant={mode === 'dark' ? 'primary' : 'secondary'}
              />
              <Button
                label={t('profileView.themeSystem')}
                onPress={() => setMode('system')}
                variant={mode === 'system' ? 'primary' : 'secondary'}
              />
            </View>
          </View>
        </Card>
      </View>
    </Screen>
  );
};
