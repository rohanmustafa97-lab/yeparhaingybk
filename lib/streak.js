function toDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(dateA, dateB) {
  const a = new Date(`${dateA}T00:00:00`);
  const b = new Date(`${dateB}T00:00:00`);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function applyStreakOnVisit(state) {
  const today = toDateKey();
  const lastVisit = state.lastVisitDate;

  if (!lastVisit) {
    return { ...state, streak: 1, lastVisitDate: today };
  }

  if (lastVisit === today) {
    return state;
  }

  const gap = daysBetween(lastVisit, today);
  if (gap === 1) {
    return {
      ...state,
      streak: (state.streak || 0) + 1,
      lastVisitDate: today,
    };
  }

  return { ...state, streak: 1, lastVisitDate: today };
}

export function getStreakLabel(streak) {
  if (!streak || streak <= 0) return 'Start your streak today';
  if (streak === 1) return '1 day streak';
  return `${streak} day streak`;
}
