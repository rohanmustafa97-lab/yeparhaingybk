'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import CourseRoadmap from '@/components/CourseRoadmap';
import { lessons } from '@/data/lessons';
import { getTotalQuizzes, getTotalSlides } from '@/lib/progress';

const features = [
  {
    icon: '📖',
    title: 'Interactive Slides',
    description: 'Learn with rich explanations, real-world analogies, and syntax-highlighted Python code examples.',
  },
  {
    icon: '🧠',
    title: 'Scenario Quizzes',
    description: 'Test your understanding with practical scenario-based questions after every lesson.',
  },
  {
    icon: '⚡',
    title: 'XP & Achievements',
    description: 'Earn XP, level up, and unlock achievements as you progress through the course.',
  },
];

const stats = [
  { value: '10', label: 'Lessons' },
  { value: String(getTotalQuizzes()), label: 'Quiz Questions' },
  { value: String(getTotalSlides()), label: 'Slides' },
  { value: 'XP', label: 'Gamification' },
];

function FloatingShape({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold gradient-text">
            Python OOP Mastery
          </Link>
          <nav className="flex items-center gap-3" aria-label="Main navigation">
            <Link href="/dashboard" className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block">
              Dashboard
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <FloatingShape className="left-1/4 top-20 h-64 w-64 bg-primary/20" delay={0} />
          <FloatingShape className="right-1/4 top-40 h-48 w-48 bg-accent/20" delay={2} />
          <FloatingShape className="bottom-20 left-1/3 h-56 w-56 bg-secondary/15" delay={4} />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Premium Learning Experience
              </span>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Master Python{' '}
                <span className="gradient-text">Object-Oriented Programming</span>
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-muted sm:text-xl">
                From classes and inheritance to design patterns and advanced topics — learn OOP through interactive slides, scenario-based quizzes, and gamified progress tracking.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/lessons/intro-to-oop" className="btn-primary text-base">
                  Start Learning
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/dashboard" className="btn-secondary text-base">
                  View Dashboard
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/10 bg-surface/30 px-4 py-12 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl font-bold gradient-text sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-foreground">Everything you need to learn OOP</h2>
              <p className="text-muted">A complete course built from university lecture materials, refined for interactive learning.</p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <span className="mb-4 block text-3xl" aria-hidden="true">{feature.icon}</span>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Preview */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <motion.div
              className="glass-card p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-2xl font-bold text-foreground">Your Learning Journey</h2>
              <CourseRoadmap
                progress={{ completedLessons: [], currentLessonId: 'intro-to-oop' }}
                compact
                interactive={false}
              />
              <div className="mt-6 text-center">
                <Link href="/lessons/intro-to-oop" className="btn-primary">
                  Begin Lesson 1
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center backdrop-blur-xl md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to become an OOP expert?</h2>
            <p className="mb-8 text-muted">
              Join the course covering {lessons.length} comprehensive lessons from basics to advanced topics.
            </p>
            <Link href="/lessons/intro-to-oop" className="btn-primary text-base">
              Start Learning Now
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-muted">
        <p>Python OOP Mastery — Interactive Learning Platform</p>
      </footer>
    </div>
  );
}
