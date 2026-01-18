import { EMAIL_STYLES } from "../config";

interface CourseEnrollmentEmailProps {
  userName: string;
  courseName: string;
  courseDescription: string;
  courseUrl: string;
  firstLessonUrl: string;
}

export function CourseEnrollmentEmail({
  userName,
  courseName,
  courseDescription,
  courseUrl,
  firstLessonUrl,
}: CourseEnrollmentEmailProps) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f3f4f6;">
        <div style="${EMAIL_STYLES.container}">
          <!-- Header -->
          <div style="${EMAIL_STYLES.header}">
            <div style="font-size: 48px; margin-bottom: 10px;">📚</div>
            <h1 style="${EMAIL_STYLES.headerTitle}">You're Enrolled!</h1>
          </div>

          <!-- Content -->
          <div style="${EMAIL_STYLES.content}">
            <h2 style="color: #1e3a8a; margin-top: 0;">Welcome to ${courseName}, ${userName}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6;">
              You've successfully enrolled in <strong>${courseName}</strong>. 
              Your transformational journey starts now!
            </p>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #e5e7eb;">
              <h3 style="margin-top: 0; color: #374151;">About This Course</h3>
              <p style="margin: 0; color: #6b7280; line-height: 1.6;">
                ${courseDescription}
              </p>
            </div>

            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #16a34a;">
              <p style="margin: 0; font-weight: 600; color: #166534;">💡 Pro Tips:</p>
              <ul style="margin: 12px 0 0 0; padding-left: 20px; line-height: 1.8; color: #166534;">
                <li>Set aside dedicated learning time each day</li>
                <li>Complete lessons in order for best results</li>
                <li>Submit Kingdom Labs for feedback</li>
                <li>Engage with the community</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="${firstLessonUrl}" 
                 style="${EMAIL_STYLES.button}">
                Start First Lesson
              </a>
              <br>
              <a href="${courseUrl}" 
                 style="color: #1e3a8a; text-decoration: none; font-size: 14px; margin-top: 12px; display: inline-block;">
                View Full Course →
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="${EMAIL_STYLES.footer}">
            <p style="margin: 0 0 10px 0;">
              <strong>Kingdom Way Academy</strong>
            </p>
            <p style="margin: 0; font-size: 12px;">
              Track your progress in your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color: #1e3a8a;">dashboard</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
