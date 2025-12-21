"use client";

import { useEffect, useState } from "react";
import { Chapter, Lesson } from "@prisma/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ChapterItem } from "./chapter-item";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ChapterWithLessons = Chapter & {
  lessons: Lesson[];
};

interface ChaptersListProps {
  items: ChapterWithLessons[];
  courseId: string;
}

export function ChaptersList({ items, courseId }: ChaptersListProps) {
  const [chapters, setChapters] = useState(items);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = chapters.findIndex((chapter) => chapter.id === active.id);
    const newIndex = chapters.findIndex((chapter) => chapter.id === over.id);

    const newChapters = arrayMove(chapters, oldIndex, newIndex);
    setChapters(newChapters);

    // Update positions in database
    const bulkUpdateData = newChapters.map((chapter, index) => ({
      id: chapter.id,
      position: index + 1,
    }));

    try {
      await fetch(`/api/courses/${courseId}/chapters/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ list: bulkUpdateData }),
      });

      toast.success("Chapters reordered");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      setChapters(items); // Revert on error
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={chapters.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {chapters.map((chapter) => (
            <ChapterItem key={chapter.id} chapter={chapter} courseId={courseId} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
