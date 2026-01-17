# Kingdom Way Academy - Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Setup
- [

 ] Create `.env.local` file from `.env.example`
- [ ] Add all required API keys:
  - [ ] Clerk Publishable Key
  - [ ] Clerk Secret Key
  - [ ] Database URL (Neon PostgreSQL)
  - [ ] Stripe API keys (if using payments)
  - [ ] UploadThing credentials (if using file uploads)
  - [ ] Resend API key (if using emails)

### 2. Database Setup
- [ ] Create Neon PostgreSQL database
- [ ] Copy DATABASE_URL to `.env.local`
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Run `npm run db:seed` (optional - creates sample courses)

### 3. Clerk Configuration
- [ ] Create Clerk application at https://dashboard.clerk.com
- [ ] Configure sign-in/sign-up URLs in Clerk dashboard:
  - Sign-in URL: `/sign-in`
  - Sign-up URL: `/sign-up`
  - After sign-in URL: `/dashboard`
  - After sign-up URL: `/dashboard`
- [ ] Set up roles in Clerk dashboard:
  - [ ] Create `admin` role
  - [ ] Create `learner` role (default)
- [ ] Add your user to `admin` role:
  - Go to Users → Your User → Public Metadata
  - Add: `{ "role": "admin" }`

### 4. Local Testing
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test sign-in flow
- [ ] Test admin dashboard access
- [ ] Test course creation
- [ ] Test student dashboard

### 5. Code Quality
- [ ] Run `npx tsc --noEmit` (no TypeScript errors)
- [ ] Run `npm run lint` (no linting errors)
- [ ] Test all main routes load correctly
- [ ] Check browser console for errors

---

## 🚀 Vercel Deployment Checklist

### 1. Prepare for Deployment
- [ ] Commit all changes to git
- [ ] Push to GitHub repository
- [ ] Ensure `.env.local` is in `.gitignore` (never commit secrets!)

### 2. Vercel Setup
- [ ] Sign up/Login to https://vercel.com
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Configure project settings:
  - Framework Preset: `Next.js`
  - Root Directory: `./` (leave default)
  - Build Command: `npm run build` (auto-detected)
  - Output Directory: `.next` (auto-detected)

### 3. Environment Variables in Vercel
Add all environment variables from `.env.local`:

#### Required:
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `DATABASE_URL`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`

#### Optional (add when ready):
- [ ] `STRIPE_API_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `UPLOADTHING_SECRET`
- [ ] `UPLOADTHING_APP_ID`
- [ ] `RESEND_API_KEY`
- [ ] `NEXT_PUBLIC_APP_URL` (your production URL)

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Check deployment logs for errors
- [ ] Visit your production URL

### 5. Post-Deployment Verification
- [ ] Test sign-in/sign-up flow in production
- [ ] Verify admin access works
- [ ] Test creating a course
- [ ] Test enrolling in a course (as learner)
- [ ] Check all images load correctly
- [ ] Test video playback
- [ ] Verify database connections work

### 6. Clerk Production Configuration
- [ ] Update Clerk dashboard with production domain
- [ ] Add production URL to authorized domains
- [ ] Test authentication in production
- [ ] Verify role-based access control works

---

## 🔧 Post-Deployment Tasks

### Content Setup
- [ ] Create your first course as admin
- [ ] Upload course thumbnail
- [ ] Add chapters and lessons
- [ ] Create Kingdom Labs assignments
- [ ] Publish your first course

### Payment Setup (Optional)
- [ ] Switch Stripe to live mode
- [ ] Update Stripe webhook endpoint in Stripe dashboard
- [ ] Test payment flow end-to-end
- [ ] Verify enrollment happens after successful payment

### Email Setup (Optional)
- [ ] Verify Resend domain
- [ ] Test welcome emails
- [ ] Test enrollment confirmation emails
- [ ] Test certificate emails

### Monitoring & Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Add Google Analytics (optional)
- [ ] Monitor server logs in Vercel
- [ ] Set up uptime monitoring

---

## 🆘 Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Verify `DATABASE_URL` is set in Vercel
- Run `npm run build` locally to test

### Database Connection Issues
- Verify Neon database is running
- Check if IP allowlist is set correctly (allow all for serverless)
- Ensure connection string includes `?sslmode=require`
- Test connection string locally first

### Authentication Issues
- Verify Clerk environment variables are set
- Check Clerk dashboard has correct URLs
- Ensure sign-in/sign-up pages are accessible
- Test role metadata is properly set

### Prisma Issues
- Run `npx prisma generate` in Vercel build command (already in build script)
- Ensure schema.prisma is committed to git
- Verify DATABASE_URL format is correct

---

## 📊 Success Metrics

After deployment, you should be able to:
- ✅ Sign in with Clerk authentication
- ✅ Access admin dashboard (if admin role assigned)
- ✅ Create, edit, and publish courses
- ✅ Students can browse and enroll in courses
- ✅ Video lessons play correctly
- ✅ Progress tracking works
- ✅ Kingdom Labs can be submitted
- ✅ Role-based access control functions

---

## 🎉 Congratulations!

Your Kingdom Way Academy is now live in production!

### Next Steps:
1. Invite beta testers
2. Gather feedback
3. Iterate and improve
4. Launch to your audience

### Support Resources:
- Next.js Docs: https://nextjs.org/docs
- Clerk Docs: https://clerk.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Vercel Docs: https://vercel.com/docs

---

**Last Updated**: January 17, 2026  
**Version**: 1.0.0
