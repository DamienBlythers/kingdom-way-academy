import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function PUT(
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

    const { isCompleted } = await req.json();

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
    }

    // Upsert progress
    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId: session.user.id,
        lessonId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error("[LESSON_PROGRESS]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}
