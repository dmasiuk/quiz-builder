import { IHeadingBlock } from '../../../types/types';

interface HeadingBlockEditorProps {
  block: IHeadingBlock;
  onUpdate: (block: IHeadingBlock) => void;
}

export const HeadingBlockEditor: React.FC<HeadingBlockEditorProps> = ({
  block,
  onUpdate,
}) => {
  const handleTextChange = (text: string) => {
    onUpdate({
      ...block,
      properties: { ...block.properties, text },
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Header text:</label>
      <input
        type="text"
        value={block.properties.text || ''}
        onChange={e => handleTextChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter header..."
      />
    </div>
  );
};
