import React from "react";
import { QuizBlock } from "@/lib/types";

interface HeadingBlockProps {
  block: QuizBlock;
  isSelected: boolean;
  onUpdate: (block: QuizBlock) => void;
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({
  block,
  isSelected,
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
      {isSelected ? (
        <input
          type="text"
          value={block.properties.text || ""}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full text-2xl font-bold p-2 border border-gray-300 rounded"
          placeholder="Enter header..."
        />
      ) : (
        <h2 className="text-2xl font-bold">
          {block.properties.text || "Header"}
        </h2>
      )}
    </div>
  );
};
