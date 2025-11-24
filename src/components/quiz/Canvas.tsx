import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { QuizBlock, BlockTypes } from '../../types/types';
import { BlockWrapper } from '../blocks/BlockWrapper';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { QuestionBlock } from '../blocks/QuestionBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';
import { FooterBlock } from '../blocks/FooterBlock';

interface CanvasProps {
  blocks: QuizBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  onDeselectBlock: () => void;
  onUpdateBlock: (block: QuizBlock) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddBlock: (type: BlockTypes, index?: number) => void;
  onMoveBlock: (fromIndex: number, toIndex: number) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onDeselectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onAddBlock,
  onMoveBlock,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item: { type: BlockTypes; blockId?: string; index?: number }) => {
      if (!item.blockId) {
        const insertIndex = hoverIndex !== null ? hoverIndex : blocks.length;
        onAddBlock(item.type, insertIndex);
      } else if (item.blockId && item.index !== undefined) {
        const fromIndex = item.index;
        const toIndex = hoverIndex !== null ? hoverIndex : blocks.length - 1;

        if (fromIndex !== toIndex) {
          const adjustedToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
          onMoveBlock(fromIndex, adjustedToIndex);
        }
      }
      setHoverIndex(null);
    },
    hover: (_, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const canvasElement = document.getElementById('canvas-area');
      if (!canvasElement) return;

      const canvasRect = canvasElement.getBoundingClientRect();
      const relativeY = clientOffset.y - canvasRect.top;

      const blockElements =
        canvasElement.querySelectorAll('[data-block-index]');
      let closestIndex = blocks.length;

      for (let i = 0; i < blockElements.length; i++) {
        const blockElement = blockElements[i] as HTMLElement;
        const blockRect = blockElement.getBoundingClientRect();
        const blockIndex = parseInt(blockElement.dataset.blockIndex || '0');

        const blockTopRelative = blockRect.top - canvasRect.top;
        if (relativeY < blockTopRelative + blockRect.height / 2) {
          closestIndex = blockIndex;
          break;
        }
      }

      setHoverIndex(closestIndex);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderBlock = (block: QuizBlock, index: number) => {
    const commonProps = {
      isSelected: selectedBlockId === block.id,
      onSelect: () => onSelectBlock(block.id),
      onDeselect: onDeselectBlock,
      onDelete: () => onDeleteBlock(block.id),
      onUpdate: onUpdateBlock,
      onMove: onMoveBlock,
      index,
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

  const dropRef = drop as unknown as React.Ref<HTMLDivElement>;

  return (
    <div
      ref={dropRef}
      id="canvas-area"
      className={`
        flex-1 bg-gray-50 p-6 overflow-auto transition-colors duration-200
        ${isOver ? 'bg-blue-50' : ''}
        relative
      `}
    >
      <div className="max-w-2xl mx-auto space-y-4">
        {blocks.length === 0 && (
          <div
            className={`
            text-center py-16 text-gray-500 border-2 border-dashed rounded-lg
            transition-all duration-200
            ${isOver ? 'border-blue-400 bg-blue-50 scale-[1.02]' : 'border-gray-300'}
          `}
          >
            <div className="text-lg font-medium mb-2">
              Drag blocks here to start creating a quiz
            </div>
            {isOver && (
              <div className="text-blue-500 font-semibold animate-pulse">
                Release to add your first block!
              </div>
            )}
          </div>
        )}

        {blocks.map((block, index) => (
          <div
            key={block.id}
            data-block-index={index}
            className={`
              transition-all duration-200
              ${isOver && hoverIndex === index ? 'translate-y-2' : ''}
            `}
          >
            <BlockWrapper
              block={block}
              isSelected={selectedBlockId === block.id}
              onSelect={() => onSelectBlock(block.id)}
              onDeselect={onDeselectBlock}
              onDelete={() => onDeleteBlock(block.id)}
              onMove={onMoveBlock}
              index={index}
            >
              {renderBlock(block, index)}
            </BlockWrapper>
          </div>
        ))}
        {isOver && hoverIndex === blocks.length && blocks.length > 0 && (
          <div className="h-1 bg-blue-500 rounded-full mx-4 mb-4" />
        )}
      </div>
    </div>
  );
};
