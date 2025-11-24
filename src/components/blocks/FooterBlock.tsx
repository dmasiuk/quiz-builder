import React from 'react';
import { IFooterBlock } from '../../types/types';

interface FooterBlockProps {
  block: IFooterBlock;
  isSelected: boolean;
  onUpdate: (block: IFooterBlock) => void;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({ block }) => {
  const { properties } = block;
  const { text = '' } = properties;

  return (
    <div className="text-sm text-gray-500 mt-2 pt-4 ">
      {text || 'Footer text'}
    </div>
  );
};
