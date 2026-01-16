import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserNav } from '@/components/user-nav';
import { GraduationCap } from 'lucide-react';

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Professional Header with Branding */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Branding */}
            <Link 
              href="/browse" 
              className="flex items-center gap-3 group"
            >
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                  Kingdom Way Academy
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">
                  Transform Your Faith Through Kingdom Education
                </span>
              </div>
            </Link>

            {/* User Navigation */}
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Kingdom Way Academy. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/about" className="hover:text-blue-900 transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-blue-900 transition">
                Contact
              </Link>
              <Link href="/support" className="hover:text-blue-900 transition">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}