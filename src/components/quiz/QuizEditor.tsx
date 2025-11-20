"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/navigation";
import { Quiz, QuizBlock, BlockType } from "@/lib/types";
import { storage } from "@/lib/storage";
import { BlockPalette } from "./BlockPalette";
import { Canvas } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface QuizEditorProps {
  quizId?: string;
}

export const QuizEditor: React.FC<QuizEditorProps> = ({ quizId }) => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(() =>
    initializeQuiz(quizId, router)
  );
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const selectedBlock =
    quiz?.blocks.find((block) => block.id === selectedBlockId) || null;

  const updateQuiz = (updates: Partial<Quiz>) => {
    if (quiz) {
      const updatedQuiz = {
        ...quiz,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      setQuiz(updatedQuiz);
    }
  };

  const handleTitleChange = (title: string) => {
    updateQuiz({ title });
  };

  const handleAddBlock = (type: BlockType, index?: number) => {
    if (!quiz) return;

    const newBlock: QuizBlock = {
      id: crypto.randomUUID(),
      type,
      properties: getDefaultProperties(type),
    };

    const newBlocks = [...quiz.blocks];
    const insertIndex = index !== undefined ? index : newBlocks.length;
    newBlocks.splice(insertIndex, 0, newBlock);

    updateQuiz({ blocks: newBlocks });
    setSelectedBlockId(newBlock.id);
  };

  const handleUpdateBlock = (updatedBlock: QuizBlock) => {
    if (!quiz) return;

    const newBlocks = quiz.blocks.map((block) =>
      block.id === updatedBlock.id ? updatedBlock : block
    );

    updateQuiz({ blocks: newBlocks });
  };

  const handleDeleteBlock = (blockId: string) => {
    if (!quiz) return;

    const newBlocks = quiz.blocks.filter((block) => block.id !== blockId);
    updateQuiz({ blocks: newBlocks });

    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const handleMoveBlock = (fromIndex: number, toIndex: number) => {
    if (!quiz) return;

    const newBlocks = [...quiz.blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);

    updateQuiz({ blocks: newBlocks });
  };

  const handleSave = () => {
    if (!quiz) return;

    setIsSaving(true);
    storage.saveQuiz(quiz);

    setTimeout(() => {
      setIsSaving(false);
      alert("Changes are saved!");
    }, 500);
  };

  const handlePublish = () => {
    if (!quiz) return;

    if (!quiz.published && quiz.blocks.length === 0) {
      alert("Add any blocks to publish");
      return;
    }

    const updatedQuiz = {
      ...quiz,
      published: true,
      updatedAt: new Date().toISOString(),
    };

    storage.saveQuiz(updatedQuiz);
    setQuiz(updatedQuiz);
    alert("Quiz is published!");
  };

  const handleBack = () => {
    router.push("/");
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Button variant="secondary" onClick={handleBack}>
                ← Back
              </Button>
              <div className="flex-1 max-w-2xl">
                <Input
                  value={quiz.title}
                  onChange={handleTitleChange}
                  placeholder="Enter quiz title..."
                  className="text-xl font-semibold"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                variant="secondary"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handlePublish} disabled={quiz.published}>
                {quiz.published ? "Published" : "Publish"}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <BlockPalette />
          <Canvas
            blocks={quiz.blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onUpdateBlock={handleUpdateBlock}
            onDeleteBlock={handleDeleteBlock}
            onAddBlock={handleAddBlock}
            onMoveBlock={handleMoveBlock}
          />
          <PropertiesPanel
            selectedBlock={selectedBlock}
            onUpdateBlock={handleUpdateBlock}
          />
        </div>
      </div>
    </DndProvider>
  );
};

function getDefaultProperties(type: BlockType) {
  switch (type) {
    case "heading":
      return { text: "New header" };
    case "question":
      return {
        text: "New question",
        questionType: "single" as const,
        options: ["Answer 1", "Answer 2"],
      };
    case "button":
      return {
        buttonText: "Next",
        buttonType: "next" as const,
      };
    case "footer":
      return { text: "Footer text" };
    default:
      return {};
  }
}

function initializeQuiz(
  quizId?: string,
  router?: AppRouterInstance
): Quiz | null {
  if (quizId) {
    const existingQuiz = storage.getQuiz(quizId);
    if (existingQuiz) {
      return existingQuiz;
    } else {
      alert("Quiz not found");
      router?.push("/");
      return null;
    }
  } else {
    return {
      id: crypto.randomUUID(),
      title: "New quiz",
      blocks: [],
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
