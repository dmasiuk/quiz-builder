import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragItem, QuizBlock } from "@/lib/types";

interface BlockWrapperProps {
  block: QuizBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onDelete: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  index: number;
  children: React.ReactNode;
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({
  block,
  isSelected,
  onSelect,
  onDeselect,
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
      if (
        item.blockId &&
        item.blockId !== block.id &&
        item.index !== undefined
      ) {
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

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      onDeselect();
    } else {
      onSelect();
    }
  };

  return (
    <div
      ref={dragDropRef}
      className={`
        relative border-2 rounded-lg p-4 mb-2 transition-all cursor-move
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}
        ${isDragging ? "opacity-50" : "opacity-100"}
        ${isOver ? "border-dashed border-blue-400 bg-blue-100" : ""}
      `}
    >
      <div className="flex justify-between items-center mb-3 cursor-move">
        <div className="flex items-center text-sm text-gray-500">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
          {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleEditClick}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
              isSelected
                ? "bg-gray-500 text-white hover:bg-gray-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSelected ? "Stop editing" : "Edit block"}
          </button>

          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-500 hover:text-red-700 cursor-pointer p-1"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
