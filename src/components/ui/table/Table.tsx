import React from 'react';
import Link from 'next/link';
import { Quiz } from '../../../types/types';

interface TableProps {
  quizzes: Quiz[];
  onDeleteQuiz: (quizId: string, quizTitle: string) => void;
}

export const Table: React.FC<TableProps> = ({ quizzes, onDeleteQuiz }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You do not have any quizzes</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto thin-scrollbar">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quiz Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {quizzes.map(quiz => (
            <tr key={quiz.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {quiz.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-3 py-[5px] text-xs font-semibold rounded w-[105px] justify-center text-center ${
                    quiz.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {quiz.published ? 'Published' : 'Not published'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(quiz.updatedAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Link
                  href={`/quiz/edit/${quiz.id}`}
                  className="text-blue-600 hover:text-blue-900 border border-gray-300 rounded px-1.5 py-1 hover:bg-gray-100 transition-all"
                >
                  Edit
                </Link>
                <Link
                  href={`/quiz/${quiz.id}`}
                  className="text-green-600 hover:text-green-900 border border-gray-300 rounded px-1.5 py-1 hover:bg-gray-100 transition-all"
                >
                  View
                </Link>
                <button
                  onClick={() => onDeleteQuiz(quiz.id, quiz.title)}
                  className="text-red-600 hover:text-red-900 border border-gray-300 rounded px-1.5 py-1 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
