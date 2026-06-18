import { lessons, getLessonById } from '@/data/lessons';
import LessonClient from './LessonClient';

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    id: lesson.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const id = Array.isArray(resolved.id) ? resolved.id[0] : resolved.id;
  const lesson = getLessonById(id);

  if (!lesson) {
    return { title: 'Lesson Not Found — Python OOP Mastery' };
  }

  const objectivesSnippet = lesson.objectives?.slice(0, 2).join('. ') || '';
  const description = objectivesSnippet
    ? `${lesson.description} (${lesson.duration}) — ${objectivesSnippet}.`
    : `${lesson.description} (${lesson.duration})`;

  return {
    title: `${lesson.title} — Python OOP Mastery`,
    description,
  };
}

export default function LessonPage() {
  return <LessonClient />;
}
