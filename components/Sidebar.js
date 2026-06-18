'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons } from '@/data/lessons';
import { isLessonCompleted, isLessonLocked } from '@/lib/progress';
import { getStreakLabel } from '@/lib/streak';
import ThemeToggle from './ThemeToggle';
import XPTracker from './XPTracker';
import LessonSearch from './LessonSearch';

function LessonIcon({ completed, locked, active, index }) {
  if (completed) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400" aria-label="Completed">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (locked) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-muted" aria-label="Locked">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
        active ? 'bg-primary text-white shadow-glow' : 'bg-white/10 text-muted'
      }`}
      aria-hidden="true"
    >
      {index + 1}
    </span>
  );
}

export default function Sidebar({ progress, mobileOpen, onMobileClose, collapsed, onToggleCollapse }) {
  const pathname = usePathname();
  const completedLessons = progress?.completedLessons || [];
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onMobileClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, onMobileClose]);

  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;

    const focusable = drawerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trapFocus = (e) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => {
      document.removeEventListener('keydown', trapFocus);
      triggerRef.current?.focus();
    };
  }, [mobileOpen]);

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        {!collapsed ? (
          <Link href="/" className="text-lg font-bold gradient-text">
            OOP Mastery
          </Link>
        ) : (
          <Link href="/" className="text-lg font-bold gradient-text" aria-label="Home">
            O
          </Link>
        )}
        <div className="flex items-center gap-2">
          {mobileOpen && (
            <button
              type="button"
              onClick={onMobileClose}
              className="rounded-lg p-2 text-muted hover:bg-white/10 hover:text-foreground lg:hidden"
              aria-label="Close navigation menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <ThemeToggle />
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden rounded-lg p-2 text-muted hover:bg-white/10 hover:text-foreground lg:block"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'} />
              </svg>
            </button>
          )}
        </div>
      </div>

      {!collapsed && (
        <div className="border-b border-white/10 p-4">
          <XPTracker xp={progress?.xp || 0} streak={progress?.streak || 0} compact />
          <p className="mt-2 text-xs text-muted">{getStreakLabel(progress?.streak)}</p>
        </div>
      )}

      {!collapsed && (
        <LessonSearch progress={progress} onNavigate={onMobileClose} compact />
      )}

      <nav className="flex-1 overflow-y-auto p-3" aria-label="Course lessons">
        <ul className="space-y-1">
          {lessons.map((lesson, index) => {
            const completed = isLessonCompleted(lesson.id, completedLessons);
            const locked = isLessonLocked(lesson.id, completedLessons);
            const active = pathname === `/lessons/${lesson.id}`;
            const prevLesson = index > 0 ? lessons[index - 1] : null;

            return (
              <li key={lesson.id}>
                {locked ? (
                  <div
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-muted opacity-50"
                    aria-disabled="true"
                    title={`Complete the quiz in Lesson ${index} (${prevLesson?.title}) to unlock`}
                  >
                    <LessonIcon completed={false} locked index={index} active={false} />
                    {!collapsed && (
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-muted">Lesson {index + 1}</p>
                        <p className="truncate text-sm">{lesson.title}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={`/lessons/${lesson.id}`}
                    onClick={onMobileClose}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                      active
                        ? 'bg-primary/15 text-foreground shadow-glow'
                        : 'text-muted hover:bg-white/5 hover:text-foreground'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <LessonIcon completed={completed} locked={false} index={index} active={active} />
                    {!collapsed && (
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-muted">Lesson {index + 1}</p>
                        <p className="truncate text-sm font-medium">{lesson.title}</p>
                      </div>
                    )}
                    {active && !collapsed && (
                      <motion.div
                        layoutId="sidebar-glow"
                        className="h-2 w-2 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="space-y-2 border-t border-white/10 p-4">
          <Link href="/" className="btn-secondary block w-full text-center text-sm">
            Home
          </Link>
          <Link href="/dashboard" className="btn-secondary block w-full text-center text-sm">
            Dashboard
          </Link>
        </div>
      )}
    </>
  );

  return (
    <>
      <aside
        className={`hidden lg:flex lg:flex-col lg:border-r lg:border-white/10 lg:bg-surface/50 lg:backdrop-blur-xl ${
          collapsed ? 'lg:w-16' : 'lg:w-72'
        } transition-all duration-300`}
        aria-label="Course navigation"
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.aside
              ref={drawerRef}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-surface/95 backdrop-blur-xl lg:hidden"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              aria-label="Course navigation"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
