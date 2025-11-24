import { IButtonBlock } from '../../types/types';

interface ButtonBlockProps {
  block: IButtonBlock;
  isSelected: boolean;
  onUpdate: (block: IButtonBlock) => void;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ block }) => {
  const { properties } = block;
  const { buttonText = 'Next', buttonType = 'next' } = properties;

  const getButtonStyles = () => {
    return 'w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer';
  };

  return (
    <button className={getButtonStyles()} disabled>
      {buttonText || (buttonType === 'next' ? 'Next' : 'Submit')}
    </button>
  );
};
