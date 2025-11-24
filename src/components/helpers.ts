import {
  BlockTypes,
  IButtonBlock,
  IFooterBlock,
  IHeadingBlock,
  IQuestionBlock,
  QuizBlock,
} from '../types/types';

export const getDefaultProperties = (type: BlockTypes): QuizBlock => {
  switch (type) {
    case BlockTypes.HEADING:
      return {
        id: crypto.randomUUID(),
        type: 'heading',
        properties: { text: '' },
      } as IHeadingBlock;

    case BlockTypes.QUESTION:
      return {
        id: crypto.randomUUID(),
        type: 'question',
        properties: {
          text: '',
          questionType: 'single',
          options: [''],
        },
      } as IQuestionBlock;

    case BlockTypes.BUTTON:
      return {
        id: crypto.randomUUID(),
        type: 'button',
        properties: {
          buttonText: 'Next',
          buttonType: 'next',
        },
      } as IButtonBlock;

    case BlockTypes.FOOTER:
      return {
        id: crypto.randomUUID(),
        type: 'footer',
        properties: { text: '' },
      } as IFooterBlock;

    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Unknown block type: ${exhaustiveCheck}`);
  }
};
