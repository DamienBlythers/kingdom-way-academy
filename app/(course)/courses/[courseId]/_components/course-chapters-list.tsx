import { Chapter, Lesson } from "@prisma/client";
import { ChevronRight, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";

type ChapterWithLessons = Chapter & {
  lessons: Lesson[];
};

interface CourseChaptersListProps {
  chapters: ChapterWithLessons[];
  courseId: string;
  isEnrolled: boolean;
}

export function CourseChaptersList({
  chapters,
  courseId,
  isEnrolled,
}: CourseChaptersListProps) {
  return (
    <div className="space-y-4">
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="border rounded-lg p-4 hover:shadow-sm transition"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{chapter.title}</h3>
            {chapter.isFree && (
              <span className="text-xs bg-green-200 dark:bg-green-900 px-2 py-1 rounded">
                FREE
              </span>
            )}
          </div>

          {chapter.description && (
            <p className="text-sm text-muted-foreground mb-3">
              {chapter.description}
            </p>
          )}

          <div className="space-y-2">
            {chapter.lessons.map((lesson) => {
              const isLocked = !isEnrolled && !chapter.isFree;

              return (
                <div
                  key={lesson.id}
                  className="flex items-center gap-x-2 text-sm"
                >
                  {isLocked ? (
                    <>
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{lesson.title}</span>
                    </>
                  ) : (
                    <Link
                      href={`/courses/${courseId}/chapters/${chapter.id}/lessons/${lesson.id}`}
                      className="flex items-center gap-x-2 hover:text-sky-700 transition"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{lesson.title}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs text-muted-foreground mt-3">
            {chapter.lessons.length}{" "}
            {chapter.lessons.length === 1 ? "lesson" : "lessons"}
          </div>
        </div>
      ))}
    </div>
  );
}
