import { IFooterBlock } from '../../../types/types';

interface FooterBlockEditorProps {
  block: IFooterBlock;
  onUpdate: (block: IFooterBlock) => void;
}

export const FooterBlockEditor: React.FC<FooterBlockEditorProps> = ({
  block,
  onUpdate,
}) => {
  const { properties } = block;
  const { text = '' } = properties;

  const handleTextChange = (text: string) => {
    onUpdate({
      ...block,
      properties: { ...properties, text },
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Footer text:</label>
      <textarea
        value={text}
        onChange={e => handleTextChange(e.target.value)}
        placeholder="Enter footer text..."
        className="w-full p-2 border border-gray-300 rounded"
        rows={3}
      />
    </div>
  );
};
