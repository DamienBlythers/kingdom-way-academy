import { redirect } from "next/navigation";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { CourseCard } from "./_components/course-card";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Get user's enrollments with course details and progress
  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: {
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
                include: {
                  userProgress: {
                    where: {
                      userId: session.user.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate progress for each course
  const coursesWithProgress = enrollments.map((enrollment) => {
    const course = enrollment.course;

    // Get all lessons in the course
    const allLessons = course.chapters.flatMap((chapter) => chapter.lessons);

    // Count completed lessons
    const completedLessons = allLessons.filter(
      (lesson) =>
        lesson.userProgress.length > 0 && lesson.userProgress[0].isCompleted
    );

    const progressPercentage =
      allLessons.length > 0
        ? Math.round((completedLessons.length / allLessons.length) * 100)
        : 0;

    return {
      id: course.id,
      title: course.title,
      imageUrl: course.imageUrl,
      chaptersCount: course.chapters.length,
      lessonsCount: allLessons.length,
      completedLessons: completedLessons.length,
      progressPercentage,
    };
  });

  // Calculate overall stats
  const totalCourses = coursesWithProgress.length;
  const totalLessons = coursesWithProgress.reduce(
    (acc, course) => acc + course.lessonsCount,
    0
  );
  const totalCompleted = coursesWithProgress.reduce(
    (acc, course) => acc + course.completedLessons,
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Learning Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {session.user.email}!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Enrolled Courses</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{totalCourses}</p>
        </div>

        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Total Lessons</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{totalLessons}</p>
        </div>

        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Completed Lessons</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{totalCompleted}</p>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">My Courses</h2>

        {coursesWithProgress.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              You haven&apos;t enrolled in any courses yet.
            </p>
            <a
              href="/browse"
              className="text-blue-600 hover:underline font-medium"
            >
              Browse available courses →
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesWithProgress.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
