import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { generateCertificate } from "@/lib/certificate-generator";
import { resend } from "@/lib/resend";
import { certificateEmailTemplate } from "@/lib/email-templates";

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

    // Check if enrolled
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

    // Get course with chapters and lessons
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        chapters: {
          where: { isPublished: true },
          include: {
            lessons: {
              where: { isPublished: true },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if all lessons are completed
    const allLessons = course.chapters.flatMap((chapter) => chapter.lessons);
    
    if (allLessons.length === 0) {
      return NextResponse.json(
        { error: "No lessons in course" },
        { status: 400 }
      );
    }

    const userProgress = await prisma.userProgress.findMany({
      where: {
        userId: session.user.id,
        lessonId: { in: allLessons.map((l) => l.id) },
        isCompleted: true,
      },
    });

    const isCompleted = userProgress.length === allLessons.length;

    if (!isCompleted) {
      return NextResponse.json(
        { error: "Course not completed yet" },
        { status: 400 }
      );
    }

    // Check if certificate already exists
    let certificate = await prisma.certificate.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    // Create certificate if doesn't exist
    const isNewCertificate = !certificate;
    if (!certificate) {
      certificate = await prisma.certificate.create({
        data: {
          userId: session.user.id,
          courseId,
        },
      });

      // Send certificate email for NEW certificates only
      try {
        const emailContent = certificateEmailTemplate({
          userName: session.user.name || session.user.email,
          courseName: course.title,
          certificateUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${courseId}/certificate`,
        });

        await resend.emails.send({
          from: "Kingdom Way Academy <onboarding@resend.dev>",
          to: session.user.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        console.log(`📧 Certificate email sent to ${session.user.email}`);
      } catch (emailError) {
        console.error("Failed to send certificate email:", emailError);
        // Don't fail the request if email fails
      }
    }

    // Generate PDF
    const pdfBuffer = await generateCertificate({
      studentName: session.user.name || session.user.email,
      courseName: course.title,
      completionDate: certificate.issuedAt,
      certificateId: certificate.id,
    });

    // Return PDF - Convert Buffer to ArrayBuffer
    return new NextResponse(Uint8Array.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate-${course.title.replace(/\s+/g, "-")}.pdf"`,
      },
    });
  } catch (error) {
    console.error("[CERTIFICATE_GENERATION]", error);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
}
