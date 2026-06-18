import { lessons, lessonContent, getLessonById } from '@/data/lessons';

export const XP_REWARDS = {
  SLIDE: 10,
  QUIZ_CORRECT: 25,
  LESSON_COMPLETE: 100,
  ACHIEVEMENT: 50,
};

export function calculateLevel(xp) {
  return Math.floor(xp / 200) + 1;
}

export function xpForNextLevel(xp) {
  const level = calculateLevel(xp);
  const currentLevelXp = (level - 1) * 200;
  const nextLevelXp = level * 200;
  return {
    current: xp - currentLevelXp,
    needed: nextLevelXp - currentLevelXp,
    level,
    progress: ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100,
  };
}

export function getCompletionPercentage(completedLessons) {
  if (!completedLessons?.length) return 0;
  return Math.round((completedLessons.length / lessons.length) * 100);
}

export function isLessonCompleted(lessonId, completedLessons) {
  return completedLessons?.includes(lessonId) ?? false;
}

export function isLessonLocked(lessonId, completedLessons) {
  const index = lessons.findIndex((l) => l.id === lessonId);
  if (index <= 0) return false;

  const previousLesson = lessons[index - 1];
  return !isLessonCompleted(previousLesson.id, completedLessons);
}

export function getCurrentLesson(completedLessons) {
  const firstIncomplete = lessons.find((l) => !completedLessons?.includes(l.id));
  return firstIncomplete || lessons[lessons.length - 1];
}

export function getLastCompletedLesson(completedLessons) {
  if (!completedLessons?.length) return null;
  const lastId = completedLessons[completedLessons.length - 1];
  return getLessonById(lastId);
}

export function getNextLesson(lessonId) {
  const index = lessons.findIndex((l) => l.id === lessonId);
  if (index === -1 || index >= lessons.length - 1) return null;
  return lessons[index + 1];
}

export function getLessonProgress(lessonId, state) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return 0;

  if (isLessonCompleted(lessonId, state.completedLessons)) return 100;

  const viewedCount = lesson.slides.filter((_, i) =>
    state.viewedSlides?.[`${lessonId}:${i}`]
  ).length;

  return Math.round((viewedCount / lesson.slides.length) * 100);
}

export function awardXp(state, amount) {
  return {
    ...state,
    xp: (state.xp || 0) + amount,
  };
}

export function completeLesson(state, lessonId) {
  if (state.completedLessons?.includes(lessonId)) return state;

  let next = {
    ...state,
    completedLessons: [...(state.completedLessons || []), lessonId],
  };

  next = awardXp(next, XP_REWARDS.LESSON_COMPLETE);
  return next;
}

export function markQuizPassed(state, lessonId) {
  if (state.passedQuizzes?.includes(lessonId)) return state;
  return {
    ...state,
    passedQuizzes: [...(state.passedQuizzes || []), lessonId],
  };
}

export function markSlideViewedInState(state, lessonId, slideIndex) {
  const key = `${lessonId}:${slideIndex}`;
  if (state?.viewedSlides?.[key]) {
    return { state, xpAwarded: 0 };
  }
  return {
    state: {
      ...state,
      viewedSlides: { ...(state.viewedSlides || {}), [key]: true },
    },
    xpAwarded: XP_REWARDS.SLIDE,
  };
}

export function awardQuizXp(state, lessonId, correctCount) {
  if (state.passedQuizzes?.includes(lessonId)) {
    return { state, xpAwarded: 0 };
  }
  const quizXp = correctCount * XP_REWARDS.QUIZ_CORRECT;
  return {
    state: awardXp(state, quizXp),
    xpAwarded: quizXp,
  };
}

export function finishLesson(state, lessonId) {
  const alreadyCompleted = state.completedLessons?.includes(lessonId);
  const alreadyPassedQuiz = state.passedQuizzes?.includes(lessonId);

  let next = state;
  let lessonXp = 0;

  if (!alreadyCompleted) {
    next = completeLesson(next, lessonId);
    lessonXp = XP_REWARDS.LESSON_COMPLETE;
  }

  if (!alreadyPassedQuiz) {
    next = markQuizPassed(next, lessonId);
  }

  return {
    state: next,
    lessonXp,
    isFirstCompletion: !alreadyCompleted,
  };
}

export function getTotalSlides() {
  return lessonContent.reduce((sum, l) => sum + (l.slides?.length || 0), 0);
}

export function getTotalQuizzes() {
  return lessonContent.reduce((sum, l) => sum + (l.questions?.length || 0), 0);
}

export function getRecentActivity(state) {
  const activities = [];

  (state.completedLessons || []).slice(-3).reverse().forEach((id) => {
    const lesson = getLessonById(id);
    if (lesson) {
      activities.push({
        type: 'completed',
        lessonId: id,
        title: lesson.title,
        xp: XP_REWARDS.LESSON_COMPLETE,
      });
    }
  });

  return activities;
}
