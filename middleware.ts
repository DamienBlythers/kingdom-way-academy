import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',           // Protect admin panel (admin role required)
  '/dashboard(.*)',       // Protect student dashboard (any authenticated user)
  '/courses/:id/lesson(.*)'  // Protect lesson pages (enrolled users)
]);

// Define which routes require admin role
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
    
    // Additional check for admin-only routes
    if (isAdminRoute(req)) {
      const user = await currentUser();
      
      if (!user) {
        // Shouldn't happen due to auth.protect() above, but just in case
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
      
      // Check if user has admin role in public metadata
      const role = (user.publicMetadata?.role as string) || "learner";
      
      if (role !== "admin") {
        // User is authenticated but not an admin - redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
