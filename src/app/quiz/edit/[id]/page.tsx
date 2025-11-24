'use client';

import { QuizEditor } from '@/components/quiz/QuizEditor';
import { useParams } from 'next/navigation';

export default function EditQuizPage() {
  const params = useParams();
  const quizId = params.id as string;

  return <QuizEditor quizId={quizId} />;
}
