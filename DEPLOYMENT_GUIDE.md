# Kingdom Way Academy - Production Deployment Guide

**Last Updated**: January 17, 2026  
**Status**: Production-Ready MVP ✅

---

## 📋 **Table of Contents**

1. [Quick Start Checklist](#quick-start-checklist)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Authentication Setup](#authentication-setup)
5. [Role-Based Access Control](#role-based-access-control)
6. [Local Development](#local-development)
7. [Production Deployment](#production-deployment)
8. [Post-Deployment Tasks](#post-deployment-tasks)
9. [Troubleshooting](#troubleshooting)

---

## ✅ **Quick Start Checklist**

**Time to first deployment: ~45 minutes**

- [ ] **Step 1**: Clone repository
- [ ] **Step 2**: Install dependencies (`npm install --legacy-peer-deps`)
- [ ] **Step 3**: Create `.env.local` from `.env.example`
- [ ] **Step 4**: Set up Clerk account and copy API keys
- [ ] **Step 5**: Set up Neon PostgreSQL database
- [ ] **Step 6**: Run database migrations (`npx prisma migrate dev`)
- [ ] **Step 7**: Configure admin role in Clerk
- [ ] **Step 8**: Seed database with sample data (`npm run db:seed`)
- [ ] **Step 9**: Start development server (`npm run dev`)
- [ ] **Step 10**: Deploy to Vercel (optional)

---

## 🔧 **Environment Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/[USERNAME]/kingdom-way-academy.git
cd kingdom-way-academy
```

### **2. Install Dependencies**

```bash
npm install --legacy-peer-deps
```

> **Note**: We use `--legacy-peer-deps` due to React 19 compatibility with some dependencies.

### **3. Create Environment File**

```bash
cp .env.example .env.local
```

Now open `.env.local` and fill in the required values (see next sections).

---

## 🗄️ **Database Configuration**

### **Option 1: Neon PostgreSQL (Recommended for Production)**

1. **Sign up**: Visit [https://neon.tech](https://neon.tech)
2. **Create a project**: Click "Create a Project"
3. **Copy connection string**: Go to "Dashboard" → "Connection Details"
4. **Paste into `.env.local`**:
   ```env
   DATABASE_URL="postgresql://username:password@host.neon.tech:5432/database?sslmode=require"
   ```

### **Option 2: Local PostgreSQL (Development Only)**

```bash
# Install PostgreSQL locally (macOS)
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
createdb kingdom_way_academy

# Update .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/kingdom_way_academy"
```

### **Run Database Migrations**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

This creates all tables, relationships, and generates the Prisma Client.

---

## 🔐 **Authentication Setup (Clerk)**

### **1. Create Clerk Account**

1. Visit [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application
4. Choose "Next.js" as the framework

### **2. Copy API Keys**

From your Clerk dashboard:
- Go to **API Keys** section
- Copy both keys:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_...`)
  - `CLERK_SECRET_KEY` (starts with `sk_test_...`)

### **3. Update `.env.local`**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

## 👑 **Role-Based Access Control**

### **Setting Up Admin Access**

**CRITICAL**: By default, all users are "learners". You must manually assign the "admin" role.

#### **Step 1: Sign Up**
1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3000/sign-up`
3. Create your account

#### **Step 2: Assign Admin Role**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Users**
3. Click on your user
4. Go to the **Metadata** tab
5. Find **Public metadata** section
6. Click "Edit"
7. Add the following JSON:
   ```json
   {
     "role": "admin"
   }
   ```
8. Click **Save**

#### **Step 3: Verify**
1. Sign out and sign back in
2. Visit `http://localhost:3000/admin`
3. You should now have access!

### **Creating Additional Users**

- **Learners** (students): No metadata needed (default role)
- **Admins** (instructors): Add `{ "role": "admin" }` to public metadata

---

## 💻 **Local Development**

### **1. Seed the Database**

Add sample courses, chapters, lessons, and Kingdom Labs:

```bash
# First, update prisma/seed.ts with your Clerk user ID
# (You can find it in Clerk Dashboard → Users → [Your User] → User ID)

# Then run the seed script
npm run db:seed
```

This creates:
- 3 sample courses
- 4 chapters
- 5 lessons
- 3 Kingdom Labs

### **2. Start Development Server**

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### **3. Test the Application**

**As a Student (Learner):**
1. Sign up with a test email
2. Visit `/browse` to see courses
3. Click "Enroll" on a course
4. View lessons and complete Kingdom Labs

**As an Admin:**
1. Sign in with your admin account
2. Visit `/admin` to access admin dashboard
3. Create/edit courses, chapters, and lessons
4. Manage Kingdom Labs
5. View student submissions

---

## 🚀 **Production Deployment**

### **Option 1: Vercel (Recommended)**

#### **Prerequisites**
- GitHub account
- Vercel account (free tier available)

#### **Steps**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add ALL variables from your `.env.local`:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
     CLERK_SECRET_KEY=sk_live_...
     DATABASE_URL=postgresql://...
     NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
     ```
   
   > **Important**: Use **production** Clerk keys (starting with `pk_live_` and `sk_live_`)

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Visit your live site!

5. **Custom Domain (Optional)**:
   - Go to **Settings** → **Domains**
   - Add your custom domain
   - Follow DNS configuration instructions

---

## ✅ **Post-Deployment Tasks**

### **1. Configure Production Clerk Settings**

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Switch to your **Production** instance
3. Navigate to **Configure** → **Settings**
4. Update **Authorized domains**:
   - Add your Vercel domain: `your-app.vercel.app`
   - Add custom domain if applicable: `yourdomain.com`

### **2. Run Production Database Migrations**

```bash
# If using Neon, this runs automatically via Vercel build
# Otherwise, manually run:
npx prisma migrate deploy
```

### **3. Seed Production Database**

**Option A**: Use Vercel CLI
```bash
npm i -g vercel
vercel login
vercel env pull
npm run db:seed
```

**Option B**: Use Prisma Studio
```bash
npx prisma studio
# Manually add sample data via GUI
```

### **4. Set Up Admin User in Production**

1. Sign up on your live site
2. Go to Clerk Dashboard (Production instance)
3. Find your user
4. Add `{ "role": "admin" }` to public metadata

### **5. Test Critical Paths**

- [ ] Sign up / Sign in works
- [ ] Student can browse courses
- [ ] Student can enroll (if payment is disabled)
- [ ] Admin can access `/admin`
- [ ] Admin can create courses
- [ ] Video playback works
- [ ] Kingdom Labs display correctly

---

## 🐛 **Troubleshooting**

### **Issue: "Cannot read properties of null (reading 'id')"**

**Cause**: Session not loading correctly

**Fix**:
1. Clear browser cookies
2. Sign out and sign back in
3. Verify Clerk API keys are correct
4. Check that middleware is running

### **Issue: "Prisma Client not generated"**

**Fix**:
```bash
npx prisma generate
```

### **Issue: "Database connection failed"**

**Fix**:
1. Verify `DATABASE_URL` in `.env.local`
2. Check that your database is accessible
3. For Neon, ensure `?sslmode=require` is in the URL
4. Test connection:
   ```bash
   npx prisma db push
   ```

### **Issue: "Clerk is not defined"**

**Fix**:
1. Verify API keys are set
2. Restart dev server: `npm run dev`
3. Clear Next.js cache: `rm -rf .next`

### **Issue: "Admin routes return 404"**

**Fix**:
1. Ensure you have admin role in Clerk metadata
2. Sign out and sign back in
3. Check middleware logs

### **Issue: "Seed script fails with foreign key error"**

**Fix**:
1. Update `prisma/seed.ts` with your actual Clerk user ID
2. Make sure user exists in Clerk before running seed
3. Drop and recreate database if needed:
   ```bash
   npx prisma migrate reset
   ```

---

## 📊 **Production Checklist**

Before going live, verify:

- [ ] All environment variables set in production
- [ ] Database migrations applied
- [ ] Admin user configured
- [ ] Sample courses seeded (or real courses added)
- [ ] Clerk production instance configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (Vercel does this automatically)
- [ ] Sign up / sign in tested
- [ ] Admin dashboard accessible
- [ ] Course browsing works
- [ ] Video playback tested
- [ ] Mobile responsiveness verified
- [ ] Error tracking set up (optional: Sentry)
- [ ] Analytics configured (optional: Vercel Analytics)

---

## 🎯 **Next Steps After Deployment**

### **Phase 2 Features (Optional)**

Once your MVP is deployed, consider adding:

1. **Stripe Payment Integration**
   - Course purchases
   - Subscription plans
   - Payment webhooks

2. **UploadThing File Uploads**
   - Course images
   - Student lab submissions
   - Profile pictures

3. **Resend Email Notifications**
   - Welcome emails
   - Enrollment confirmations
   - Grade notifications

4. **Kingdom Labs Grading UI**
   - Admin interface for reviewing submissions
   - Feedback system
   - Grade tracking

5. **Certificate Generation**
   - Automatic certificate creation on course completion
   - PDF download functionality
   - Verification system

---

## 📚 **Additional Resources**

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Clerk Documentation**: [https://clerk.com/docs](https://clerk.com/docs)
- **Prisma Documentation**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)
- **Neon Documentation**: [https://neon.tech/docs](https://neon.tech/docs)

---

## 🆘 **Getting Help**

If you encounter issues:

1. Check this troubleshooting guide first
2. Review the `.env.example` file for missing variables
3. Check Vercel deployment logs (if deployed)
4. Review Clerk dashboard for auth errors
5. Check Prisma Studio for database issues: `npx prisma studio`

---

## 🎉 **Congratulations!**

You now have a production-ready Kingdom Way Academy LMS deployed!

**What you've built:**
- ✅ Full authentication system with Clerk
- ✅ Role-based access control (admin/learner)
- ✅ Course management system
- ✅ Video lesson playback
- ✅ Kingdom Labs assignment system
- ✅ PostgreSQL database with Prisma ORM
- ✅ Responsive UI with Tailwind CSS
- ✅ Production deployment on Vercel

**Next**: Start creating real courses and invite your first students! 🚀

---

**Version**: 1.0.0  
**Last Updated**: January 17, 2026  
**Maintained by**: Kingdom Way Academy Development Team
