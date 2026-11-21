import { submitCardRating } from './studySession';
import type { StudyCard, StudySession } from '../types';
import { createInitialSm2State } from '../lib/sm2';
import { describe, it, expect } from 'vitest';

const testSession: StudySession = {
  id: 'test-session',
  currentIndex: 0,
  results: [],
  cards: [
    {
      id: 'card-1',
      question: 'Hello',
      answer: 'Привіт',
      sm2: createInitialSm2State(),
    },
    {
      id: 'card-2',
      question: 'Hello',
      answer: 'Привіт',
      sm2: createInitialSm2State(),
    },
  ],
  startedAt: new Date(),
  completedAt: null,
  isCompleted: false,
};

describe('submitCardRating', () => {
  it('додає оцінку та переходить до наступної картки...', () => {
    const result = submitCardRating(testSession, 'good');
    const oldSession = structuredClone(testSession);

    expect(result.results.length).toBe(1);
    expect(result.results[0].rating).toBe('good');
    expect(result.currentIndex).toBe(1);
    expect(testSession).toEqual(oldSession);
  });
  it('завершує сесію після оцінювання  останньої картки...', () => {
    const lastCardSession = { ...testSession, currentIndex: 1 };
    const result = submitCardRating(lastCardSession, 'good');

    expect(result.isCompleted).toBe(true);
    expect(result.currentIndex).toBe(0);
    expect(result.completedAt).toEqual(expect.any(Date));
  });
  it('Не повторюємо перевірку завершеній сесії...', () => {
    const completedSession = {
      ...testSession,
      isCompleted: true,
    };
    const result = submitCardRating(completedSession, 'good');
    expect(result).toEqual(completedSession);
  });
  it('повертає сесію, якщо картки за поточним індексом не існує...', () => {
    const invalidSession = { ...testSession, currentIndex: 2 };
    const result = submitCardRating(invalidSession, 'good');

    expect(result).toEqual(invalidSession);
    expect(result.currentIndex).toBe(2);
  });
  it('Перевіряємо чи оновлюється SM-2 стан картки...', () => {
    const result = submitCardRating(testSession, 'good');

    expect(result.cards[0].sm2.repetitions).toBe(1);
    expect(result.cards[0].sm2.intervalDays).toBe(1);
    expect(result.cards[0].sm2.easeFactor).toBe(2.5);
  });
  it('Перевірка, у випадку оцінки "again".', () => {
    const result = submitCardRating(testSession, 'again');

    expect(result.cards[0].sm2.repetitions).toBe(0);
    expect(result.cards[0].sm2.intervalDays).toBe(1);
    expect(result.cards[0].sm2.easeFactor).toBe(2.5);
  });
  it('Перевірка, у випадку оцінки "hard".', () => {
    const result = submitCardRating(testSession, 'hard');

    expect(result.cards[0].sm2.repetitions).toBe(1);
    expect(result.cards[0].sm2.intervalDays).toBe(1);
    expect(result.cards[0].sm2.easeFactor).toBe(2.4);
  });
  it('Перевірка, у випадку оцінки "easy".', () => {
    const result = submitCardRating(testSession, 'easy');

    expect(result.cards[0].sm2.repetitions).toBe(1);
    expect(result.cards[0].sm2.intervalDays).toBe(1);
    expect(result.cards[0].sm2.easeFactor).toBe(2.6);
  });
});
