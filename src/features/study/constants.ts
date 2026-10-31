import { Rating } from './types';

export const DAY_MS = 86_400_000;

export const SM2 = {
  INITIAL_EASE_FACTOR: 2.5,
  MIN_EASE_FACTOR: 1.3,
  PASS_QUALITY: 3,
  MAX_QUALITY: 5,
  FIRST_INTERVAL_DAYS: 1,
  SECOND_INTERVAL_DAYS: 6,
  EF_BASE_DELTA: 0.1,
  EF_QUALITY_FACTOR: 0.08,
  EF_QUALITY_SQUARE: 0.02,
  EF_PRECISION: 100,
} as const;

// Оцінка користувача -> якість відповіді за шкалою SM-2 (0-5)
export const RATING_QUALITY: Record<Rating, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};