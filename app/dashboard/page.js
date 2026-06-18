'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import DashboardCards from '@/components/DashboardCards';
import CourseRoadmap from '@/components/CourseRoadmap';
import ThemeToggle from '@/components/ThemeToggle';
import { loadProgress, resetProgress } from '@/lib/storage';
import { getCurrentLesson } from '@/lib/progress';

export default function DashboardPage() {
  const [progress, setProgress] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const refreshProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    refreshProgress();
    const onFocus = () => refreshProgress();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refreshProgress]);

  const handleReset = () => {
    const reset = resetProgress();
    setProgress(reset);
    setShowResetConfirm(false);
  };

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center gradient-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" role="status" aria-label="Loading dashboard" />
      </div>
    );
  }

  const currentLesson = getCurrentLesson(progress.completedLessons);

  return (
    <div className="flex min-h-screen gradient-bg">
      <Sidebar
        progress={progress}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
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
              <nav className="mb-1 flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-foreground">Home</Link>
                <span aria-hidden="true">/</span>
                <span className="text-foreground">Dashboard</span>
              </nav>
              <h1 className="text-xl font-bold text-foreground lg:text-2xl">Dashboard</h1>
              <p className="text-sm text-muted">Track your OOP learning progress</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {currentLesson && (
              <Link
                href={`/lessons/${currentLesson.id}`}
                className="btn-primary hidden text-sm sm:inline-flex"
              >
                Resume Learning
              </Link>
            )}
            <Link href="/" className="hidden text-sm text-muted hover:text-foreground sm:block">
              Home
            </Link>
            <ThemeToggle className="lg:hidden" />
          </div>
        </header>

        <main id="main-content" className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentLesson && (
              <div className="mb-6 lg:hidden">
                <Link href={`/lessons/${currentLesson.id}`} className="btn-primary w-full text-center">
                  Resume: {currentLesson.title}
                </Link>
              </div>
            )}

            <DashboardCards progress={progress} />

            <div className="mt-8">
              <div className="glass-card p-6 md:p-8">
                <CourseRoadmap progress={progress} interactive />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              {!showResetConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="text-sm text-muted underline-offset-4 hover:text-red-400 hover:underline"
                >
                  Reset all progress
                </button>
              ) : (
                <div className="glass-card flex flex-col items-end gap-3 p-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-muted">This will erase all XP, lessons, and achievements.</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setShowResetConfirm(false)} className="btn-secondary text-sm">
                      Cancel
                    </button>
                    <button type="button" onClick={handleReset} className="rounded-xl bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/30">
                      Confirm Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
