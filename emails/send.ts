import { resend } from "@/lib/resend";
import { EMAIL_CONFIG, EMAIL_SUBJECTS } from "./config";
import { WelcomeEmail } from "./templates/welcome";
import { PaymentSuccessEmail } from "./templates/payment-success";
import { CourseEnrollmentEmail } from "./templates/course-enrollment";

// Send welcome email
export async function sendWelcomeEmail(params: {
  to: string;
  userName: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
      to: params.to,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: EMAIL_SUBJECTS.welcome,
      html: WelcomeEmail({
        userName: params.userName,
        userEmail: params.to,
      }),
    });

    if (error) {
      console.error("[EMAIL] Welcome email error:", error);
      return { success: false, error };
    }

    console.log("[EMAIL] Welcome email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL] Welcome email exception:", error);
    return { success: false, error };
  }
}

// Send payment success email
export async function sendPaymentSuccessEmail(params: {
  to: string;
  userName: string;
  planName: string;
  amount: string;
  nextBillingDate: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
      to: params.to,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: EMAIL_SUBJECTS.paymentSuccess,
      html: PaymentSuccessEmail({
        userName: params.userName,
        planName: params.planName,
        amount: params.amount,
        nextBillingDate: params.nextBillingDate,
      }),
    });

    if (error) {
      console.error("[EMAIL] Payment success email error:", error);
      return { success: false, error };
    }

    console.log("[EMAIL] Payment success email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL] Payment success email exception:", error);
    return { success: false, error };
  }
}

// Send course enrollment email
export async function sendCourseEnrollmentEmail(params: {
  to: string;
  userName: string;
  courseName: string;
  courseDescription: string;
  courseId: string;
  firstLessonId: string;
  firstChapterId: string;
}) {
  const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}`;
  const firstLessonUrl = `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}/chapters/${params.firstChapterId}/lessons/${params.firstLessonId}`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
      to: params.to,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: EMAIL_SUBJECTS.courseEnrollment,
      html: CourseEnrollmentEmail({
        userName: params.userName,
        courseName: params.courseName,
        courseDescription: params.courseDescription,
        courseUrl,
        firstLessonUrl,
      }),
    });

    if (error) {
      console.error("[EMAIL] Course enrollment email error:", error);
      return { success: false, error };
    }

    console.log("[EMAIL] Course enrollment email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL] Course enrollment email exception:", error);
    return { success: false, error };
  }
}

// Send lesson completion email
export async function sendLessonCompleteEmail(params: {
  to: string;
  userName: string;
  lessonName: string;
  courseName: string;
  nextLessonUrl?: string;
  progressPercentage: number;
}) {
  // Simplified version - you can enhance this
  try {
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
      to: params.to,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: EMAIL_SUBJECTS.lessonComplete,
      html: `
        <h1>Great Progress, ${params.userName}! ✅</h1>
        <p>You've completed <strong>${params.lessonName}</strong> in <strong>${params.courseName}</strong>!</p>
        <p>Course Progress: <strong>${params.progressPercentage}%</strong></p>
        ${params.nextLessonUrl ? `<p><a href="${params.nextLessonUrl}">Continue to Next Lesson →</a></p>` : ""}
      `,
    });

    if (error) {
      console.error("[EMAIL] Lesson complete email error:", error);
      return { success: false, error };
    }

    console.log("[EMAIL] Lesson complete email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL] Lesson complete email exception:", error);
    return { success: false, error };
  }
}

// Send lab submitted email
export async function sendLabSubmittedEmail(params: {
  to: string;
  userName: string;
  labTitle: string;
  courseName: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
      to: params.to,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: EMAIL_SUBJECTS.labSubmitted,
      html: `
        <h1>Lab Submitted Successfully, ${params.userName}! 📝</h1>
        <p>Your submission for <strong>${params.labTitle}</strong> in <strong>${params.courseName}</strong> has been received.</p>
        <p>You'll receive an email notification once your instructor grades your work.</p>
      `,
    });

    if (error) {
      console.error("[EMAIL] Lab submitted email error:", error);
      return { success: false, error };
    }

    console.log("[EMAIL] Lab submitted email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL] Lab submitted email exception:", error);
    return { success: false, error };
  }
}

// Send lab graded email
export async function sendLabGradedEmail(params: {
  to: string;
  userName: string;
  labTitle: string;
  courseName: string;
  grade: number;
  feedback?: string;
  labUrl: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.from}>`,
      to: params.to,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: EMAIL_SUBJECTS.labGraded,
      html: `
        <h1>Your Lab Has Been Graded, ${params.userName}! 📋</h1>
        <p><strong>${params.labTitle}</strong> in <strong>${params.courseName}</strong></p>
        <p>Grade: <strong>${params.grade}%</strong></p>
        ${params.feedback ? `<p>Feedback: ${params.feedback}</p>` : ""}
        <p><a href="${params.labUrl}">View Full Results →</a></p>
      `,
    });

    if (error) {
      console.error("[EMAIL] Lab graded email error:", error);
      return { success: false, error };
    }

    console.log("[EMAIL] Lab graded email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL] Lab graded email exception:", error);
    return { success: false, error };
  }
}
