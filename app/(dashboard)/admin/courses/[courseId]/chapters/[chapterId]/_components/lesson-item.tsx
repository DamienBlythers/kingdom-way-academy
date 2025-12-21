"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lesson } from "@prisma/client";
import { GripVertical, CheckCircle, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface LessonItemProps {
  lesson: Lesson;
  courseId: string;
  chapterId: string;
  onPublish: (lessonId: string, isPublished: boolean) => void;
  onDelete: (lessonId: string) => void;
}

export function LessonItem({
  lesson,
  courseId,
  chapterId,
  onPublish,
  onDelete,
}: LessonItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border rounded-md p-3",
        lesson.isPublished && "bg-sky-100 dark:bg-sky-900/20 border-sky-200 dark:border-sky-900"
      )}
    >
      <div
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <Link 
        href={`/admin/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}`}
        className="flex-1 hover:underline"
      >
        <span className="text-sm">{lesson.title}</span>
      </Link>

      {lesson.isPublished && (
        <CheckCircle className="h-4 w-4 text-sky-700" />
      )}

      <div className="flex items-center gap-2 ml-auto">
        {lesson.isFree && (
          <Badge variant="secondary">Free</Badge>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onPublish(lesson.id, lesson.isPublished)}>
              {lesson.isPublished ? "Unpublish" : "Publish"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(lesson.id)} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
