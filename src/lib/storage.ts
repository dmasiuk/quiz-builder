import { BlockTypes, Quiz } from '../types/types';

const QUIZZES_KEY = 'quizbuilder.quizzes';
const INITIALIZED_KEY = 'quizbuilder.initialized';

const initialQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Quiz example 1',
    blocks: [
      {
        id: '1-1',
        type: BlockTypes.HEADING,
        properties: { text: 'Hello!' },
      },
      {
        id: '1-2',
        type: BlockTypes.QUESTION,
        properties: {
          questionType: 'single',
          text: 'Any question?',
          options: ['option 1', 'option 2', 'option 3', 'option 4'],
        },
      },
      {
        id: '1-3',
        type: BlockTypes.BUTTON,
        properties: { buttonText: 'Next', buttonType: 'next' },
      },
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Quiz example 2',
    blocks: [
      {
        id: '2-1',
        type: BlockTypes.HEADING,
        properties: { text: 'Hello Quiz!' },
      },
      {
        id: '2-2',
        type: BlockTypes.QUESTION,
        properties: {
          questionType: 'multi',
          text: 'Any question?',
          options: ['option 1', 'option 2', 'option 3', 'option 4'],
        },
      },
      {
        id: '2-3',
        type: BlockTypes.BUTTON,
        properties: { buttonText: 'Next', buttonType: 'next' },
      },
      {
        id: '2-4',
        type: BlockTypes.FOOTER,
        properties: {
          text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
        },
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
      console.error('Error reading quizzes from localStorage:', error);
      this.showError('Error loading data');
      return [];
    }
  },

  saveQuizzes(quizzes: Quiz[]): void {
    try {
      localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
    } catch (error) {
      console.error('Error saving quizzes to localStorage:', error);
      this.showError('Error saving data');
    }
  },

  getQuiz(id: string): Quiz | null {
    const quizzes = this.getQuizzes();
    return quizzes.find(quiz => quiz.id === id) || null;
  },

  saveQuiz(quiz: Quiz): void {
    const quizzes = this.getQuizzes();
    const existingIndex = quizzes.findIndex(q => q.id === quiz.id);

    if (existingIndex >= 0) {
      quizzes[existingIndex] = quiz;
    } else {
      quizzes.push(quiz);
    }

    this.saveQuizzes(quizzes);
  },

  deleteQuiz(id: string): void {
    try {
      const quizzes = this.getQuizzes();
      const filteredQuizzes = quizzes.filter(quiz => quiz.id !== id);
      this.saveQuizzes(filteredQuizzes);
    } catch (error) {
      console.error('Error deleting quiz from localStorage:', error);
      this.showError('Error deleting quiz');
    }
  },

  initializeData(): void {
    const initialized = localStorage.getItem(INITIALIZED_KEY);
    if (!initialized) {
      this.saveQuizzes(initialQuizzes);
      localStorage.setItem(INITIALIZED_KEY, 'true');
    }
  },

  showError(message: string): void {
    console.error('Storage Error:', message);
  },
};
