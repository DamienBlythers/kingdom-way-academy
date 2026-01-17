import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
    const { userId } = await auth();
    const { submissionId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { grade, feedback, status } = body;

    // Note: Add rigorous permission check here for real facilitator role

    const submission = await prisma.labSubmission.update({
      where: { id: submissionId },
      data: {
        grade,
        feedback,
        status: status || "GRADED",
        gradedAt: new Date(),
        gradedBy: userId,
      },
      include: {
        lab: true,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("[LAB_GRADE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}