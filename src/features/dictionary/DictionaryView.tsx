import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Button, Card, Input, Screen, Text } from '@/shared/ui';
import { useTheme } from '@/theme';

import { useStyles } from './DictionaryView.styles';
import { useDictionaryStore } from './useDictionaryStore';

const DELETE_ICON_SIZE = 20;

export const DictionaryView: React.FC = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { words, addWord, removeWord } = useDictionaryStore();
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

  const handleAdd = () => {
    if (word.trim() && translation.trim()) {
      addWord(word, translation);
      setWord('');
      setTranslation('');
    }
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text variant="h2">{t('dictionary.title')}</Text>

          <View style={styles.inputGroup}>
            <Input
              placeholder={t('dictionary.wordPlaceholder')}
              value={word}
              onChangeText={setWord}
            />
            <Input
              placeholder={t('dictionary.translationPlaceholder')}
              value={translation}
              onChangeText={setTranslation}
            />
            <Button label={t('dictionary.addWord')} onPress={handleAdd} />
          </View>

          <View style={styles.list}>
            {words.map((item) => (
              <View key={item.id} style={styles.wordRow}>
                <View>
                  <Text variant="subtitle">{item.word}</Text>
                  <Text variant="caption">{item.translation}</Text>
                </View>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => removeWord(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={t('dictionary.removeWord', { word: item.word })}
                >
                  <X size={DELETE_ICON_SIZE} color={colors.danger} />
                </Pressable>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </Screen>
  );
};
