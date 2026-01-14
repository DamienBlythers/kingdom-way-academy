import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      courseId: string;
      chapterId: string;
      lessonId: string;
    }>;
  }
) {
  try {
    const { courseId, lessonId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: session.user.id,
      },
    });

    if (!courseOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lesson = await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("[LESSON_PUBLISH]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
