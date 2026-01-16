import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { Course, Chapter, Lesson, Enrollment } from "@prisma/client";

interface CourseCardProps {
  course: Course & {
    chapters: (Chapter & {
      lessons: Lesson[];
    })[];
  };
  enrollment?: Enrollment | null;
  progress?: {
    completedLessons: number;
    totalLessons: number;
    percentComplete: number;
  } | null;
}

export function CourseCard({ course, enrollment, progress }: CourseCardProps) {
  const isEnrolled = !!enrollment;
  const totalLessons = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
    >
      {/* Course Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-blue-50">
            <BookOpen className="h-16 w-16 text-blue-300" />
          </div>
        )}
        
        {/* Enrollment Badge */}
        {isEnrolled && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <CheckCircle className="h-3 w-3" />
            Enrolled
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 mb-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {course.description || "Expand your Kingdom knowledge"}
        </p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.chapters.length} Chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{totalLessons} Lessons</span>
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {isEnrolled && progress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span className="font-semibold">{progress.percentComplete}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress.percentComplete}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {progress.completedLessons} of {progress.totalLessons} lessons complete
            </div>
          </div>
        )}

        {/* Price or Access Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {isEnrolled ? (
            <span className="text-sm font-semibold text-blue-900">
              Continue Learning →
            </span>
          ) : (
            <>
              <span className="text-2xl font-bold text-blue-900">
                ${course.price?.toFixed(2) || "0.00"}
              </span>
              <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-900 transition">
                Enroll Now →
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
