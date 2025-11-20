export interface Quiz {
  id: string;
  title: string;
  blocks: QuizBlock[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BlockType = "heading" | "question" | "button" | "footer";

export interface QuizBlock {
  id: string;
  type: BlockType;
  properties: BlockProperties;
}

export interface BlockProperties {
  text?: string;
  questionType?: "single" | "multi" | "text";
  options?: string[];
  buttonText?: string;
  buttonType?: "next" | "submit";
}

export interface DragItem {
  type: BlockType;
  blockId?: string;
  index?: number;
}
