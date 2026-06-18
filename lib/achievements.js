import { lessons } from '@/data/lessons';
import { XP_REWARDS } from '@/lib/progress';

export const ACHIEVEMENTS = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    check: (state) => (state.completedLessons?.length || 0) >= 1,
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Pass all lesson quizzes',
    icon: '🧠',
    check: (state) => (state.passedQuizzes?.length || 0) >= lessons.length,
  },
  {
    id: 'oop-explorer',
    title: 'OOP Explorer',
    description: 'Complete 5 or more lessons',
    icon: '🚀',
    check: (state) => (state.completedLessons?.length || 0) >= 5,
  },
  {
    id: 'course-graduate',
    title: 'Course Graduate',
    description: 'Complete the entire Python OOP course',
    icon: '🎓',
    check: (state) => (state.completedLessons?.length || 0) >= lessons.length,
  },
];

export function getAchievementById(id) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function checkNewAchievements(state) {
  const unlocked = state.achievements || [];
  const newlyUnlocked = [];

  ACHIEVEMENTS.forEach((achievement) => {
    if (!unlocked.includes(achievement.id) && achievement.check(state)) {
      newlyUnlocked.push(achievement);
    }
  });

  return newlyUnlocked;
}

export function unlockAchievements(state, achievementIds) {
  const current = state.achievements || [];
  const newIds = achievementIds.filter((id) => !current.includes(id));

  if (!newIds.length) return { state, bonusXp: 0, newAchievements: [] };

  const newAchievements = newIds.map((id) => getAchievementById(id)).filter(Boolean);

  return {
    state: {
      ...state,
      achievements: [...current, ...newIds],
      xp: (state.xp || 0) + newIds.length * XP_REWARDS.ACHIEVEMENT,
    },
    bonusXp: newIds.length * XP_REWARDS.ACHIEVEMENT,
    newAchievements,
  };
}

export function getAchievementProgress(state) {
  const unlocked = state.achievements || [];
  return ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: unlocked.includes(a.id),
  }));
}
