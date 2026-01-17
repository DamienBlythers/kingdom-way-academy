import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Kingdom Way Academy database seed...');

  console.log('⚠️  NOTE: This seed uses the email-based User model.');
  console.log('📝 After seeding, you can sign in with Clerk and courses will be associated with your Clerk user ID.');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Clearing existing data...');
  await prisma.labSubmission.deleteMany();
  await prisma.kingdomLab.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.course.deleteMany();

  console.log('✅ Existing data cleared!');

  // Note: We'll use a placeholder userId - replace with your actual Clerk ID after first login
  // In production, courses should be created by admin users through the UI
  const PLACEHOLDER_USER_ID = 'user_admin_placeholder';

  // Create Course 1: Kingdom Identity Foundations
  console.log('📚 Creating Course 1: Kingdom Identity Foundations...');
  const course1 = await prisma.course.create({
    data: {
      userId: PLACEHOLDER_USER_ID,
      title: 'Kingdom Identity Foundations',
      description: 'Discover who you are in Christ and walk in your God-given identity. This transformational course will help you understand your position, authority, and purpose in the Kingdom of God.',
      imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334',
      price: 49.99,
      isPublished: true,
    },
  });

  // Chapter 1 for Course 1
  const course1Chapter1 = await prisma.chapter.create({
    data: {
      courseId: course1.id,
      title: 'Understanding Your Identity in Christ',
      description: 'Learn the foundational truths about who God says you are.',
      position: 1,
      isPublished: true,
      isFree: true, // First chapter is free
    },
  });

  // Lessons for Course 1, Chapter 1
  const course1Ch1Lesson1 = await prisma.lesson.create({
    data: {
      chapterId: course1Chapter1.id,
      title: 'Who God Says You Are',
      description: 'Explore the biblical foundations of your identity as a child of God.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 1,
      isPublished: true,
      isFree: true,
    },
  });

  // Kingdom Lab for Course 1, Chapter 1, Lesson 1
  await prisma.kingdomLab.create({
    data: {
      lessonId: course1Ch1Lesson1.id,
      title: 'Identity Declaration Exercise',
      description: 'Write out your personal identity statements based on Scripture.',
      instructions: `
# Kingdom Identity Declaration

## Instructions:
1. Read through the following scriptures about your identity in Christ
2. Write a personal declaration statement for each one
3. Record yourself speaking these declarations
4. Share one breakthrough or realization you had during this exercise

## Scriptures to Meditate On:
- 2 Corinthians 5:17 - You are a new creation
- Ephesians 2:10 - You are God's workmanship
- 1 Peter 2:9 - You are a chosen people, a royal priesthood
- Romans 8:37 - You are more than a conqueror
- Philippians 4:13 - You can do all things through Christ

## Your Task:
Write at least 5 identity declarations and submit them below.
      `,
      requiresText: true,
      requiresFileUpload: false,
      requiresPhoto: false,
      requiresVideo: true,
      isGraded: true,
      maxPoints: 100,
      position: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      chapterId: course1Chapter1.id,
      title: 'Breaking Free from False Identities',
      description: 'Identify and renounce false identities that have held you back.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 2,
      isPublished: true,
      isFree: false,
    },
  });

  await prisma.lesson.create({
    data: {
      chapterId: course1Chapter1.id,
      title: 'Walking in Your New Identity',
      description: 'Practical steps to live out your Kingdom identity daily.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 3,
      isPublished: true,
      isFree: false,
    },
  });

  // Chapter 2 for Course 1
  const course1Chapter2 = await prisma.chapter.create({
    data: {
      courseId: course1.id,
      title: 'Kingdom Authority & Power',
      description: 'Understand and exercise the authority given to you in Christ.',
      position: 2,
      isPublished: true,
      isFree: false,
    },
  });

  const course1Ch2Lesson1 = await prisma.lesson.create({
    data: {
      chapterId: course1Chapter2.id,
      title: 'Understanding Spiritual Authority',
      description: 'Biblical foundations of authority in the Kingdom.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 1,
      isPublished: true,
      isFree: false,
    },
  });

  // Kingdom Lab for Course 1, Chapter 2, Lesson 1
  await prisma.kingdomLab.create({
    data: {
      lessonId: course1Ch2Lesson1.id,
      title: 'Authority Application Assignment',
      description: 'Apply Kingdom authority in a real-life situation.',
      instructions: `
# Exercising Kingdom Authority

## Your Mission:
This week, you will identify one area of your life where you need to exercise Kingdom authority and document your experience.

## Steps:
1. **Identify**: What situation, relationship, or circumstance needs Kingdom authority?
2. **Pray**: Ask God to show you how to exercise authority in this area
3. **Act**: Take one bold step of faith using the authority Christ gave you
4. **Document**: Write about what happened

## What to Submit:
- A written reflection (300-500 words) on your experience
- What you learned about authority
- What changed as a result
- A testimony video (1-2 minutes) sharing your breakthrough

## Grading Criteria:
- Authenticity and vulnerability (40 points)
- Biblical application (30 points)
- Evidence of transformation (30 points)
      `,
      requiresText: true,
      requiresFileUpload: false,
      requiresPhoto: false,
      requiresVideo: true,
      isGraded: true,
      maxPoints: 100,
      position: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      chapterId: course1Chapter2.id,
      title: 'Defeating the Enemy',
      description: 'Learn how to use your authority to overcome spiritual opposition.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 2,
      isPublished: true,
      isFree: false,
    },
  });

  console.log('✅ Course 1 created with 2 chapters, 5 lessons, and 2 Kingdom Labs!');

  // Create Course 2: Kingdom Finances & Stewardship
  console.log('📚 Creating Course 2: Kingdom Finances & Stewardship...');
  const course2 = await prisma.course.create({
    data: {
      userId: PLACEHOLDER_USER_ID,
      title: 'Kingdom Finances & Stewardship',
      description: 'Learn God\'s principles for managing money, building wealth, and becoming a generous giver. Transform your relationship with finances through Kingdom principles.',
      imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',
      price: 79.99,
      isPublished: true,
    },
  });

  const course2Chapter1 = await prisma.chapter.create({
    data: {
      courseId: course2.id,
      title: 'Kingdom Mindset About Money',
      description: 'Renew your mind about finances and wealth.',
      position: 1,
      isPublished: true,
      isFree: true,
    },
  });

  const course2Ch1Lesson1 = await prisma.lesson.create({
    data: {
      chapterId: course2Chapter1.id,
      title: 'God\'s View of Wealth',
      description: 'Understanding biblical prosperity and abundance.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 1,
      isPublished: true,
      isFree: true,
    },
  });

  // Kingdom Lab for Course 2
  await prisma.kingdomLab.create({
    data: {
      lessonId: course2Ch1Lesson1.id,
      title: 'Financial Freedom Blueprint',
      description: 'Create your personalized Kingdom financial plan.',
      instructions: `
# Your 90-Day Financial Freedom Blueprint

## Assignment Overview:
You will create a complete financial plan based on Kingdom principles and track your progress for 90 days.

## Part 1: Current Financial Assessment
- List all income sources
- List all expenses
- Calculate your debt-to-income ratio
- Identify financial strongholds or patterns

## Part 2: Kingdom Financial Plan
Create a plan that includes:
1. **Giving Plan**: How will you honor God with your firstfruits?
2. **Debt Elimination Strategy**: What debts will you tackle first?
3. **Savings Goals**: Emergency fund, investments, future goals
4. **Spending Boundaries**: Budget categories and limits
5. **Faith Goals**: One financial faith stretch goal

## Part 3: 90-Day Tracking
- Upload your plan as a PDF
- Share weekly updates in the community
- Record a testimony video at day 30, 60, and 90

## Submission Requirements:
- Your complete financial blueprint (PDF)
- Weekly progress photos or screenshots
- Final testimony video showing transformation
      `,
      requiresText: true,
      requiresFileUpload: true,
      requiresPhoto: true,
      requiresVideo: true,
      isGraded: true,
      maxPoints: 150,
      position: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      chapterId: course2Chapter1.id,
      title: 'Breaking Poverty Mindsets',
      description: 'Identify and overcome limiting beliefs about money.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 2,
      isPublished: true,
      isFree: false,
    },
  });

  await prisma.lesson.create({
    data: {
      chapterId: course2Chapter1.id,
      title: 'The Generosity Principle',
      description: 'How giving unlocks Kingdom abundance.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 3,
      isPublished: true,
      isFree: false,
    },
  });

  console.log('✅ Course 2 created with 1 chapter, 3 lessons, and 1 Kingdom Lab!');

  // Create Course 3: Kingdom Relationships (Draft)
  console.log('📚 Creating Course 3: Kingdom Relationships (Draft)...');
  const course3 = await prisma.course.create({
    data: {
      userId: PLACEHOLDER_USER_ID,
      title: 'Kingdom Relationships: Love, Forgiveness & Unity',
      description: 'Build healthy, Kingdom-centered relationships that reflect Christ\'s love. Learn forgiveness, conflict resolution, and how to walk in unity. (Coming Soon)',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
      price: 59.99,
      isPublished: false, // This is a draft course
    },
  });

  const course3Chapter1 = await prisma.chapter.create({
    data: {
      courseId: course3.id,
      title: 'The Foundation of Kingdom Love',
      description: 'Understanding agape love and how it transforms relationships.',
      position: 1,
      isPublished: false,
      isFree: false,
    },
  });

  await prisma.lesson.create({
    data: {
      chapterId: course3Chapter1.id,
      title: 'What is Agape Love?',
      description: 'Exploring the unconditional love of God.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 1,
      isPublished: false,
      isFree: false,
    },
  });

  console.log('✅ Course 3 created (draft) with 1 chapter and 1 lesson!');

  console.log('');
  console.log('✨ Seed completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log('   - 3 Courses created (2 published, 1 draft)');
  console.log('   - 4 Chapters created');
  console.log('   - 9 Lessons created');
  console.log('   - 3 Kingdom Labs created');
  console.log('');
  console.log('🚀 Next steps:');
  console.log('   1. Sign in with Clerk');
  console.log('   2. Set your Clerk user role to "admin" in Clerk dashboard:');
  console.log('      - Go to Users → Your User → Public Metadata');
  console.log('      - Add: { "role": "admin" }');
  console.log('   3. The placeholder courses will appear in your admin dashboard');
  console.log('   4. Create new courses or edit existing ones!');
  console.log('');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seed:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
