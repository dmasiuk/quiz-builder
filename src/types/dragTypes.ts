export type BlockType = 'heading' | 'question' | 'button' | 'footer';

export interface DragItem {
  type: BlockType;
  blockId?: string;
  index?: number;
}
export interface DropZoneDropItem {
  type: BlockType;
  blockId?: string;
  index?: number;
}
