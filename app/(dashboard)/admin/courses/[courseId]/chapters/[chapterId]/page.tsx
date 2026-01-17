import { redirect } from "next/navigation";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Banner } from "@/components/ui/banner";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { LessonsForm } from "./_components/lessons-form";
import { ChapterActions } from "./_components/chapter-actions";

interface ChapterPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { courseId, chapterId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // Verify course ownership
  const courseOwner = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: session.user.id,
    },
  });

  if (!courseOwner) {
    redirect("/admin/courses");
  }

  // Get chapter with lessons
  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      lessons: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!chapter) {
    redirect("/admin/courses");
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-full">
            <Link href={`/admin/courses/${courseId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </Button>
            </Link>
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Setup</h1>
                <span className="text-sm text-muted-foreground">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2 mb-4">
                <LayoutDashboard className="h-5 w-5" />
                <h2 className="text-lg font-semibold">
                  Customize your chapter
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapter.id}
              />
              <div className="mt-4">
                <ChapterDescriptionForm
                  initialData={chapter}
                  courseId={courseId}
                  chapterId={chapter.id}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Chapter settings
              </h2>
              <ChapterAccessForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapter.id}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Lessons
              </h2>
              <LessonsForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapter.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}