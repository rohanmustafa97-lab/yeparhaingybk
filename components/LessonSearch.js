'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { lessonContent } from '@/data/lessons';
import { isLessonLocked } from '@/lib/progress';

function matchesLesson(lesson, query) {
  const q = query.toLowerCase().trim();
  if (!q) return false;

  const haystack = [
    lesson.title,
    lesson.description,
    ...(lesson.objectives || []),
    ...(lesson.slides || []).map((s) => s.title),
    ...(lesson.slides || []).map((s) => s.content),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
}

export default function LessonSearch({ progress, onNavigate, compact = false }) {
  const [query, setQuery] = useState('');
  const completedLessons = progress?.completedLessons || [];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return lessonContent
      .filter((lesson) => matchesLesson(lesson, query))
      .slice(0, 8);
  }, [query]);

  return (
    <div className={compact ? 'px-3 pb-2' : 'mb-6'}>
      <label htmlFor="lesson-search" className="sr-only">
        Search lessons
      </label>
      <input
        id="lesson-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search topics (e.g. inheritance, @property)"
        className={`w-full rounded-xl border border-white/10 bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          compact ? '' : 'max-w-xl'
        }`}
        aria-autocomplete="list"
        aria-controls="lesson-search-results"
      />
      {results.length > 0 && (
        <ul
          id="lesson-search-results"
          className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-surface/95 p-2"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((lesson) => {
            const locked = isLessonLocked(lesson.id, completedLessons);
            return (
              <li key={lesson.id} role="option">
                {locked ? (
                  <div className="rounded-lg px-3 py-2 text-sm text-muted opacity-60" aria-disabled="true">
                    {lesson.title} (locked)
                  </div>
                ) : (
                  <Link
                    href={`/lessons/${lesson.id}`}
                    onClick={onNavigate}
                    className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
                  >
                    <span className="font-medium">{lesson.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted">{lesson.description}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {query.trim() && results.length === 0 && (
        <p className="mt-2 text-xs text-muted">No lessons match &quot;{query}&quot;</p>
      )}
    </div>
  );
}
