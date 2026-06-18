'use client';

import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, label = 'Progress', showLabel = true, size = 'md' }) {
  const clamped = Math.min(100, Math.max(0, value));
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div className="w-full" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">{label}</span>
          <span className="font-semibold text-foreground">{clamped}%</span>
        </div>
      )}
      <div className={`overflow-hidden rounded-full bg-white/10 ${height}`}>
        <motion.div
          className={`rounded-full bg-gradient-to-r from-primary to-accent ${height}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
