import { create } from 'zustand';

export interface WordItem {
  id: string;
  word: string;
  translation: string;
}

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordResult {
  word: string;
  phonetic?: string;
  meanings: Meaning[];
}

interface DictionaryState {
  words: WordItem[];
  addWord: (word: string, translation: string) => void;
  removeWord: (id: string) => void;
  searchQuery: string;
  apiData: WordResult | null;
  loading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
  lookupWord: () => Promise<void>;
}

export const useDictionaryStore = create<DictionaryState>((set, get) => ({
  words: [
    { id: '1', word: 'Focus', translation: 'Фокус / Концентрация' },
    { id: '2', word: 'Flow', translation: 'Поток' },
  ],
  addWord: (word, translation) =>
    set((state) => ({
      words: [
        ...state.words,
        { id: Date.now().toString(), word, translation },
      ],
    })),
  removeWord: (id) =>
    set((state) => ({
      words: state.words.filter((w) => w.id !== id),
    })),
  searchQuery: '',
  apiData: null,
  loading: false,
  error: null,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  lookupWord: async () => {
    const { searchQuery } = get();
    if (!searchQuery.trim()) return;

    set({ loading: true, error: null, apiData: null });
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          searchQuery.trim().toLowerCase()
        )}`
      );

      if (!response.ok) {
        throw new Error('Слово не знайдено в англійському словнику');
      }

      const result = await response.json();
      set({ apiData: result[0], loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Сталася помилка при пошуку', loading: false });
    }
  },
}));