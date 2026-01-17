import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ labId: string }> }
) {
  try {
    const { userId } = await auth();
    const { labId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { textResponse, fileUrls, photoUrls, videoUrl } = body;

    // Check if submission exists
    const existingSubmission = await prisma.labSubmission.findUnique({
      where: {
        labId_userId: {
          labId,
          userId,
        },
      },
    });

    let submission;

    if (existingSubmission) {
      // Update existing
      submission = await prisma.labSubmission.update({
        where: { id: existingSubmission.id },
        data: {
          textResponse,
          fileUrls: fileUrls || [],
          photoUrls: photoUrls || [],
          videoUrl,
          status: "SUBMITTED",
          submittedAt: new Date(),
        },
      });
    } else {
      // Create new
      submission = await prisma.labSubmission.create({
        data: {
          labId,
          userId,
          textResponse,
          fileUrls: fileUrls || [],
          photoUrls: photoUrls || [],
          videoUrl,
          status: "SUBMITTED",
          submittedAt: new Date(),
        },
      });
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("[LAB_SUBMIT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}