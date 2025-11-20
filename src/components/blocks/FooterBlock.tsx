import React from "react";
import { QuizBlock } from "@/lib/types";

interface FooterBlockProps {
  block: QuizBlock;
  isSelected: boolean;
  onUpdate: (block: QuizBlock) => void;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({
  block,
  isSelected,
  onUpdate,
}) => {
  const { properties } = block;
  const { text = "" } = properties;

  const handleTextChange = (text: string) => {
    onUpdate({
      ...block,
      properties: { ...properties, text },
    });
  };

  if (!isSelected) {
    return (
      <div className="text-sm text-gray-500 mt-2 pt-4 ">
        {text || "Footer text"}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Footer text:</label>
      <textarea
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter footer text..."
        className="w-full p-2 border border-gray-300 rounded"
        rows={3}
      />
    </div>
  );
};
