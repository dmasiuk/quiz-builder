import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragItem, QuizBlock } from "@/lib/types";

interface BlockWrapperProps {
  block: QuizBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  index: number;
  children: React.ReactNode;
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({
  block,
  isSelected,
  onSelect,
  onDelete,
  onMove,
  index,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "block",
    item: { type: block.type, blockId: block.id, index: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "block",
    drop: (item: DragItem) => {
      if (item.blockId && item.blockId !== block.id && item.index) {
        onMove(item.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const dragDropRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      drag(node);
      drop(node);
    },
    [drag, drop]
  );

  return (
    <div
      ref={dragDropRef}
      className={`
        relative border-2 rounded-lg p-4 mb-2 cursor-move transition-all
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}
        ${isDragging ? "opacity-50" : "opacity-100"}
        ${isOver ? "border-dashed border-blue-400" : ""}
      `}
      onClick={onSelect}
    >
      {children}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute -top-0.5 right-1 text-red-500 hover:text-red-700 cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
};
