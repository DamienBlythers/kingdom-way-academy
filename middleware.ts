import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
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
    
    // For admin routes, we'll check role in the page component itself
    // Middleware can't access user metadata in Next.js 16, so we rely on page-level checks
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
