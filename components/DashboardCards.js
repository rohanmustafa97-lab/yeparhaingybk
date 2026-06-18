'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  calculateLevel,
  getCompletionPercentage,
  getCurrentLesson,
  getLastCompletedLesson,
} from '@/lib/progress';
import { getAchievementProgress } from '@/lib/achievements';
import { getStreakLabel } from '@/lib/streak';
import { lessons } from '@/data/lessons';
import XPTracker from './XPTracker';

function StatCard({ label, value, sub, icon, delay = 0 }) {
  return (
    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className="text-xl" aria-hidden="true">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </motion.div>
  );
}

export default function DashboardCards({ progress }) {
  const xp = progress?.xp || 0;
  const level = calculateLevel(xp);
  const completion = getCompletionPercentage(progress?.completedLessons);
  const completedCount = progress?.completedLessons?.length || 0;
  const currentLesson = getCurrentLesson(progress?.completedLessons);
  const lastCompleted = getLastCompletedLesson(progress?.completedLessons);
  const achievements = getAchievementProgress(progress);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total XP" value={xp} sub={`Level ${level} · ${getStreakLabel(progress?.streak)}`} icon="⚡" delay={0} />
        <StatCard label="Completion" value={`${completion}%`} sub={`${completedCount} of ${lessons.length} lessons`} icon="📊" delay={0.1} />
        <StatCard label="Lessons Done" value={completedCount} sub={completedCount === lessons.length ? 'Course complete!' : 'Keep going!'} icon="✅" delay={0.2} />
        <StatCard label="Achievements" value={`${unlockedCount}/${achievements.length}`} sub="Unlocked badges" icon="🏆" delay={0.3} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <XPTracker xp={xp} streak={progress?.streak || 0} />

        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-4 text-lg font-semibold text-foreground">Current Lesson</h3>
          {currentLesson && completedCount < lessons.length ? (
            <div>
              <p className="mb-1 text-sm text-muted">Continue learning</p>
              <p className="mb-4 text-xl font-bold text-foreground">{currentLesson.title}</p>
              <p className="mb-4 text-sm text-muted">{currentLesson.description}</p>
              <Link href={`/lessons/${currentLesson.id}`} className="btn-primary">
                Resume Lesson
              </Link>
            </div>
          ) : (
            <div>
              <p className="mb-4 text-lg font-bold gradient-text">Course Complete!</p>
              <p className="text-sm text-muted">You have mastered Python OOP.</p>
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-4 text-lg font-semibold text-foreground">Last Completed</h3>
          {lastCompleted ? (
            <div>
              <p className="text-xl font-bold text-foreground">{lastCompleted.title}</p>
              <p className="mt-2 text-sm text-muted">{lastCompleted.description}</p>
            </div>
          ) : (
            <p className="text-muted">No lessons completed yet. Start your journey!</p>
          )}
        </motion.div>

        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="mb-4 text-lg font-semibold text-foreground">Achievement Progress</h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  achievement.unlocked
                    ? 'border-primary/30 bg-primary/10'
                    : 'border-white/10 bg-white/5 opacity-60'
                }`}
              >
                <span className="text-2xl" aria-hidden="true">{achievement.icon}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                  <p className="text-xs text-muted">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <span className="ml-auto text-xs font-medium text-green-400">Unlocked</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
