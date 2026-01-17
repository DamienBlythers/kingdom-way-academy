# ✅ Kingdom Way Academy - Quick Start Checklist

**Goal**: Get your Kingdom Way Academy LMS up and running in 45 minutes or less.

---

## 📋 **Pre-Flight Checklist**

Before you begin, make sure you have:

- [ ] **Node.js 18+** installed (`node --version`)
- [ ] **Git** installed (`git --version`)
- [ ] **Code editor** (VS Code recommended)
- [ ] **Internet connection** for API services
- [ ] **Email account** for Clerk sign-up
- [ ] **45 minutes** of focused time

---

## 🚀 **Step-by-Step Setup (45 minutes)**

### **Phase 1: Local Setup** (10 minutes)

- [ ] **Clone repository**
  ```bash
  git clone https://github.com/YOUR_USERNAME/kingdom-way-academy.git
  cd kingdom-way-academy
  ```

- [ ] **Install dependencies**
  ```bash
  npm install --legacy-peer-deps
  ```
  ⏱️ *This takes 2-3 minutes*

- [ ] **Copy environment template**
  ```bash
  cp .env.example .env.local
  ```

---

### **Phase 2: Clerk Authentication** (10 minutes)

- [ ] **Create Clerk account** → [https://clerk.com](https://clerk.com)
- [ ] **Create new application** (select "Next.js")
- [ ] **Copy publishable key** (starts with `pk_test_...`)
- [ ] **Copy secret key** (starts with `sk_test_...`)
- [ ] **Paste into `.env.local`**:
  ```env
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
  CLERK_SECRET_KEY=sk_test_xxxxx
  ```

---

### **Phase 3: Database Setup** (10 minutes)

- [ ] **Create Neon account** → [https://neon.tech](https://neon.tech)
- [ ] **Create new project**
- [ ] **Copy connection string** (from Dashboard → Connection Details)
- [ ] **Paste into `.env.local`**:
  ```env
  DATABASE_URL="postgresql://username:password@host.neon.tech:5432/db?sslmode=require"
  ```

- [ ] **Run database migrations**:
  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```

---

### **Phase 4: Admin Configuration** (5 minutes)

- [ ] **Start dev server**:
  ```bash
  npm run dev
  ```

- [ ] **Sign up**: Visit [http://localhost:3000/sign-up](http://localhost:3000/sign-up)
- [ ] **Create your account** (use a real email)
- [ ] **Keep this browser tab open**

- [ ] **In a new tab, open Clerk Dashboard** → [https://dashboard.clerk.com](https://dashboard.clerk.com)
- [ ] **Go to**: Users → [Your User] → Metadata
- [ ] **Click "Edit" on Public metadata**
- [ ] **Add**:
  ```json
  {
    "role": "admin"
  }
  ```
- [ ] **Click "Save"**

- [ ] **Return to your app tab**
- [ ] **Sign out** (top right menu)
- [ ] **Sign back in**
- [ ] **Test**: Visit [http://localhost:3000/admin](http://localhost:3000/admin)
  - ✅ If you see the admin dashboard → Success!
  - ❌ If you get redirected → Double-check metadata step

---

### **Phase 5: Seed Database** (5 minutes)

- [ ] **Update seed file**: Open `prisma/seed.ts`
- [ ] **Find** `REPLACE_WITH_YOUR_CLERK_USER_ID` (3 places)
- [ ] **Replace with your actual Clerk user ID**:
  - Get it from: Clerk Dashboard → Users → [Your User] → Copy User ID
  - Or from: Your app → Profile → Copy the ID from URL

- [ ] **Run seed script**:
  ```bash
  npm run db:seed
  ```

- [ ] **Verify**: Visit [http://localhost:3000/browse](http://localhost:3000/browse)
  - You should see 3 sample courses!

---

### **Phase 6: Test Everything** (5 minutes)

**As Admin**:
- [ ] Visit `/admin` → ✅ Access granted
- [ ] Click "New Course" → ✅ Create course page loads
- [ ] View existing courses → ✅ 3 courses visible

**As Student**:
- [ ] Visit `/browse` → ✅ 3 courses displayed
- [ ] Click a course → ✅ Course overview loads
- [ ] Click a lesson → ✅ Video player loads
- [ ] View Kingdom Lab → ✅ Assignment details show

**Sign Out Test**:
- [ ] Sign out → ✅ Redirected to landing page
- [ ] Try to visit `/admin` → ✅ Redirected to sign-in
- [ ] Sign back in → ✅ Dashboard appears

---

## 🎉 **Congratulations!**

If all checkboxes are ticked, you have a fully working Kingdom Way Academy LMS!

---

## 🔍 **What You Just Built**

✅ **Authentication System**
- Sign up / sign in with Clerk
- Role-based access control (admin vs learner)
- Protected routes

✅ **Admin Interface**
- Create and edit courses
- Manage chapters and lessons
- Build Kingdom Labs (assignments)

✅ **Student Experience**
- Browse course catalog
- Enroll in courses
- Watch video lessons
- Complete assignments

✅ **Database**
- PostgreSQL (Neon)
- 9 data models
- 3 sample courses with lessons

---

## 📚 **Next Steps**

Now that your LMS is running:

### **Immediate Actions**:
1. **Create your first real course**:
   - Go to `/admin/courses/create`
   - Add title, description, image URL
   - Create chapters and lessons
   - Add YouTube video URLs

2. **Test the student experience**:
   - Sign up a test "learner" account (use a different email)
   - Enroll in your course
   - Complete a lesson

3. **Customize branding**:
   - Update `app/page.tsx` with your organization info
   - Replace placeholder images with real ones
   - Adjust colors in `app/globals.css`

### **Optional Enhancements** (Phase 2):
- [ ] Add Stripe payment processing
- [ ] Configure file uploads (UploadThing)
- [ ] Set up email notifications (Resend)
- [ ] Build admin grading UI for Kingdom Labs
- [ ] Add certificate generation

---

## 🐛 **Troubleshooting**

### **Issue: "Clerk is not defined"**
- ✅ Restart dev server: `npm run dev`
- ✅ Check `.env.local` has Clerk keys
- ✅ Clear browser cache

### **Issue: "Database connection failed"**
- ✅ Verify `DATABASE_URL` in `.env.local`
- ✅ Check Neon dashboard shows database is active
- ✅ Ensure `?sslmode=require` is in connection string

### **Issue: "Cannot access /admin"**
- ✅ Verify admin role in Clerk metadata
- ✅ Sign out and sign back in
- ✅ Check middleware.ts is running

### **Issue: "No courses in /browse"**
- ✅ Run seed script again: `npm run db:seed`
- ✅ Open Prisma Studio: `npx prisma studio`
- ✅ Verify courses exist in database

---

## 🚀 **Deploy to Production**

Ready to go live?

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Add environment variables (use **production** Clerk keys)
   - Click "Deploy"

3. **Configure production Clerk**:
   - Switch to production instance in Clerk Dashboard
   - Add your Vercel domain to authorized domains
   - Create admin user in production

**Full deployment guide**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 📖 **Additional Resources**

- **Full README**: [README.md](README.md)
- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Architecture Deep Dive**: [DEEP_DIVE_ANALYSIS.md](DEEP_DIVE_ANALYSIS.md)

---

## 💬 **Need Help?**

If you get stuck:

1. ✅ Check the troubleshooting section above
2. ✅ Review `.env.example` for missing variables
3. ✅ Verify all checkboxes were completed in order
4. ✅ Check browser console for errors (F12)
5. ✅ Review Clerk dashboard for auth issues

---

**Total Time**: ~45 minutes  
**Difficulty**: Intermediate  
**Result**: Production-ready LMS ✨

**Version**: 1.0.0  
**Last Updated**: January 17, 2026
