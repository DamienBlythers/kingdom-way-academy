import { redirect } from "next/navigation";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonVideoForm } from "../../_components/lesson-video-form";
import { LabsSection } from "./_components/labs-section";

interface LessonEditPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
    lessonId: string;
  }>;
}

export default async function LessonEditPage({ params }: LessonEditPageProps) {
  const { courseId, chapterId, lessonId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Verify course ownership
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: session.user.id,
    },
  });

  if (!course) {
    redirect("/admin/courses");
  }

  // Get lesson with Kingdom Labs
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      chapterId,
    },
    include: {
      kingdomLabs: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!lesson) {
    redirect(`/admin/courses/${courseId}/chapters/${chapterId}`);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="w-full">
          <Link href={`/admin/courses/${courseId}/chapters/${chapterId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to chapter
            </Button>
          </Link>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Lesson Setup</h1>
              <span className="text-sm text-muted-foreground">
                {lesson.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <LessonVideoForm
          initialData={lesson}
          courseId={courseId}
          chapterId={chapterId}
        />

        <LabsSection
          lessonId={lessonId}
          courseId={courseId}
          chapterId={chapterId}
          initialLabs={lesson.kingdomLabs}
        />
      </div>
    </div>
  );
}
