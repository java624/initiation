import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles } from '@/theme/makeStyles';
import { ScreenProps } from './Screen.types';

const useStyles = makeStyles(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
}));

export const Screen = ({
  scrollable = false,
  scrollViewProps,
  keyboardAware = true,
  style,
  children,
  ...rest
}: ScreenProps) => {
  const styles = useStyles();

  const inner = scrollable ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );

  const wrapped = keyboardAware ? (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {inner}
    </KeyboardAvoidingView>
  ) : inner;

  return <SafeAreaView style={styles.safe}>{wrapped}</SafeAreaView>;
};
