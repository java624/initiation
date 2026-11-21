import { DAY_MS, SM2 } from '../constants';
import { Sm2State } from '../types';
import { calculateNextReview, createInitialSm2State } from './sm2';

const NOW = new Date('2026-11-01T10:00:00.000Z');

describe('createInitialSm2State', () => {
  it('починає з нуля і коефіцієнта 2.5', () => {
    expect(createInitialSm2State()).toEqual({
      repetitions: 0,
      intervalDays: 0,
      easeFactor: SM2.INITIAL_EASE_FACTOR,
    });
  });
});

describe('calculateNextReview', () => {
  it('good: перше повторення дає інтервал 1 день', () => {
    const result = calculateNextReview(createInitialSm2State(), 'good', NOW);
    expect(result.repetitions).toBe(1);
    expect(result.intervalDays).toBe(1);
    expect(result.easeFactor).toBe(2.5);
    expect(result.dueAt.getTime()).toBe(NOW.getTime() + DAY_MS);
  });

  it('good: друге повторення дає інтервал 6 днів', () => {
    const state: Sm2State = { repetitions: 1, intervalDays: 1, easeFactor: 2.5 };
    const result = calculateNextReview(state, 'good', NOW);
    expect(result.repetitions).toBe(2);
    expect(result.intervalDays).toBe(6);
  });

  it('good: третє повторення множить інтервал на коефіцієнт', () => {
    const state: Sm2State = { repetitions: 2, intervalDays: 6, easeFactor: 2.5 };
    const result = calculateNextReview(state, 'good', NOW);
    expect(result.repetitions).toBe(3);
    expect(result.intervalDays).toBe(15);
  });

  it('easy: збільшує коефіцієнт легкості на 0.1', () => {
    const state: Sm2State = { repetitions: 2, intervalDays: 6, easeFactor: 2.5 };
    const result = calculateNextReview(state, 'easy', NOW);
    expect(result.easeFactor).toBe(2.6);
    expect(result.intervalDays).toBe(15);
  });

  it('hard: зменшує коефіцієнт легкості на 0.14 і залишається успіхом', () => {
    const state: Sm2State = { repetitions: 2, intervalDays: 6, easeFactor: 2.5 };
    const result = calculateNextReview(state, 'hard', NOW);
    expect(result.easeFactor).toBe(2.36);
    expect(result.repetitions).toBe(3);
  });

  it('again: скидає повторення, ставить інтервал 1 день, коефіцієнт не змінює', () => {
    const state: Sm2State = { repetitions: 5, intervalDays: 40, easeFactor: 2.2 };
    const result = calculateNextReview(state, 'again', NOW);
    expect(result.repetitions).toBe(0);
    expect(result.intervalDays).toBe(1);
    expect(result.easeFactor).toBe(2.2);
    expect(result.dueAt.getTime()).toBe(NOW.getTime() + DAY_MS);
  });

  it('коефіцієнт ніколи не опускається нижче 1.3', () => {
    const state: Sm2State = { repetitions: 3, intervalDays: 10, easeFactor: 1.3 };
    const result = calculateNextReview(state, 'hard', NOW);
    expect(result.easeFactor).toBe(SM2.MIN_EASE_FACTOR);
  });

  it('інтервал завжди щонайменше 1 день', () => {
    const state: Sm2State = { repetitions: 4, intervalDays: 1, easeFactor: 1.3 };
    const result = calculateNextReview(state, 'good', NOW);
    expect(result.intervalDays).toBeGreaterThanOrEqual(1);
  });

  it('не змінює вхідний стан', () => {
    const state: Sm2State = { repetitions: 2, intervalDays: 6, easeFactor: 2.5 };
    const snapshot = { ...state };
    calculateNextReview(state, 'good', NOW);
    expect(state).toEqual(snapshot);
  });
});