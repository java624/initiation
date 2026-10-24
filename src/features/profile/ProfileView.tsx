import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Button, Card, Input, Text } from '@/shared/ui';
import { useProfileStore } from './useProfileStore';

export const ProfileView: React.FC = () => {
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

  return (
    <View style={styles.container}>
      {/* Блок профілю */}
      <Card style={styles.card}>
        <Text variant="title">👤 Профіль</Text>
        
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
            <Text variant="subtitle">{username}</Text>
            <Button title="Редагувати профіль" onPress={() => setIsEditing(true)} variant="secondary" />
          </View>
        )}
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
      </Card>
    </View>
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
  editContainer: {
    gap: 12,
    marginTop: 12,
  },
  infoContainer: {
    gap: 12,
    marginTop: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});