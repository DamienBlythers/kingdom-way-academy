import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { courseId, chapterId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    // Verify course ownership
    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: session.user.id,
      },
    });

    if (!courseOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the last lesson's position
    const lastLesson = await prisma.lesson.findFirst({
      where: {
        chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastLesson ? lastLesson.position + 1 : 1;

    // Create the lesson
    const lesson = await prisma.lesson.create({
      data: {
        title,
        chapterId,
        position: newPosition,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("[LESSONS]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}
