"use client";

import { Chapter, Lesson } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ChapterWithLessons = Chapter & {
  lessons: Lesson[];
};

interface ChapterItemProps {
  chapter: ChapterWithLessons;
  courseId: string;
}

export function ChapterItem({ chapter, courseId }: ChapterItemProps) {
  const router = useRouter();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    router.push(`/admin/courses/${courseId}/chapters/${chapter.id}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-x-2 bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md p-3",
        isDragging && "opacity-50"
      )}
    >
      <div
        className="cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <span className="text-sm font-medium flex-1">{chapter.title}</span>

      <div className="flex items-center gap-x-2">
        {chapter.isFree && <Badge>Free</Badge>}
        <Badge
          className={cn(
            "bg-slate-500",
            chapter.isPublished && "bg-green-700"
          )}
        >
          {chapter.isPublished ? "Published" : "Draft"}
        </Badge>

        <span className="text-xs text-muted-foreground">
          {chapter.lessons.length} lessons
        </span>

        <Pencil
          onClick={handleEdit}
          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
        />
      </div>
    </div>
  );
}
