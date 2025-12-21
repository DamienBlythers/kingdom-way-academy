"use client";

import { useState } from "react";
import { Course, Chapter, Lesson } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ChapterCreateForm } from "./chapter-create-form";
import { ChaptersList } from "./chapters-list";

type CourseWithChapters = Course & {
  chapters: (Chapter & {
    lessons: Lesson[];
  })[];
};

interface ChaptersFormProps {
  initialData: CourseWithChapters;
  courseId: string;
}

export function ChaptersForm({ initialData, courseId }: ChaptersFormProps) {
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  return (
    <div className="border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-4">
        Course Chapters
        <Button onClick={toggleCreating} variant="ghost" size="sm">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <ChapterCreateForm
          courseId={courseId}
          onSuccess={() => setIsCreating(false)}
        />
      )}

      {!isCreating && initialData.chapters.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No chapters yet</p>
      )}

      {!isCreating && initialData.chapters.length > 0 && (
        <>
          <ChaptersList items={initialData.chapters} courseId={courseId} />
          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
          </p>
        </>
      )}
    </div>
  );
}
