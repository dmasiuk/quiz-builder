import { IQuestionBlock } from '../../types/types';

interface QuestionBlockProps {
  block: IQuestionBlock;
  isSelected: boolean;
  onUpdate: (block: IQuestionBlock) => void;
}

export const QuestionBlock: React.FC<QuestionBlockProps> = ({ block }) => {
  const { properties } = block;
  const { questionType = 'single', text = '', options = [''] } = properties;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">{text || 'Question'}</h3>
      {questionType === 'text' && (
        <textarea
          placeholder="Write your answer..."
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
          disabled
        />
      )}
      {(questionType === 'single' || questionType === 'multi') && (
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center cursor-pointer">
              <input
                type={questionType === 'single' ? 'radio' : 'checkbox'}
                name={`question-${block.id}`}
                className="mr-2 cursor-pointer"
                disabled
              />
              <span>{option || `Answer ${index + 1}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
