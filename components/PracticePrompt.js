'use client';

import { useState, useId } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const CodeBlock = dynamic(() => import('./CodeBlock'), {
  ssr: false,
  loading: () => (
    <pre className="mt-4 rounded-xl border border-white/10 bg-[#1e1e1e] p-4 text-sm text-gray-300">
      <code>Loading solution...</code>
    </pre>
  ),
});

export default function PracticePrompt({ practice }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const answerId = useId();

  if (!practice?.prompt) return null;

  return (
    <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
          Practice in Your Notebook
        </span>
      </div>
      <p className="mb-2 text-sm font-medium text-foreground">{practice.prompt}</p>
      {practice.hint && (
        <p className="mb-4 text-sm text-muted">
          <span className="font-medium text-foreground">Hint:</span> {practice.hint}
        </p>
      )}
      <button
        type="button"
        onClick={() => setShowAnswer((v) => !v)}
        aria-expanded={showAnswer}
        aria-controls={answerId}
        className="btn-secondary text-sm"
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
      <AnimatePresence>
        {showAnswer && practice.solution && (
          <motion.div
            id={answerId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="mb-2 mt-4 text-xs font-medium uppercase tracking-wide text-muted">Solution</p>
            <CodeBlock code={practice.solution} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
