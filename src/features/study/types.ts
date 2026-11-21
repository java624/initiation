export type Rating = 'again' | 'hard' | 'good' | 'easy';

export interface Sm2State {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
}

export interface Sm2Result extends Sm2State {
  dueAt: Date;
}

export interface StudyCard {
  id: string;
  question: string;
  answer: string;
  sm2: Sm2Result;
}

export interface StudySession {
  id: string;
  currentIndex: number;
  results: CardResult[];
  cards: StudyCard[];
  startedAt: Date;
  completedAt: Date | null;
  isCompleted: boolean;
}

export interface CardResult {
  cardId: string;
  rating: Rating;
}

export interface StudySessionStats {
  again: number;
  hard: number;
  good: number;
  easy: number;
}
