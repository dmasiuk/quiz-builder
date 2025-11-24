import { useDrag } from 'react-dnd';
import { QuizBlock } from '../../types/types';

interface BlockWrapperProps {
  block: QuizBlock;
  isSelected: boolean;
  index: number;
  children: React.ReactNode;
  onSelect: () => void;
  onDeselect: () => void;
  onDelete: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({
  block,
  index,
  children,
  isSelected,
  onSelect,
  onDeselect,
  onDelete,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'block',
    item: { type: block.type, blockId: block.id, index: index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const dragRef = drag as unknown as React.Ref<HTMLDivElement>;

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
      ref={dragRef}
      className={`
        relative border-2 rounded-lg p-4 transition-all cursor-move
        ${isSelected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:border-gray-300 hover:shadow-sm
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

        <div className="flex gap-3 items-center space-x-2">
          <button
            onClick={handleEditClick}
            className={`px-4 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
              isSelected
                ? 'bg-gray-500 text-white hover:bg-gray-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSelected ? 'Editing...' : 'Edit'}
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-500 hover:text-red-700 cursor-pointer p-1"
          >
            ×
          </button>
        </div>
      </div>

      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};
