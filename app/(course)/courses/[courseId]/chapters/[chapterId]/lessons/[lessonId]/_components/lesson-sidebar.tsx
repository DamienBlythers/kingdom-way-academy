"use client";

import { Course, Chapter, Lesson } from "@prisma/client";
import { ChevronRight, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

type CourseWithChapters = Course & {
  chapters: (Chapter & {
    lessons: Lesson[];
  })[];
};

interface LessonSidebarProps {
  course: CourseWithChapters;
  currentLessonId: string;
  currentChapterId: string;
}

export function LessonSidebar({
  course,
  currentLessonId,
  currentChapterId,
}: LessonSidebarProps) {
  const params = useParams();

  return (
    <div className="h-full overflow-y-auto border-l flex flex-col">
      {/* Course Title */}
      <div className="p-4 border-b">
        <h2 className="font-semibold line-clamp-2">{course.title}</h2>
      </div>

      {/* Chapters & Lessons */}
      <div className="flex-1 overflow-y-auto">
        {course.chapters.map((chapter) => (
          <div key={chapter.id} className="border-b">
            <div className="p-4 bg-slate-50 dark:bg-slate-900">
              <h3 className="font-medium text-sm">{chapter.title}</h3>
            </div>
            <div>
              {chapter.lessons.map((lesson) => {
                const isActive = lesson.id === currentLessonId;

                return (
                  <Link
                    key={lesson.id}
                    href={`/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`}
                    className={cn(
                      "flex items-center gap-x-2 text-sm p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition",
                      isActive && "bg-slate-200 dark:bg-slate-700"
                    )}
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span className="flex-1 line-clamp-1">{lesson.title}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
