export type Rating = 'again' | 'hard' | 'good' | 'easy';

export interface Sm2State {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
}

export interface Sm2Result extends Sm2State {
  dueAt: Date;
}