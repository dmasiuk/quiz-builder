import { useToast } from '@/contexts/ToastContext';
import { storage } from '@/lib/storage';
import { Quiz } from '../types/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useQuiz = (quizId: string) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const loadQuiz = () => {
      let loadedQuiz: Quiz | null = null;

      if (quizId) {
        loadedQuiz = storage.getQuiz(quizId);
        if (!loadedQuiz) {
          addToast('Quiz not found', 'error');
          router.push('/');
          return;
        }
      } else {
        loadedQuiz = {
          id: crypto.randomUUID(),
          title: 'New quiz',
          blocks: [],
          published: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      setQuiz(loadedQuiz);
    };

    loadQuiz();
  }, [quizId, router, addToast]);

  const handleSave = () => {
    if (!quiz) return;

    setIsSaving(true);
    storage.saveQuiz(quiz);

    setTimeout(() => {
      setIsSaving(false);
      addToast('Changes are saved!', 'success');
      router.push('/');
    }, 300);
  };

  const handlePublish = () => {
    if (!quiz) return;

    if (!quiz.published && quiz.blocks.length === 0) {
      addToast('Create quiz before publish', 'warning');
      return;
    }

    const updatedQuiz = {
      ...quiz,
      published: true,
      updatedAt: new Date().toISOString(),
    };

    storage.saveQuiz(updatedQuiz);
    setQuiz(updatedQuiz);
    addToast('Quiz is published!', 'success');
    router.push('/');
  };

  return {
    router,
    quiz,
    setQuiz,
    isSaving,
    handleSave,
    handlePublish,
  };
};
