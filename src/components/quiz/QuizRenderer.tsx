import { BlockTypes, Quiz, QuizBlock } from '../../types/types';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { QuestionBlock } from '../blocks/QuestionBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';
import { FooterBlock } from '../blocks/FooterBlock';

interface QuizRendererProps {
  quiz: Quiz;
}

export const QuizRenderer: React.FC<QuizRendererProps> = ({ quiz }) => {
  const renderBlock = (block: QuizBlock) => {
    const commonProps = {
      block,
      isSelected: false,
      onUpdate: () => {},
    };

    switch (block.type) {
      case BlockTypes.HEADING:
        return <HeadingBlock {...commonProps} block={block} />;
      case BlockTypes.QUESTION:
        return <QuestionBlock {...commonProps} block={block} />;
      case BlockTypes.BUTTON:
        return <ButtonBlock {...commonProps} block={block} />;
      case BlockTypes.FOOTER:
        return <FooterBlock {...commonProps} block={block} />;
      default:
        return null;
    }
  };

  const isPublished = quiz.published;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {quiz.title}
          </h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {quiz.blocks.map(block => (
            <div
              key={block.id}
              className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
            >
              {renderBlock(block)}
            </div>
          ))}
          {quiz.blocks.length === 0 && (
            <p className="flex justify-center items-center opacity-50">
              No blocks added...
            </p>
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            ← Back to the list
          </button>
          {isPublished && (
            <div className="text-sm text-gray-500">
              Published: {new Date(quiz.updatedAt).toLocaleDateString('en-EN')}
            </div>
          )}
          {!isPublished && (
            <p className="text-red-600 font-bold mb-4">Not published yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};
