import { calculateNextReview } from '../lib/sm2';
import type { StudyCard, StudySession, Rating } from '../types';

export const createStudySession = (cards: StudyCard[]): StudySession => {
  return {
    id: crypto.randomUUID(),
    currentIndex: 0,
    results: [],
    cards,
    startedAt: new Date(),
    completedAt: null,
    isCompleted: false,
  };
};

export function submitCardRating(session: StudySession, rating: Rating): StudySession {
  const isComplete = session.isCompleted;
  if (isComplete) {
    return session;
  }
  const currentCard = session.cards[session.currentIndex];
  if (!currentCard) return session;
  const cardId = currentCard.id;

  const newResults = [...session.results, { cardId, rating }];

  const nextIndex = session.currentIndex + 1;

  const lastCard = nextIndex >= session.cards.length;

  const newSm2 = calculateNextReview(currentCard.sm2, rating);
  const updatedCard = {
    ...currentCard,
    sm2: newSm2,
  };

  const updatedCards = session.cards.map((card) =>
    card.id === updatedCard.id ? updatedCard : card,
  );

  return {
    ...session,
    cards: updatedCards,
    currentIndex: !lastCard ? nextIndex : 0,
    results: newResults,
    completedAt: lastCard ? new Date() : null,
    isCompleted: lastCard,
  };
}
