import { DAY_MS, RATING_QUALITY, SM2 } from '../constants';
import { Rating, Sm2Result, Sm2State } from '../types';

const roundEaseFactor = (value: number): number =>
  Math.round(value * SM2.EF_PRECISION) / SM2.EF_PRECISION;

export const createInitialSm2State = (): Sm2State => ({
  repetitions: 0,
  intervalDays: 0,
  easeFactor: SM2.INITIAL_EASE_FACTOR,
});

/**
 * Алгоритм SuperMemo-2.
 * Чиста функція: не змінює вхідний стан, повертає новий стан і дату наступного повторення.
 */
export const calculateNextReview = (
  state: Sm2State,
  rating: Rating,
  now: Date = new Date(),
): Sm2Result => {
  const quality = RATING_QUALITY[rating];
  let { repetitions, intervalDays, easeFactor } = state;

  if (quality < SM2.PASS_QUALITY) {
    // Не згадав: починаємо спочатку, коефіцієнт легкості не змінюється
    repetitions = 0;
    intervalDays = SM2.FIRST_INTERVAL_DAYS;
  } else {
    if (repetitions === 0) {
      intervalDays = SM2.FIRST_INTERVAL_DAYS;
    } else if (repetitions === 1) {
      intervalDays = SM2.SECOND_INTERVAL_DAYS;
    } else {
      intervalDays = Math.max(
        SM2.FIRST_INTERVAL_DAYS,
        Math.round(intervalDays * easeFactor),
      );
    }
    repetitions += 1;

    const gap = SM2.MAX_QUALITY - quality;
    const delta =
      SM2.EF_BASE_DELTA - gap * (SM2.EF_QUALITY_FACTOR + gap * SM2.EF_QUALITY_SQUARE);
    easeFactor = roundEaseFactor(Math.max(SM2.MIN_EASE_FACTOR, easeFactor + delta));
  }

  return {
    repetitions,
    intervalDays,
    easeFactor,
    dueAt: new Date(now.getTime() + intervalDays * DAY_MS),
  };
};