import { EMAIL_STYLES } from "../config";

interface PaymentSuccessEmailProps {
  userName: string;
  planName: string;
  amount: string;
  nextBillingDate: string;
}

export function PaymentSuccessEmail({
  userName,
  planName,
  amount,
  nextBillingDate,
}: PaymentSuccessEmailProps) {
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
            <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
            <h1 style="${EMAIL_STYLES.headerTitle}">Payment Confirmed!</h1>
          </div>

          <!-- Content -->
          <div style="${EMAIL_STYLES.content}">
            <h2 style="color: #1e3a8a; margin-top: 0;">Thank you, ${userName}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Your payment has been processed successfully. You now have full access 
              to all Kingdom Way Academy features!
            </p>

            <!-- Subscription Details -->
            <div style="background: #f9fafb; padding: 24px; border-radius: 8px; margin: 24px 0; border: 1px solid #e5e7eb;">
              <h3 style="margin-top: 0; color: #374151;">Subscription Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Plan:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600;">${planName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Amount:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600;">${amount}/month</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Next Billing:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600;">${nextBillingDate}</td>
                </tr>
              </table>
            </div>

            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #1e3a8a;">
              <p style="margin: 0; font-weight: 600; color: #1e3a8a;">Your Benefits Include:</p>
              <ul style="margin: 12px 0 0 0; padding-left: 20px; line-height: 1.8;">
                <li>Unlimited course access</li>
                <li>Kingdom Labs assignments</li>
                <li>Completion certificates</li>
                <li>Priority support</li>
                <li>Community access</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="${EMAIL_STYLES.button}">
                Go to Dashboard
              </a>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-top: 32px;">
              Manage your subscription anytime in your 
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color: #1e3a8a;">account settings</a>.
            </p>
          </div>

          <!-- Footer -->
          <div style="${EMAIL_STYLES.footer}">
            <p style="margin: 0 0 10px 0;">
              <strong>Kingdom Way Academy</strong>
            </p>
            <p style="margin: 0; font-size: 12px;">
              Need help? Reply to this email or visit our support center.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
