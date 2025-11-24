import { QuizBlock, BlockTypes } from '../../types/types';
import { HeadingBlockEditor } from '../blocks/block-editors/HeadingBlockEditor';
import { QuestionBlockEditor } from '../blocks/block-editors/QuestionBlockEditor';
import { ButtonBlockEditor } from '../blocks/block-editors/ButtonBlockEditor';
import { FooterBlockEditor } from '../blocks/block-editors/FooterBlockEditor';

interface PropertiesPanelProps {
  selectedBlock: QuizBlock | null;
  onUpdateBlock: (block: QuizBlock) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlock,
  onUpdateBlock,
}) => {
  if (!selectedBlock) {
    return (
      <div className="w-full lg:w-80 bg-white border-l border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Properties</h3>
        <div className="text-gray-500 text-center py-8">
          Choose the block to edit
        </div>
      </div>
    );
  }

  const renderEditor = () => {
    switch (selectedBlock.type) {
      case BlockTypes.HEADING:
        return (
          <HeadingBlockEditor block={selectedBlock} onUpdate={onUpdateBlock} />
        );

      case BlockTypes.QUESTION:
        return (
          <QuestionBlockEditor block={selectedBlock} onUpdate={onUpdateBlock} />
        );

      case BlockTypes.BUTTON:
        return (
          <ButtonBlockEditor block={selectedBlock} onUpdate={onUpdateBlock} />
        );

      case BlockTypes.FOOTER:
        return (
          <FooterBlockEditor block={selectedBlock} onUpdate={onUpdateBlock} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white border-l border-gray-200 p-4 overflow-auto">
      <h3 className="font-semibold mb-4">Block properties</h3>
      <div className="space-y-4">{renderEditor()}</div>
    </div>
  );
};
