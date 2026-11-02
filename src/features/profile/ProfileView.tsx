import React, { useState } from 'react';
import { View, StyleSheet, Switch, Alert } from 'react-native';
import { Button, Card, Input, Text, Screen } from '@/shared/ui';
import { useProfileStore } from './useProfileStore';

export const ProfileView: React.FC = () => {
  const {
    username,
    notificationsEnabled,
    dailyGoalMinutes,
    theme,
    setUsername,
    toggleNotifications,
    setTheme,
  } = useProfileStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(username);

  const handleSave = () => {
    if (tempName.trim()) {
      setUsername(tempName);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert('Вихід', 'Ви дійсно хочете вийти з акаунта?', [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Вийти', style: 'destructive', onPress: () => console.log('Logged out') },
    ]);
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        {/* Блок профілю */}
        <Card style={styles.card}>
          <Text variant="title">👤 Профіль</Text>

          {/* Аватар та Email за ТЗ */}
          <View style={styles.userInfoRow}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{username.charAt(0).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.emailText}>ivan.developer@novaflow.app</Text>
            </View>
          </View>

          {isEditing ? (
            <View style={styles.editContainer}>
              <Input
                value={tempName}
                onChangeText={setTempName}
                placeholder="Введіть ваше ім'я"
              />
              <Button title="Зберегти" onPress={handleSave} />
            </View>
          ) : (
            <View style={styles.infoContainer}>
              <Text variant="subtitle">Ім'я: {username}</Text>
              <Button
                title="Редагувати профіль"
                onPress={() => setIsEditing(true)}
                variant="secondary"
              />
            </View>
          )}

          {/* Кнопка виходу за ТЗ */}
          <View style={styles.logoutWrapper}>
            <Button title="Вийти з акаунта" onPress={handleLogout} variant="secondary" />
          </View>
        </Card>

        {/* Блок налаштувань */}
        <Card style={styles.card}>
          <Text variant="title">⚙️ Налаштування</Text>

          <View style={styles.settingRow}>
            <Text>Сповіщення</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>

          <View style={styles.settingRow}>
            <Text>Ціль на день: {dailyGoalMinutes} хв</Text>
          </View>

          {/* Перемикання теми за ТЗ */}
          <View style={styles.settingBlock}>
            <Text style={styles.label}>Тема оформлення:</Text>
            <View style={styles.buttonRow}>
              <Button
                title="Світла"
                onPress={() => setTheme?.('light')}
                variant={theme === 'light' ? 'primary' : 'secondary'}
              />
              <Button
                title="Темна"
                onPress={() => setTheme?.('dark')}
                variant={theme === 'dark' ? 'primary' : 'secondary'}
              />
              <Button
                title="Системна"
                onPress={() => setTheme?.('system')}
                variant={theme === 'system' ? 'primary' : 'secondary'}
              />
            </View>
          </View>
        </Card>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  card: {
    marginBottom: 8,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 14,
    opacity: 0.6,
  },
  editContainer: {
    gap: 12,
    marginTop: 12,
  },
  infoContainer: {
    gap: 12,
    marginTop: 12,
  },
  logoutWrapper: {
    marginTop: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  settingBlock: {
    marginTop: 16,
    gap: 8,
  },
  label: {
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
});