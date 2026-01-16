import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/course-card";

export default async function BrowsePage() {
  const { userId } = await auth();

  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          lessons: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get enrollments and progress for current user
  const coursesWithProgress = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: userId!,
            courseId: course.id,
          },
        },
      });

      if (enrollment) {
        const totalLessons = course.chapters.reduce(
          (acc, chapter) => acc + chapter.lessons.length,
          0
        );

        const completedLessons = await prisma.userProgress.count({
          where: {
            userId: userId!,
            lessonId: {
              in: course.chapters.flatMap((chapter) =>
                chapter.lessons.map((lesson) => lesson.id)
              ),
            },
            isCompleted: true,
          },
        });

        return {
          ...course,
          enrollment,
          progress: {
            completedLessons,
            totalLessons,
            percentComplete: Math.round((completedLessons / totalLessons) * 100),
          },
        };
      }

      return {
        ...course,
        enrollment: null,
        progress: null,
      };
    })
  );

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Browse Courses</h1>
        <p className="text-muted-foreground">
          Explore our Kingdom-focused curriculum
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No courses available yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coursesWithProgress.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              enrollment={course.enrollment}
              progress={course.progress}
            />
          ))}
        </div>
      )}
    </div>
  );
}
