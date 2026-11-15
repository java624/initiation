import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Input, Text } from '@/shared/ui';
import { useDictionaryStore } from './useDictionaryStore';

export const DictionaryView: React.FC = () => {
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
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="h2">📚 Словник NovaFlow</Text>

        <View style={styles.inputGroup}>
          <Input placeholder="Слово (напр. Focus)" value={word} onChangeText={setWord} />
          <Input placeholder="Переклад" value={translation} onChangeText={setTranslation} />
          <Button label="Додати слово" onPress={handleAdd} />
        </View>

        <View style={styles.list}>
          {words.map((item) => (
            <View key={item.id} style={styles.wordRow}>
              <View>
                <Text variant="subtitle">{item.word}</Text>
                <Text variant="caption">{item.translation}</Text>
              </View>
              <TouchableOpacity onPress={() => removeWord(item.id)}>
                <Text style={styles.deleteText}>❌</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    gap: 16,
  },
  inputGroup: {
    gap: 10,
  },
  list: {
    marginTop: 12,
    gap: 10,
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  deleteText: {
    fontSize: 16,
  },
});
