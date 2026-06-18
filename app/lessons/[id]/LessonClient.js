'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Sidebar from '@/components/Sidebar';
import SlideViewer from '@/components/SlideViewer';
import Quiz from '@/components/Quiz';
import AchievementModal from '@/components/AchievementModal';
import ThemeToggle from '@/components/ThemeToggle';
import { getLessonById, lessons, getLessonIndex } from '@/data/lessons';
import { loadProgress, saveProgressImmediate } from '@/lib/storage';
import { getNextLesson, isLessonLocked, isLessonCompleted } from '@/lib/progress';
import { awardSlideXpIfNew, processQuizCompletion } from '@/lib/lessonState';

export default function LessonClient() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Array.isArray(params.id) ? params.id[0] : params.id;
  const mainRef = useRef(null);

  const [progress, setProgress] = useState(null);
  const [phase, setPhase] = useState('slides');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [achievementQueue, setAchievementQueue] = useState([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [justCompleted, setJustCompleted] = useState(false);

  const lesson = getLessonById(lessonId);
  const activeAchievement = achievementQueue[0] || null;
  const isReview = progress ? isLessonCompleted(lessonId, progress.completedLessons) && !justCompleted : false;

  // Reset lesson state when navigating between lessons
  useEffect(() => {
    const stored = loadProgress();

    setProgress(stored);
    setPhase('slides');
    setXpEarned(0);
    setAchievementQueue([]);
    setJustCompleted(false);

    if (stored.currentLessonId === lessonId && typeof stored.currentSlideIndex === 'number') {
      setCurrentSlide(stored.currentSlideIndex);
    } else {
      setCurrentSlide(0);
    }
  }, [lessonId]);

  // Award XP when a slide is viewed for the first time
  useEffect(() => {
    if (!lesson || phase !== 'slides' || !progress) return;

    const { state, changed } = awardSlideXpIfNew(progress, lessonId, currentSlide);
    if (changed) {
      saveProgressImmediate(state);
      setProgress(state);
    }
  }, [lesson, lessonId, currentSlide, phase, progress]);

  // Scroll to top on slide or phase change
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide, phase, lessonId]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const persistProgress = useCallback(
    (next) => {
      const saved = {
        ...next,
        currentLessonId: lessonId,
        currentSlideIndex: next.currentSlideIndex ?? currentSlide,
      };
      saveProgressImmediate(saved);
      return saved;
    },
    [lessonId, currentSlide]
  );

  const handleNext = useCallback(() => {
    const nextSlide = currentSlide + 1;
    setCurrentSlide(nextSlide);
    setProgress((prev) => persistProgress({ ...prev, currentSlideIndex: nextSlide }));
  }, [currentSlide, persistProgress]);

  const handlePrevious = useCallback(() => {
    const prevSlide = currentSlide - 1;
    setCurrentSlide(prevSlide);
    setProgress((prev) => persistProgress({ ...prev, currentSlideIndex: prevSlide }));
  }, [currentSlide, persistProgress]);

  const handleStartQuiz = useCallback(() => {
    setPhase('quiz');
  }, []);

  const handleQuizComplete = useCallback(
    (correctCount) => {
      setProgress((prev) => {
        const { state, totalXp, newAchievements } = processQuizCompletion(prev, lessonId, correctCount);
        setXpEarned(totalXp);
        setJustCompleted(totalXp > 0);
        if (newAchievements.length > 0) {
          setTimeout(() => setAchievementQueue(newAchievements), 500);
        }
        saveProgressImmediate(state);
        return state;
      });

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#4f46e5', '#6366f1', '#8b5cf6'],
        });
      }

      setPhase('complete');
    },
    [lessonId]
  );

  const handleContinue = useCallback(() => {
    const nextLesson = getNextLesson(lessonId);
    if (nextLesson) {
      router.push(`/lessons/${nextLesson.id}`);
    } else {
      router.push('/dashboard');
    }
  }, [lessonId, router]);

  const closeAchievement = useCallback(() => {
    setAchievementQueue((queue) => queue.slice(1));
  }, []);

  if (!lesson || !lesson.slides?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gradient-bg p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-foreground">Lesson not found</h1>
        <p className="mb-6 text-muted">This lesson does not exist or has no content yet.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/lessons/intro-to-oop" className="btn-primary">Start Course</Link>
          <Link href="/dashboard" className="btn-secondary">Dashboard</Link>
          <Link href="/" className="btn-secondary">Go Home</Link>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center gradient-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" role="status" aria-label="Loading lesson" />
      </div>
    );
  }

  const lessonIndex = getLessonIndex(lessonId);
  const isLocked =
    isLessonLocked(lessonId, progress.completedLessons) &&
    !progress.completedLessons?.includes(lessonId);

  if (isLocked) {
    const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gradient-bg p-4 text-center">
        <div className="glass-card max-w-md p-8">
          <span className="mb-4 block text-4xl" aria-hidden="true">🔒</span>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Lesson Locked</h1>
          <p className="mb-6 text-muted">
            Complete &quot;{prevLesson?.title}&quot; first to unlock this lesson.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={prevLesson ? `/lessons/${prevLesson.id}` : '/lessons/intro-to-oop'} className="btn-primary">
              Go to Previous Lesson
            </Link>
            <Link href="/dashboard" className="btn-secondary">Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const isLastLesson = lessonIndex === lessons.length - 1;
  const wasReviewQuiz = isLessonCompleted(lessonId, progress.completedLessons) && xpEarned === 0 && !justCompleted;

  return (
    <div className="flex min-h-screen gradient-bg">
      <Sidebar
        progress={progress}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-muted hover:bg-white/10 hover:text-foreground lg:hidden"
              aria-label="Open navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <nav className="mb-1 flex flex-wrap items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-foreground">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
                <span aria-hidden="true">/</span>
                <span className="text-foreground">Lesson {lessonIndex + 1}</span>
              </nav>
              <p className="text-xs text-muted">Lesson {lessonIndex >= 0 ? lessonIndex + 1 : '?'} of {lessons.length}</p>
              <h1 className="text-lg font-bold text-foreground lg:text-xl">{lesson.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isReview && phase === 'slides' && (
              <span className="hidden rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 sm:inline">
                Review Mode
              </span>
            )}
            <ThemeToggle className="lg:hidden" />
          </div>
        </header>

        <main id="main-content" ref={mainRef} className="flex-1 overflow-y-auto p-4 lg:p-8">
          {phase === 'slides' && (
            <motion.div
              key="slides"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-4xl"
            >
              {isReview && (
                <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  You have completed this lesson. Review the slides or take the quiz again to practice.
                </div>
              )}
              <SlideViewer
                lesson={lesson}
                currentSlide={currentSlide}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onComplete={handleStartQuiz}
                isReview={isReview}
              />
            </motion.div>
          )}

          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-foreground">Lesson Quiz</h2>
                  <p className="text-muted">Answer all questions correctly to complete the lesson</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPhase('slides')}
                  className="btn-secondary text-sm"
                >
                  Back to Slides
                </button>
              </div>
              <Quiz
                key={`${lessonId}-quiz`}
                questions={lesson.questions || []}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg text-center"
            >
              <div className="glass-card p-8 md:p-12">
                <motion.span
                  className="mb-4 block text-6xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                >
                  🎉
                </motion.span>
                <h2 className="mb-2 text-3xl font-bold text-foreground">
                  {isLastLesson && justCompleted
                    ? 'Congratulations!'
                    : wasReviewQuiz
                    ? 'Quiz Complete!'
                    : 'Lesson Complete!'}
                </h2>
                <p className="mb-6 text-muted">
                  {isLastLesson && justCompleted
                    ? 'You completed the Python OOP Course. You are now an OOP master!'
                    : wasReviewQuiz
                    ? `Great practice on "${lesson.title}"!`
                    : `Great work completing "${lesson.title}"!`}
                </p>

                {xpEarned > 0 && (
                  <motion.div
                    className="mb-8 rounded-xl border border-primary/30 bg-primary/10 p-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <p className="text-sm text-muted">XP Earned</p>
                    <p className="text-3xl font-bold gradient-text">+{xpEarned} XP</p>
                  </motion.div>
                )}

                <div className="flex flex-col gap-3">
                  <motion.button
                    type="button"
                    onClick={handleContinue}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full"
                  >
                    {isLastLesson ? 'View Dashboard' : 'Continue to Next Lesson'}
                  </motion.button>
                  {!isLastLesson && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhase('slides');
                        setCurrentSlide(0);
                        setJustCompleted(false);
                      }}
                      className="btn-secondary w-full"
                    >
                      Review This Lesson
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      <AchievementModal achievement={activeAchievement} onClose={closeAchievement} />
    </div>
  );
}
