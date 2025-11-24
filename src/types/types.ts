export interface Quiz {
  id: string;
  title: string;
  blocks: QuizBlock[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum BlockTypes {
  HEADING = 'heading',
  QUESTION = 'question',
  BUTTON = 'button',
  FOOTER = 'footer',
}

export type QuestionType = 'single' | 'multi' | 'text';
export type ButtonType = 'next' | 'submit';

export interface IHeadingBlock {
  id: string;
  type: BlockTypes.HEADING;
  properties: {
    text: string;
  };
}

export interface IQuestionBlock {
  id: string;
  type: BlockTypes.QUESTION;
  properties: {
    text: string;
    questionType: QuestionType;
    options: string[];
  };
}
export interface IButtonBlock {
  id: string;
  type: BlockTypes.BUTTON;
  properties: {
    buttonText: string;
    buttonType: ButtonType;
  };
}

export interface IFooterBlock {
  id: string;
  type: BlockTypes.FOOTER;
  properties: {
    text: string;
  };
}

export type QuizBlock =
  | IHeadingBlock
  | IQuestionBlock
  | IButtonBlock
  | IFooterBlock;

export interface DeleteModal {
  isOpen: boolean;
  quizId: string | null;
  quizTitle: string;
}
