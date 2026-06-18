import { awardQuizXp, finishLesson, markSlideViewedInState, awardXp } from '@/lib/progress';
import { checkNewAchievements, unlockAchievements } from '@/lib/achievements';

/**
 * Process quiz completion and return updated state without side effects.
 */
export function processQuizCompletion(prev, lessonId, correctCount) {
  let next = { ...prev };
  let totalXp = 0;
  let newAchievements = [];

  const quizResult = awardQuizXp(next, lessonId, correctCount);
  next = quizResult.state;
  totalXp += quizResult.xpAwarded;

  const lessonResult = finishLesson(next, lessonId);
  next = lessonResult.state;
  totalXp += lessonResult.lessonXp;

  const pending = checkNewAchievements(next);
  if (pending.length > 0) {
    const unlocked = unlockAchievements(
      next,
      pending.map((a) => a.id)
    );
    next = unlocked.state;
    totalXp += unlocked.bonusXp;
    newAchievements = unlocked.newAchievements;
  }

  return {
    state: {
      ...next,
      currentLessonId: lessonId,
      currentSlideIndex: 0,
    },
    totalXp,
    newAchievements,
  };
}

export function awardSlideXpIfNew(prev, lessonId, slideIndex) {
  if (!prev) return { state: prev, changed: false };

  const key = `${lessonId}:${slideIndex}`;
  if (prev.viewedSlides?.[key]) return { state: prev, changed: false };

  const { state, xpAwarded } = markSlideViewedInState(prev, lessonId, slideIndex);
  const withXp = xpAwarded > 0 ? awardXp(state, xpAwarded) : state;

  return {
    state: {
      ...withXp,
      currentLessonId: lessonId,
      currentSlideIndex: slideIndex,
    },
    changed: true,
  };
}
