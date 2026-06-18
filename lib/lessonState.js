import { awardQuizXp, finishLesson, markSlideViewedInState, awardXp } from '@/lib/progress';
import { checkNewAchievements, unlockAchievements } from '@/lib/achievements';
import { getLessonById } from '@/data/lessons';

/**
 * Process quiz completion and return updated state without side effects.
 */
export function processQuizCompletion(prev, lessonId, correctCount) {
  const lesson = getLessonById(lessonId);
  const totalQuestions = lesson?.questions?.length || 0;

  if (totalQuestions > 0 && correctCount < totalQuestions) {
    return {
      state: prev,
      totalXp: 0,
      newAchievements: [],
      passed: false,
    };
  }

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

  const quizAnswers = { ...(next.quizAnswers || {}) };
  delete quizAnswers[lessonId];

  return {
    state: {
      ...next,
      quizAnswers,
      currentLessonId: lessonId,
      currentSlideIndex: 0,
    },
    totalXp,
    newAchievements,
    passed: true,
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
