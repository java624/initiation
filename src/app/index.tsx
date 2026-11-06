import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusTimer from '@/features/focus/FocusTimer';
import { ProfileView } from '@/features/profile/ProfileView';
import { DictionaryView } from '@/features/dictionary/DictionaryView';
import { StatsView } from '@/features/stats/StatsView';


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StatsView />
        <FocusTimer />
        <DictionaryView />
        <ProfileView />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
});