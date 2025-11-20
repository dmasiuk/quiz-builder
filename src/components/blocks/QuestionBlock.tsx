import { QuizBlock } from "@/lib/types";
import { TypeSelect } from "../ui/TypeSelect";

interface QuestionBlockProps {
  block: QuizBlock;
  isSelected: boolean;
  onUpdate: (block: QuizBlock) => void;
}

type QuestionType = "single" | "multi" | "text";

export const QuestionBlock: React.FC<QuestionBlockProps> = ({
  block,
  isSelected,
  onUpdate,
}) => {
  const { properties } = block;
  const { questionType = "single", text = "", options = [""] } = properties;

  const questionTypeOptions = [
    { value: "single", label: "Single selection" },
    { value: "multi", label: "Multi selection" },
    { value: "text", label: "Text answer" },
  ];

  const handleTextChange = (text: string) => {
    onUpdate({
      ...block,
      properties: { ...properties, text },
    });
  };

  const handleTypeChange = (type: QuestionType) => {
    onUpdate({
      ...block,
      properties: {
        ...properties,
        questionType: type,
        options: type === "text" ? [] : options,
      },
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onUpdate({
      ...block,
      properties: { ...properties, options: newOptions },
    });
  };

  const addOption = () => {
    onUpdate({
      ...block,
      properties: { ...properties, options: [...options, ""] },
    });
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    onUpdate({
      ...block,
      properties: { ...properties, options: newOptions },
    });
  };

  if (!isSelected) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{text || "Question"}</h3>
        {questionType === "text" && (
          <textarea
            placeholder="Write your answer..."
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        )}
        {(questionType === "single" || questionType === "multi") && (
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type={questionType === "single" ? "radio" : "checkbox"}
                  name={`question-${block.id}`}
                  className="mr-2"
                />
                <span>{option || `Answer ${index + 1}`}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter the question"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <div>
        <label className="block text-sm font-medium mb-2">Question type:</label>
        <TypeSelect
          value={questionType}
          onChange={(value) => handleTypeChange(value as QuestionType)}
          options={questionTypeOptions}
        />
      </div>

      {(questionType === "single" || questionType === "multi") && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Answer variants:
          </label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type={questionType === "single" ? "radio" : "checkbox"}
                  disabled
                  className="mr-1"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Answer ${index + 1}`}
                  className="flex-1 p-1 border border-gray-300 rounded"
                />
                <button
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addOption}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + Add a variant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
