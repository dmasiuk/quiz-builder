"use client";

import { useParams, useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { QuizRenderer } from "@/components/quiz/QuizRenderer";
import { useEffect, useState } from "react";
import { Quiz } from "@/lib/types";
import { Loading } from "@/components/ui/Loading";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadQuiz = () => {
      setIsLoading(true);
      const quizId = params.id as string;
      const foundQuiz = storage.getQuiz(quizId);
      setQuiz(foundQuiz);
      setIsLoading(false);
    };
    loadQuiz();
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Quiz not found
          </h1>
          <Button onClick={() => router.push("/")}>Back to the list</Button>
        </div>
      </div>
    );
  }

  if (!quiz.published) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {quiz.title}
          </h1>
          <p className="text-gray-600 mb-4">Not published yet</p>
          <div className="space-x-2">
            <Button onClick={() => router.push("/")}>Back to the list</Button>
          </div>
        </div>
      </div>
    );
  }

  return <QuizRenderer quiz={quiz} />;
}
