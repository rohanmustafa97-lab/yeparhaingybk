'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { lessons } from '@/data/lessons';
import { isLessonCompleted, isLessonLocked } from '@/lib/progress';

export default function CourseRoadmap({ progress, compact = false, interactive = true }) {
  const completedLessons = progress?.completedLessons || [];
  const currentId = progress?.currentLessonId;

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      {!compact && (
        <h3 className="text-lg font-semibold text-foreground">Course Roadmap</h3>
      )}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-30" aria-hidden="true" />
        <ul className="space-y-3">
          {lessons.map((lesson, index) => {
            const completed = isLessonCompleted(lesson.id, completedLessons);
            const locked = isLessonLocked(lesson.id, completedLessons);
            const isCurrent = lesson.id === currentId && !completed;

            let statusColor = 'bg-white/10 border-white/20';
            let statusLabel = 'Not started';
            if (completed) {
              statusColor = 'bg-green-500/20 border-green-500/50';
              statusLabel = 'Completed';
            } else if (locked) {
              statusColor = 'bg-white/5 border-white/10';
              statusLabel = 'Locked';
            } else if (isCurrent) {
              statusColor = 'bg-primary/20 border-primary/50 shadow-glow';
              statusLabel = 'In progress';
            }

            const content = (
              <motion.div
                className={`relative flex items-center gap-4 rounded-xl border p-3 transition-all ${statusColor} ${
                  !locked && interactive ? 'hover:border-primary/50' : ''
                }`}
                whileHover={!locked && interactive ? { x: 4 } : {}}
              >
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                    completed
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : locked
                      ? 'border-white/10 bg-white/5 text-muted'
                      : isCurrent
                      ? 'border-primary bg-primary text-white'
                      : 'border-white/20 bg-white/10 text-muted'
                  }`}
                >
                  {completed ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : locked ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{lesson.title}</p>
                  {!compact && (
                    <p className="text-xs text-muted">
                      {statusLabel} · {lesson.duration}
                    </p>
                  )}
                </div>
              </motion.div>
            );

            return (
              <li key={lesson.id}>
                {locked || !interactive ? (
                  <div aria-label={`${lesson.title} - ${statusLabel}`}>{content}</div>
                ) : (
                  <Link href={`/lessons/${lesson.id}`} aria-label={`${lesson.title} - ${statusLabel}`}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
