import { lessons } from '@/data/lessons';
import LessonClient from './LessonClient';

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    id: lesson.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const id = Array.isArray(resolved.id) ? resolved.id[0] : resolved.id;
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return { title: 'Lesson Not Found — Python OOP Mastery' };
  }

  return {
    title: `${lesson.title} — Python OOP Mastery`,
    description: lesson.description,
  };
}

export default function LessonPage() {
  return <LessonClient />;
}
