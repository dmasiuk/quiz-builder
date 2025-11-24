import { IHeadingBlock } from '../../types/types';

interface HeadingBlockProps {
  block: IHeadingBlock;
  isSelected: boolean;
  onUpdate: (block: IHeadingBlock) => void;
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({ block }) => {
  return (
    <h2 className="text-2xl font-bold">{block.properties.text || 'Header'}</h2>
  );
};
