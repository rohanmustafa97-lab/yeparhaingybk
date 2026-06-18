import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-bg p-4 text-center">
      <h1 className="mb-2 text-6xl font-bold gradient-text">404</h1>
      <h2 className="mb-4 text-2xl font-bold text-foreground">Page not found</h2>
      <p className="mb-8 max-w-md text-muted">
        The page you are looking for does not exist. Return home or continue your OOP learning journey.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/lessons/intro-to-oop" className="btn-secondary">Start Learning</Link>
        <Link href="/dashboard" className="btn-secondary">Dashboard</Link>
      </div>
    </div>
  );
}
