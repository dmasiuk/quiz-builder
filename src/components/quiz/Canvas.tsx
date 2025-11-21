import React from "react";
import { useDrop } from "react-dnd";
import { QuizBlock, BlockType } from "@/lib/types";
import { BlockWrapper } from "../blocks/BlockWrapper";
import { HeadingBlock } from "../blocks/HeadingBlock";
import { QuestionBlock } from "../blocks/QuestionBlock";
import { ButtonBlock } from "../blocks/ButtonBlock";
import { FooterBlock } from "../blocks/FooterBlock";

interface CanvasProps {
  blocks: QuizBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  onDeselectBlock: () => void;
  onUpdateBlock: (block: QuizBlock) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddBlock: (type: BlockType, index?: number) => void;
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
  const [{ isOver }, drop] = useDrop({
    accept: "block",
    drop: (item: { type: BlockType; blockId?: string }) => {
      if (!item.blockId) {
        onAddBlock(item.type);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderBlock = (block: QuizBlock, index: number) => {
    const commonProps = {
      block,
      isSelected: selectedBlockId === block.id,
      onSelect: () => onSelectBlock(block.id),
      onDeselect: onDeselectBlock,
      onDelete: () => onDeleteBlock(block.id),
      onUpdate: onUpdateBlock,
      onMove: onMoveBlock,
      index,
    };

    switch (block.type) {
      case "heading":
        return <HeadingBlock {...commonProps} />;
      case "question":
        return <QuestionBlock {...commonProps} />;
      case "button":
        return <ButtonBlock {...commonProps} />;
      case "footer":
        return <FooterBlock {...commonProps} />;
      default:
        return null;
    }
  };

  const dropRef = drop as unknown as React.Ref<HTMLDivElement>;

  return (
    <div
      ref={dropRef}
      className={`
        flex-1 bg-gray-50 p-6 overflow-auto
        ${isOver ? "bg-blue-50" : ""}
      `}
    >
      <div className="max-w-2xl mx-auto space-y-4">
        {blocks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Drag blocks here to start creating a quiz.
          </div>
        )}

        {blocks.map((block, index) => (
          <BlockWrapper
            key={block.id}
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
        ))}
      </div>
    </div>
  );
};
