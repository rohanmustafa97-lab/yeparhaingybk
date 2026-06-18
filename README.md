# Python OOP Mastery — Learning Platform

A premium, interactive learning platform for Python Object-Oriented Programming. Built with Next.js, featuring slide-based lessons, scenario quizzes, XP gamification, and progress tracking.

## Features

- 10 comprehensive lessons from OOP basics to advanced topics
- Interactive slide-based learning with syntax-highlighted Python code
- Scenario-based quizzes after each lesson
- XP system, levels, and achievements
- Progress dashboard with course roadmap
- Dark/light mode with persistence
- Mobile-responsive design
- Deployable to Vercel with zero configuration

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Vercel Deployment

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — no environment variables required
4. Deploy

The `vercel-build` script runs `next build` automatically.

## Project Structure

```
app/
├── layout.js          # Root layout
├── page.js            # Landing page
├── dashboard/         # Progress dashboard
└── lessons/[id]/     # Dynamic lesson routes

components/            # UI components
data/lessons.js        # All course content (single source of truth)
lib/                   # Storage, progress, achievements
styles/globals.css     # Global styles and design tokens
```

## Course Content

1. Introduction to OOP & Classes
2. Attributes and Methods
3. Inheritance
4. Polymorphism
5. Encapsulation
6. Abstraction
7. Magic Methods
8. Property Decorators
9. Class Methods & Static Methods
10. Advanced Topics

## Verify Build

```bash
npm run build
```

If the build succeeds with no errors, the app is ready for Vercel deployment.

## Troubleshooting

- **Node not found**: Install Node.js 18.17+ from [nodejs.org](https://nodejs.org)
- **Port in use**: Run `npm run dev -- -p 3001` to use a different port
- **Stale progress**: Use "Reset all progress" on the Dashboard page

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion
- React Syntax Highlighter
- Canvas Confetti

## Repository

[https://github.com/rohanmustafa97-lab/yeparhaingybk](https://github.com/rohanmustafa97-lab/yeparhaingybk)
