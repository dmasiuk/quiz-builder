import { useDrag } from 'react-dnd';
import { BlockTypes } from '../../types/types';

const blockTypes: { type: BlockTypes; label: string; icon: string }[] = [
  { type: BlockTypes.HEADING, label: 'Header', icon: 'H' },
  { type: BlockTypes.QUESTION, label: 'Question', icon: 'Q' },
  { type: BlockTypes.BUTTON, label: 'Button', icon: 'B' },
  { type: BlockTypes.FOOTER, label: 'Footer', icon: 'F' },
];

export const BlockPalette: React.FC = () => {
  return (
    <div className="w-full lg:w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="font-semibold mb-4">Blocks</h3>
      <div className="space-y-2">
        {blockTypes.map(block => (
          <DraggableBlock key={block.type} {...block} />
        ))}
      </div>
    </div>
  );
};

const DraggableBlock: React.FC<{
  type: BlockTypes;
  label: string;
  icon: string;
}> = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'block',
    item: { type },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const dragRef = drag as unknown as React.Ref<HTMLDivElement>;

  return (
    <div
      ref={dragRef}
      className={`
        flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg 
        cursor-move transition-all hover:border-blue-400 hover:bg-blue-50
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <div className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center font-bold">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
};
