# Kingdom Way Academy

A comprehensive Learning Management System (LMS) built with Next.js 16, designed for faith-based education and Kingdom transformation. Features course management, video lessons, Kingdom Labs (practical assignments), progress tracking, and role-based access control.

![Kingdom Way Academy](https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&h=400&fit=crop)

## ✨ Features

### For Administrators
- 📚 **Course Management**: Create, edit, and publish courses with chapters and lessons
- 🎥 **Video Integration**: YouTube video embedding for lesson content
- 🧪 **Kingdom Labs**: Create custom assignments with multiple submission types (text, files, photos, videos)
- 📊 **Analytics Dashboard**: Track student progress and engagement
- ⚙️ **Full CRUD**: Complete control over all content
- 🎯 **Publishing Workflow**: Draft and publish courses when ready

### For Students
- 📖 **Course Browsing**: Discover available courses
- 🎓 **Enrollment System**: Enroll in courses and track progress
- 📺 **Video Lessons**: Watch high-quality educational content
- ✍️ **Kingdom Labs**: Submit assignments with rich media
- 📈 **Progress Tracking**: See completion status for each lesson
- 🏆 **Certificates**: Earn certificates upon course completion

### Technical Features
- 🔐 **Authentication**: Clerk authentication with password support
- 👥 **Role-Based Access**: Admin and learner roles with proper permissions
- 💾 **Database**: PostgreSQL with Prisma ORM
- 🎨 **Premium UI**: shadcn/ui components with Kingdom Way branding
- 📱 **Responsive Design**: Mobile-first, works on all devices
- 🚀 **Performance**: Server-side rendering with Next.js 16
- 🔒 **Security**: Protected routes and data validation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- A Clerk account (free)
- A Neon PostgreSQL database (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YourUsername/kingdom-way-academy.git
cd kingdom-way-academy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_neon_postgresql_url

# App URLs (use these exact values for local dev)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
npm run db:seed  # Optional: creates sample courses
```

5. **Configure Clerk**
- Go to https://dashboard.clerk.com
- Create a new application
- Copy the API keys to `.env.local`
- Set redirect URLs in Clerk dashboard:
  - Sign-in URL: `/sign-in`
  - Sign-up URL: `/sign-up`
  - After sign-in: `/dashboard`
  - After sign-up: `/dashboard`

6. **Set up admin role**
- Sign up at http://localhost:3000
- Go to Clerk dashboard → Users → Your User
- Edit Public Metadata and add:
  ```json
  {
    "role": "admin"
  }
  ```

7. **Start the development server**
```bash
npm run dev
```

8. **Open in browser**
```
http://localhost:3000
```

---

## 📚 Project Structure

```
kingdom-way-academy/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── forgot-password/
│   ├── (course)/            # Student-facing course pages
│   │   ├── browse/          # Course catalog
│   │   └── courses/[id]/    # Course viewer
│   ├── (dashboard)/         # Admin dashboard
│   │   └── admin/           # Course management
│   ├── dashboard/           # Student dashboard
│   └── api/                 # API routes
│       ├── courses/         # Course CRUD
│       ├── labs/            # Kingdom Labs
│       └── webhooks/        # Stripe webhooks
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui components
│   └── navigation/          # Navigation components
├── lib/                     # Utility functions
│   ├── prisma.ts           # Database client
│   ├── clerk-auth-helper.ts # Auth helper
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding
└── public/                 # Static assets
```

---

## 🔧 Technology Stack

### Core
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma 6.0
- **Authentication**: Clerk

### UI
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Fonts**: Inter (via next/font)

### Integrations
- **Video**: YouTube Embed
- **Payments**: Stripe (optional)
- **File Uploads**: UploadThing (optional)
- **Emails**: Resend (optional)

---

## 📖 Key Concepts

### Courses
Courses are organized into a three-tier hierarchy:
- **Course**: The top-level container (e.g., "Kingdom Identity Foundations")
- **Chapter**: Major sections within a course (e.g., "Understanding Your Identity")
- **Lesson**: Individual lessons with video content (e.g., "Who God Says You Are")

### Kingdom Labs
Kingdom Labs are practical assignments that can require:
- Text responses
- File uploads (PDFs, documents)
- Photo submissions
- Video testimonies
- Graded or ungraded
- Custom rubrics

### Roles
- **Admin**: Can create, edit, and publish courses
- **Learner**: Can enroll in and view courses

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:seed      # Seed database with sample data
```

### Database Commands

```bash
npx prisma studio              # Open Prisma Studio (database GUI)
npx prisma generate            # Generate Prisma Client
npx prisma db push             # Push schema to database
npx prisma migrate dev         # Create and apply migrations
```

---

## 🚀 Deployment

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your repository
5. Add environment variables
6. Deploy!

**Important**: Make sure to add all environment variables from `.env.example` in Vercel's project settings.

---

## 🔐 Security

- All routes are protected by Clerk middleware
- Admin routes check for `admin` role in user metadata
- API routes validate user permissions
- Database queries use Prisma for SQL injection protection
- Environment variables never exposed to client

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Clerk](https://clerk.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database hosted on [Neon](https://neon.tech/)
- Icons by [Lucide](https://lucide.dev/)

---

## 📞 Support

For questions or issues:
- 📧 Email: support@kingdomway.academy
- 💬 GitHub Issues: [Create an issue](https://github.com/YourUsername/kingdom-way-academy/issues)

---

## 🎯 Roadmap

- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Certificate generation
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Course completion certificates
- [ ] Discussion forums
- [ ] Live streaming

---

**Made with ❤️ for Kingdom transformation**

