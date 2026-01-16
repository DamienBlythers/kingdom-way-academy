import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: String; chapterId: String; lessonId: String }> }
) {
  try {
    const { userId } = await auth();
    const { courseId, chapterId, lessonId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      instructions,
      requiresText,
      requiresFileUpload,
      requiresPhoto,
      requiresVideo,
      isGraded,
      maxPoints,
      rubric,
    } = body;

    // Verify course ownership
    const course = await prisma.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get next position
    const lastLab = await prisma.kingdomLab.findFirst({
      where: { lessonId },
      orderBy: { position: "desc" },
    });

    const position = (lastLab?.position ?? 0) + 1;

    const lab = await prisma.kingdomLab.create({
      data: {
        lessonId,
        title,
        description,
        instructions,
        requiresText: requiresText ?? true,
        requiresFileUpload: requiresFileUpload ?? false,
        requiresPhoto: requiresPhoto ?? false,
        requiresVideo: requiresVideo ?? false,
        isGraded: isGraded ?? true,
        maxPoints,
        rubric,
        position,
      },
    });

    return NextResponse.json(lab);
  } catch (error) {
    console.error("[LAB_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: String }> }
) {
  try {
    const { lessonId } = await params;

    const labs = await prisma.kingdomLab.findMany({
      where: { lessonId },
      orderBy: { position: "asc" },
    });

    return NextResponse.json(labs);
  } catch (error) {
    console.error("[LABS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}