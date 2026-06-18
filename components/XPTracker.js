'use client';

import { motion } from 'framer-motion';
import { calculateLevel, xpForNextLevel } from '@/lib/progress';

export default function XPTracker({ xp = 0, streak = 0, compact = false }) {
  const level = calculateLevel(xp);
  const { current, needed, progress } = xpForNextLevel(xp);

  if (compact) {
    return (
      <div
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-card px-4 py-2 backdrop-blur-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
          {level}
        </div>
        <div>
          <p className="text-xs text-muted">Level {level} · {streak > 0 ? `${streak}d streak` : 'No streak'}</p>
          <p className="text-sm font-semibold text-foreground">{xp} XP</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5" aria-live="polite" aria-atomic="true">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-lg font-bold text-white shadow-glow"
            whileHover={{ scale: 1.05 }}
          >
            {level}
          </motion.div>
          <div>
            <p className="text-sm text-muted">Current Level</p>
            <p className="text-xl font-bold text-foreground">Level {level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted">Total XP</p>
          <p className="text-xl font-bold gradient-text">{xp}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted">
          <span>Progress to Level {level + 1}</span>
          <span>{current} / {needed} XP</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
