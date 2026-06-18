'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from './CodeBlock';
import ProgressBar from './ProgressBar';

function isTableSeparator(row) {
  return /^[\s|:-]+$/.test(row.replace(/[^|:\-\s]/g, ''));
}

function formatContent(content) {
  const paragraphs = content.split('\n\n');
  return paragraphs.map((para, i) => {
    if (para.startsWith('|')) {
      const rows = para.split('\n').filter((r) => r.trim() && !isTableSeparator(r));
      return (
        <div key={i} className="my-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split('|').filter((c) => c.trim());
                const isHeader = ri === 0;
                return (
                  <tr key={ri} className={isHeader ? 'bg-white/5' : 'border-t border-white/5'}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-2 ${isHeader ? 'font-semibold text-foreground' : 'text-muted'}`}>
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (para.includes('\n- ') || para.startsWith('- ')) {
      const items = para.split('\n').filter((l) => l.startsWith('- '));
      return (
        <ul key={i} className="list-disc space-y-2 pl-5 text-muted">
          {items.map((item, ii) => (
            <li key={ii} dangerouslySetInnerHTML={{ __html: formatInline(item.slice(2)) }} />
          ))}
        </ul>
      );
    }

    if (/^\d+\.\s/.test(para)) {
      const items = para.split('\n').filter((l) => /^\d+\.\s/.test(l));
      return (
        <ol key={i} className="list-decimal space-y-2 pl-5 text-muted">
          {items.map((item, ii) => (
            <li key={ii} dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^\d+\.\s/, '')) }} />
          ))}
        </ol>
      );
    }

    return (
      <p key={i} className="text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(para) }} />
    );
  });
}

function formatInline(text) {
  let result = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
  result = result.replace(/`(.+?)`/g, '<code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-accent">$1</code>');
  result = result.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
  return result;
}

export default function SlideViewer({
  lesson,
  currentSlide,
  onNext,
  onPrevious,
  onComplete,
  isReview = false,
}) {
  const slide = lesson?.slides?.[currentSlide];
  const totalSlides = lesson?.slides?.length || 0;
  const progress = totalSlides > 0 ? Math.round(((currentSlide + 1) / totalSlides) * 100) : 0;
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && !isLast) onNext();
      if (e.key === 'ArrowLeft' && !isFirst) onPrevious();
    },
    [isFirst, isLast, onNext, onPrevious]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!slide) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted">Slide not found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-muted">
          <span>
            Slide {currentSlide + 1} of {totalSlides}
          </span>
          <span className="hidden truncate sm:inline">{lesson.title}</span>
        </div>
        <ProgressBar value={progress} showLabel={false} size="sm" label={`Slide progress for ${lesson.title}`} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${lesson.id}-${currentSlide}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <div className="glass-card p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">{slide.title}</h2>
            <div className="prose-lesson space-y-4">{formatContent(slide.content)}</div>
            {slide.code && <CodeBlock code={slide.code} />}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <motion.button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          whileHover={!isFirst ? { scale: 1.02 } : {}}
          whileTap={!isFirst ? { scale: 0.98 } : {}}
          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous slide"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </motion.button>

        {isLast ? (
          <motion.button
            type="button"
            onClick={onComplete}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
          >
            {isReview ? 'Review Quiz' : 'Start Quiz'}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
            aria-label="Next slide"
          >
            Next
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        )}
      </div>
    </div>
  );
}
