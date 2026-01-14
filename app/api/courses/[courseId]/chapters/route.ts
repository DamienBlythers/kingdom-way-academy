import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
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

    // Get the last chapter's position
    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    // Create the chapter
    const chapter = await prisma.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[CHAPTERS]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chapters = await prisma.chapter.findMany({
      where: {
        courseId,
      },
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
    });

    return NextResponse.json(chapters);
  } catch (error) {
    console.error("[CHAPTERS_GET]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}
