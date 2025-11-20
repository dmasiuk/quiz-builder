import React from "react";
import { QuizBlock } from "@/lib/types";

interface ButtonBlockProps {
  block: QuizBlock;
  isSelected: boolean;
  onUpdate: (block: QuizBlock) => void;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({
  block,
  isSelected,
  onUpdate,
}) => {
  const { properties } = block;
  const { buttonText = "Next", buttonType = "next" } = properties;

  const handleTextChange = (text: string) => {
    onUpdate({
      ...block,
      properties: { ...properties, buttonText: text },
    });
  };

  const handleTypeChange = (type: "next" | "submit") => {
    onUpdate({
      ...block,
      properties: { ...properties, buttonType: type },
    });
  };

  const getButtonStyles = () => {
    return "w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer";
  };

  if (!isSelected) {
    return (
      <button className={getButtonStyles()}>
        {buttonText || (buttonType === "next" ? "Next" : "Submit")}
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Button text:</label>
        <input
          type="text"
          value={buttonText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Button type:</label>
        <select
          value={buttonType}
          onChange={(e) =>
            handleTypeChange(e.target.value as "next" | "submit")
          }
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="next">Next</option>
          <option value="submit">Submit</option>
        </select>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <button className={getButtonStyles()} disabled>
          {buttonText || (buttonType === "next" ? "Next" : "Submit")}
        </button>
      </div>
    </div>
  );
};
