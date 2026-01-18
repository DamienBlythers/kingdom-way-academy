// Email configuration
export const EMAIL_CONFIG = {
  from: "damienblythers@gmail.com",
  fromName: "Kingdom Way Academy",
  replyTo: "damienblythers@gmail.com",
  
  // When DNS propagates, update to:
  // from: "damien@kingdomwaylearning.com",
  // fromName: "Damien | Kingdom Way Academy",
  // replyTo: "damien@kingdomwaylearning.com",
};

// Email subjects
export const EMAIL_SUBJECTS = {
  welcome: "Welcome to Kingdom Way Academy! 🎓",
  paymentSuccess: "Payment Confirmed - Your Journey Begins! 💳",
  courseEnrollment: "You're Enrolled! Let's Start Learning 📚",
  lessonComplete: "Great Progress! Lesson Completed ✅",
  courseComplete: "Congratulations! Course Completed 🎉",
  certificateReady: "Your Certificate is Ready! 🏆",
  weeklyDigest: "Your Weekly Progress Report 📊",
  labSubmitted: "Lab Submitted Successfully 📝",
  labGraded: "Your Lab Has Been Graded! 📋",
};

// Base email styling
export const EMAIL_STYLES = {
  container: `
    max-width: 600px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: #1f2937;
  `,
  header: `
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    padding: 40px 20px;
    text-align: center;
    border-radius: 8px 8px 0 0;
  `,
  headerTitle: `
    color: white;
    font-size: 28px;
    font-weight: bold;
    margin: 0;
  `,
  content: `
    background: white;
    padding: 40px 30px;
    border-left: 1px solid #e5e7eb;
    border-right: 1px solid #e5e7eb;
  `,
  button: `
    display: inline-block;
    background: #1e3a8a;
    color: white;
    padding: 14px 32px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin: 20px 0;
  `,
  footer: `
    background: #f9fafb;
    padding: 30px;
    text-align: center;
    color: #6b7280;
    font-size: 14px;
    border-radius: 0 0 8px 8px;
    border: 1px solid #e5e7eb;
  `,
};
