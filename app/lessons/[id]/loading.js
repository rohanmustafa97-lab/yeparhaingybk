export default function LessonLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center gradient-bg">
      <div className="glass-card flex flex-col items-center gap-4 p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" role="status" aria-label="Loading lesson" />
        <p className="text-sm text-muted">Loading lesson...</p>
      </div>
    </div>
  );
}
