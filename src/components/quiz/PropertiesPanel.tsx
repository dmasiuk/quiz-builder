import React from "react";
import { QuizBlock } from "@/lib/types";
import { HeadingBlock } from "../blocks/HeadingBlock";
import { QuestionBlock } from "../blocks/QuestionBlock";
import { ButtonBlock } from "../blocks/ButtonBlock";
import { FooterBlock } from "../blocks/FooterBlock";

interface PropertiesPanelProps {
  selectedBlock: QuizBlock | null;
  onUpdateBlock: (block: QuizBlock) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlock,
  onUpdateBlock,
}) => {
  if (!selectedBlock) {
    return (
      <div className="w-full lg:w-80 bg-white border-l border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Properties</h3>
        <div className="text-gray-500 text-center py-8">
          Choose the block to edit
        </div>
      </div>
    );
  }

  const commonProps = {
    block: selectedBlock,
    isSelected: true,
    onUpdate: onUpdateBlock,
  };

  return (
    <div className="w-full lg:w-80 bg-white border-l border-gray-200 p-4 overflow-auto">
      <h3 className="font-semibold mb-4">Block properties</h3>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <div className="text-sm text-gray-600">
          Type: {getBlockTypeLabel(selectedBlock.type)}
        </div>
        <div className="text-xs text-gray-500">ID: {selectedBlock.id}</div>
      </div>

      <div className="space-y-4">
        {selectedBlock.type === "heading" && <HeadingBlock {...commonProps} />}
        {selectedBlock.type === "question" && (
          <QuestionBlock {...commonProps} />
        )}
        {selectedBlock.type === "button" && <ButtonBlock {...commonProps} />}
        {selectedBlock.type === "footer" && <FooterBlock {...commonProps} />}
      </div>
    </div>
  );
};

function getBlockTypeLabel(type: string): string {
  const labels: { [key: string]: string } = {
    heading: "Header",
    question: "Question",
    button: "Button",
    footer: "Footer",
  };
  return labels[type] || type;
}
