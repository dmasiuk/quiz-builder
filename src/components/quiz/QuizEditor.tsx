"use client";

import { useEffect, useState } from "react";
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
import { Loading } from "../ui/Loading";
import { useToast } from "@/contexts/ToastContext";
interface QuizEditorProps {
  quizId?: string;
}

export const QuizEditor: React.FC<QuizEditorProps> = ({ quizId }) => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const loadQuiz = () => {
      let loadedQuiz: Quiz | null = null;

      if (quizId) {
        loadedQuiz = storage.getQuiz(quizId);
        if (!loadedQuiz) {
          addToast("Quiz not found", "error");
          router.push("/");
          return;
        }
      } else {
        loadedQuiz = {
          id: crypto.randomUUID(),
          title: "New quiz",
          blocks: [],
          published: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      setQuiz(loadedQuiz);
    };

    loadQuiz();
  }, [quizId, router, addToast]);

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

  const handleDeselectBlock = () => {
    setSelectedBlockId(null);
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
      addToast("Changes are saved!", "success");
      router.push("/");
    }, 300);
  };

  const handlePublish = () => {
    if (!quiz) return;

    if (!quiz.published && quiz.blocks.length === 0) {
      addToast("Add any blocks to publish", "warning");
      return;
    }

    const updatedQuiz = {
      ...quiz,
      published: true,
      updatedAt: new Date().toISOString(),
    };

    storage.saveQuiz(updatedQuiz);
    setQuiz(updatedQuiz);
    addToast("Quiz is published!", "success");
    router.push("/");
  };

  const handleBack = () => {
    router.push("/");
  };

  const isPublished = quiz?.published;

  if (!quiz) {
    return <Loading />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-between md:hidden">
              <Button variant="secondary" onClick={handleBack}>
                ← Back to the list
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  variant="secondary"
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button onClick={handlePublish} disabled={isPublished}>
                  {isPublished ? "Published" : "Publish"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:flex-1 gap-4">
              <div className="flex items-center gap-4 flex-1">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  className="hidden md:flex"
                >
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
              <div className="hidden md:flex items-center gap-3">
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
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
          <BlockPalette />
          <Canvas
            blocks={quiz.blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onDeselectBlock={handleDeselectBlock}
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
        text: "Write your question",
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
