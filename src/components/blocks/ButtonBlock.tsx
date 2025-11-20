import React from "react";
import { QuizBlock } from "@/lib/types";
import { TypeSelect } from "../ui/TypeSelect";

interface ButtonBlockProps {
  block: QuizBlock;
  isSelected: boolean;
  onUpdate: (block: QuizBlock) => void;
}

type ButtonType = "next" | "submit";

export const ButtonBlock: React.FC<ButtonBlockProps> = ({
  block,
  isSelected,
  onUpdate,
}) => {
  const { properties } = block;
  const { buttonText = "Next", buttonType = "next" } = properties;

  const buttonTypeOptions = [
    { value: "next", label: "Next" },
    { value: "submit", label: "Submit" },
  ];

  const handleTextChange = (text: string) => {
    onUpdate({
      ...block,
      properties: { ...properties, buttonText: text },
    });
  };

  const handleTypeChange = (type: ButtonType) => {
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
        <TypeSelect
          value={buttonType}
          onChange={(value) => handleTypeChange(value as ButtonType)}
          options={buttonTypeOptions}
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <button className={getButtonStyles()} disabled>
          {buttonText || (buttonType === "next" ? "Next" : "Submit")}
        </button>
      </div>
    </div>
  );
};
