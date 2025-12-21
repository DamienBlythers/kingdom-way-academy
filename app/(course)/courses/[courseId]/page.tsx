import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnrollButton } from "./_components/enroll-button";
import { CourseChaptersList } from "./_components/course-chapters-list";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
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
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    redirect("/browse");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <Link href="/browse">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse Courses
        </Button>
      </Link>

      {/* Course Header */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {course.imageUrl && (
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">
              ${course.price?.toFixed(2) || "0.00"}
            </p>
            <EnrollButton
              courseId={course.id}
              isEnrolled={!!enrollment}
              price={course.price || 0}
            />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
        <CourseChaptersList
          chapters={course.chapters}
          courseId={course.id}
          isEnrolled={!!enrollment}
        />
      </div>
    </div>
  );
}
