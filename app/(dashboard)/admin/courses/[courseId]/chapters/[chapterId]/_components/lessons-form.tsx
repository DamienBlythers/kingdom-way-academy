"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chapter, Lesson } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { LessonItem } from "./lesson-item";
import { LessonCreateForm } from "./lesson-create-form";

interface LessonsFormProps {
  initialData: Chapter & { lessons: Lesson[] };
  courseId: string;
  chapterId: string;
}

export function LessonsForm({
  initialData,
  courseId,
  chapterId,
}: LessonsFormProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  async function onReorder(updateData: { id: string; position: number }[]) {
    try {
      setIsUpdating(true);

      await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}/lessons/reorder`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ list: updateData }),
        }
      );

      toast.success("Lessons reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }

async function onPublish(lessonId: string, isPublished: boolean) {
  try {
    // If currently published, we want to unpublish (and vice versa)
    const endpoint = isPublished ? "unpublish" : "publish";
    await fetch(
      `/api/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}/${endpoint}`,
      {
        method: "PATCH",
      }
    );

    toast.success(isPublished ? "Lesson unpublished" : "Lesson published");
    router.refresh();
  } catch {
    toast.error("Something went wrong");
  }
}

  async function onDelete(lessonId: string) {
    try {
      await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
        {
          method: "DELETE",
        }
      );

      toast.success("Lesson deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = initialData.lessons.findIndex((l) => l.id === active.id);
      const newIndex = initialData.lessons.findIndex((l) => l.id === over.id);

      const newLessons = [...initialData.lessons];
      const [moved] = newLessons.splice(oldIndex, 1);
      newLessons.splice(newIndex, 0, moved);

      const updateData = newLessons.map((lesson, index) => ({
        id: lesson.id,
        position: index + 1,
      }));

      onReorder(updateData);
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Course Lessons</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a lesson
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <LessonCreateForm
          courseId={courseId}
          chapterId={chapterId}
          onSuccess={() => setIsCreating(false)}
        />
      )}

      {!isCreating && initialData.lessons.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No lessons yet</p>
      )}

      {!isCreating && initialData.lessons.length > 0 && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={initialData.lessons.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {initialData.lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  courseId={courseId}
                  chapterId={chapterId}
                  onPublish={onPublish}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {!isCreating && initialData.lessons.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the lessons
        </p>
      )}
    </div>
  );
}
