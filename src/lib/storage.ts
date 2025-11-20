import { Quiz } from "./types";

const QUIZZES_KEY = "quizbuilder.quizzes";
const INITIALIZED_KEY = "quizbuilder.initialized";

const initialQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Example",
    blocks: [
      {
        id: "1-1",
        type: "heading",
        properties: { text: "Hello!" },
      },
      {
        id: "1-2",
        type: "question",
        properties: {
          questionType: "single",
          text: "Any question?",
          options: ["aaa", "bbb", "ccc", "ddd"],
        },
      },
      {
        id: "1-3",
        type: "button",
        properties: { buttonText: "Next", buttonType: "next" },
      },
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const storage = {
  getQuizzes(): Quiz[] {
    try {
      const data = localStorage.getItem(QUIZZES_KEY);
      if (!data) {
        this.initializeData();
        return initialQuizzes;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading quizzes from localStorage:", error);
      this.showError("Error loading data");
      return [];
    }
  },

  saveQuizzes(quizzes: Quiz[]): void {
    try {
      localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
    } catch (error) {
      console.error("Error saving quizzes to localStorage:", error);
      this.showError("Error saving data");
    }
  },

  getQuiz(id: string): Quiz | null {
    const quizzes = this.getQuizzes();
    return quizzes.find((quiz) => quiz.id === id) || null;
  },

  saveQuiz(quiz: Quiz): void {
    const quizzes = this.getQuizzes();
    const existingIndex = quizzes.findIndex((q) => q.id === quiz.id);

    if (existingIndex >= 0) {
      quizzes[existingIndex] = quiz;
    } else {
      quizzes.push(quiz);
    }

    this.saveQuizzes(quizzes);
  },

  initializeData(): void {
    const initialized = localStorage.getItem(INITIALIZED_KEY);
    if (!initialized) {
      this.saveQuizzes(initialQuizzes);
      localStorage.setItem(INITIALIZED_KEY, "true");
    }
  },

  showError(message: string): void {
    console.error("Storage Error:", message);
  },
};
