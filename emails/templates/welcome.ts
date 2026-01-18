import { EMAIL_STYLES } from "../config";

interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
}

export function WelcomeEmail({ userName, userEmail }: WelcomeEmailProps) {
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
            <h1 style="${EMAIL_STYLES.headerTitle}">🎓 Kingdom Way Academy</h1>
            <p style="color: rgba(255,255,255,0.9); margin-top: 10px; font-size: 16px;">
              Transform Your Faith Through Kingdom Education
            </p>
          </div>

          <!-- Content -->
          <div style="${EMAIL_STYLES.content}">
            <h2 style="color: #1e3a8a; margin-top: 0;">Welcome, ${userName}! 👋</h2>
            
            <p style="font-size: 16px; line-height: 1.6;">
              We're thrilled to have you join Kingdom Way Academy! Your journey toward 
              Kingdom-focused transformation begins today.
            </p>

            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #1e3a8a;">
              <p style="margin: 0; font-weight: 600; color: #1e3a8a;">What's Next?</p>
              <ul style="margin: 12px 0 0 0; padding-left: 20px; line-height: 1.8;">
                <li>Explore our course catalog</li>
                <li>Complete your profile setup</li>
                <li>Start your first lesson</li>
                <li>Join our learning community</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/browse" 
                 style="${EMAIL_STYLES.button}">
                Browse Courses
              </a>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-top: 32px;">
              Need help getting started? Reply to this email or visit our 
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/support" style="color: #1e3a8a;">Help Center</a>.
            </p>
          </div>

          <!-- Footer -->
          <div style="${EMAIL_STYLES.footer}">
            <p style="margin: 0 0 10px 0;">
              <strong>Kingdom Way Academy</strong>
            </p>
            <p style="margin: 0 0 10px 0;">
              Faith-Centered Leadership Training
            </p>
            <p style="margin: 0; font-size: 12px;">
              You're receiving this because you signed up at ${process.env.NEXT_PUBLIC_APP_URL}
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
