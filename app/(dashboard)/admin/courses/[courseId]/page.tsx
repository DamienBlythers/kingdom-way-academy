import { redirect } from "next/navigation";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { CourseEditTabs } from "./_components/course-edit-tabs";
import { CourseActions } from "./_components/course-actions";
import { Banner } from "@/components/ui/banner";

interface CourseEditPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseEditPage({ params }: CourseEditPageProps) {
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
      userId: session.user.id,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
        include: {
          lessons: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!course) {
    redirect("/admin/courses");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `Complete all fields (${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-muted-foreground">
              {completionText}
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            courseId={course.id}
            isPublished={course.isPublished}
          />
        </div>

        <CourseEditTabs course={course} />
      </div>
    </>
  );
}
