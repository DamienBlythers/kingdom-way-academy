interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
}

export function welcomeEmailTemplate({ userName, userEmail }: WelcomeEmailProps) {
  return {
    from: "Kingdom Way Academy <onboarding@resend.dev>",
    subject: "Welcome to Kingdom Way Academy! 🎓",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to Kingdom Way Academy! 🎓</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #1e40af; margin-top: 0;">Hello ${userName || userEmail}!</p>
            
            <p style="font-size: 16px;">We're thrilled to have you join our learning community. Get ready to embark on an amazing educational journey!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h3 style="margin-top: 0; color: #1e40af;">What's Next?</h3>
              <ul style="padding-left: 20px;">
                <li>Browse our course catalog</li>
                <li>Enroll in courses that interest you</li>
                <li>Start learning at your own pace</li>
                <li>Earn certificates upon completion</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/browse" style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Browse Courses</a>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              If you have any questions, feel free to reach out to our support team.
            </p>
            
            <p style="color: #64748b; font-size: 14px;">
              Best regards,<br>
              <strong>The Kingdom Way Academy Team</strong>
            </p>
          </div>
        </body>
      </html>
    `,
  };
}

interface EnrollmentEmailProps {
  userName: string;
  courseName: string;
  courseUrl: string;
}

export function enrollmentEmailTemplate({ userName, courseName, courseUrl }: EnrollmentEmailProps) {
  return {
    from: "Kingdom Way Academy <onboarding@resend.dev>",
    subject: `You're enrolled in ${courseName}! 🎉`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Enrollment Confirmed! 🎉</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #059669; margin-top: 0;">Congratulations ${userName}!</p>
            
            <p style="font-size: 16px;">You're now enrolled in:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h2 style="margin: 0; color: #1e40af; font-size: 24px;">${courseName}</h2>
            </div>
            
            <p style="font-size: 16px;">Your learning journey starts now! Access your course anytime and learn at your own pace.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${courseUrl}" style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Start Learning</a>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">📚 Study Tips:</h3>
              <ul style="padding-left: 20px;">
                <li>Set aside dedicated learning time each day</li>
                <li>Take notes as you progress through lessons</li>
                <li>Complete all lessons to earn your certificate</li>
              </ul>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              Need help? Contact our support team anytime.
            </p>
            
            <p style="color: #64748b; font-size: 14px;">
              Happy learning!<br>
              <strong>The Kingdom Way Academy Team</strong>
            </p>
          </div>
        </body>
      </html>
    `,
  };
}

interface CertificateEmailProps {
  userName: string;
  courseName: string;
  certificateUrl: string;
}

export function certificateEmailTemplate({ userName, courseName, certificateUrl }: CertificateEmailProps) {
  return {
    from: "Kingdom Way Academy <onboarding@resend.dev>",
    subject: `🏆 Congratulations! You've earned a certificate!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <div style="font-size: 64px; margin-bottom: 10px;">🏆</div>
            <h1 style="color: white; margin: 0; font-size: 32px;">Certificate Earned!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #d97706; margin-top: 0;">Amazing achievement, ${userName}!</p>
            
            <p style="font-size: 16px;">Congratulations on successfully completing:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h2 style="margin: 0; color: #1e40af; font-size: 24px;">${courseName}</h2>
            </div>
            
            <p style="font-size: 16px;">Your certificate is ready! Download it now and share your accomplishment with the world.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${certificateUrl}" style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Download Certificate</a>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">🎓 What's Next?</h3>
              <ul style="padding-left: 20px;">
                <li>Add your certificate to LinkedIn</li>
                <li>Share your achievement on social media</li>
                <li>Explore more courses to continue learning</li>
              </ul>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              Keep up the great work!
            </p>
            
            <p style="color: #64748b; font-size: 14px;">
              Proud of you!<br>
              <strong>The Kingdom Way Academy Team</strong>
            </p>
          </div>
        </body>
      </html>
    `,
  };
}
