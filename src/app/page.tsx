'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DeleteModal, Quiz } from '../types/types';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/table/Table';

export default function HomePage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
    quizId: null,
    quizTitle: '',
  });

  useEffect(() => {
    const loadQuizzes = () => {
      const data = storage.getQuizzes();
      setQuizzes(data);
      setIsLoaded(true);
    };

    loadQuizzes();
  }, []);

  const openDeleteModal = (quizId: string, quizTitle: string) => {
    setDeleteModal({
      isOpen: true,
      quizId,
      quizTitle,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      quizId: null,
      quizTitle: '',
    });
  };

  const handleDeleteQuiz = () => {
    if (deleteModal.quizId) {
      storage.deleteQuiz(deleteModal.quizId);
      setQuizzes(storage.getQuizzes());
      closeDeleteModal();
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My quizzes</h1>
            <Button disabled>Create Quiz</Button>
          </div>
          <div className="bg-white rounded-lg shadow p-8 py-12 text-center">
            <div className="text-lg">Loading quizzes...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My quizzes</h1>
            <Link href="/quiz/edit">
              <Button>Create Quiz</Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table quizzes={quizzes} onDeleteQuiz={openDeleteModal} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteQuiz}
        title="Delete Quiz"
        message={`Are you sure you want to delete "${deleteModal.quizTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
