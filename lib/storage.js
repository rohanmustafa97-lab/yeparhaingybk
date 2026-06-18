const STORAGE_KEY = 'oop-platform-progress';

const DEFAULT_STATE = {
  currentLessonId: 'intro-to-oop',
  currentSlideIndex: 0,
  quizAnswers: {},
  completedLessons: [],
  xp: 0,
  theme: 'dark',
  achievements: [],
  viewedSlides: {},
  passedQuizzes: [],
};

let debounceTimer = null;

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function getDefaultState() {
  return { ...DEFAULT_STATE, completedLessons: [], achievements: [], viewedSlides: {}, quizAnswers: {}, passedQuizzes: [] };
}

export function loadProgress() {
  if (!isBrowser()) return getDefaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    return { ...getDefaultState(), ...parsed };
  } catch {
    return getDefaultState();
  }
}

export function saveProgress(state) {
  if (!isBrowser()) return;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or unavailable
    }
  }, 100);
}

export function saveProgressImmediate(state) {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable
  }
}

export function updateProgress(updater) {
  const current = loadProgress();
  const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
  saveProgress(next);
  return next;
}

export function setTheme(theme) {
  if (isBrowser()) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  return updateProgress((state) => ({ ...state, theme }));
}

export function getTheme() {
  return loadProgress().theme || 'dark';
}

export function markSlideViewed(lessonId, slideIndex) {
  const key = `${lessonId}:${slideIndex}`;
  return updateProgress((state) => {
    if (state.viewedSlides[key]) return state;
    return {
      ...state,
      viewedSlides: { ...state.viewedSlides, [key]: true },
    };
  });
}

export function isSlideViewed(lessonId, slideIndex, state) {
  const key = `${lessonId}:${slideIndex}`;
  return Boolean(state?.viewedSlides?.[key]);
}

export function resetProgress() {
  if (isBrowser()) {
    localStorage.removeItem(STORAGE_KEY);
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  return getDefaultState();
}
