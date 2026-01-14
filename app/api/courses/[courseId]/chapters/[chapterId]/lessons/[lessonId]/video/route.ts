import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/clerk-auth-helper";
import { prisma } from "@/lib/prisma";
import { mux } from "@/lib/mux";
import { headers } from "next/headers";

// Upload video URL to Mux
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string; lessonId: string }> }
) {
  try {
    const { courseId, chapterId, lessonId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { videoUrl } = await req.json();

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

    // Get existing lesson
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
        chapterId,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Delete old Mux asset if exists
    if (lesson.muxAssetId) {
      try {
        await mux.video.assets.delete(lesson.muxAssetId);
      } catch (error) {
        console.log("Error deleting old Mux asset:", error);
      }
    }

    // Create new Mux asset
    const asset = await mux.video.assets.create({
      inputs: [{ url: videoUrl }],
      playback_policy: ["public"],
      encoding_tier: "baseline",
    });

    // Update lesson with Mux data
    const updatedLesson = await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        videoUrl,
        muxAssetId: asset.id,
        muxPlaybackId: asset.playback_ids?.[0]?.id,
      },
    });

    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error("[LESSON_VIDEO_UPLOAD]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}

// Delete video from Mux
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string; lessonId: string }> }
) {
  try {
    const { courseId, lessonId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete from Mux
    if (lesson.muxAssetId) {
      try {
        await mux.video.assets.delete(lesson.muxAssetId);
      } catch (error) {
        console.log("Mux delete error:", error);
      }
    }

    // Clear video data
    const updatedLesson = await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        videoUrl: null,
        muxAssetId: null,
        muxPlaybackId: null,
      },
    });

    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error("[LESSON_VIDEO_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}
