"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Quiz } from "@/lib/types";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadQuizzes = () => {
      const data = storage.getQuizzes();
      setQuizzes(data);
      setIsLoaded(true);
    };

    loadQuizzes();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-EN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My quizzes</h1>
            <Button disabled>Create Quiz</Button>
          </div>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-lg">Loading quizzes...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My quizzes</h1>
          <Link href="/quiz/edit">
            <Button>Create Quiz</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {quizzes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You do not have any quiz</p>
              <Link href="/quiz/edit">
                <Button>Create Quiz</Button>
              </Link>
            </div>
          ) : (
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
                  {quizzes.map((quiz) => (
                    <tr key={quiz.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {quiz.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-[5px] text-xs font-semibold rounded ${
                            quiz.published
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {quiz.published ? "Published" : "Not published"}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
