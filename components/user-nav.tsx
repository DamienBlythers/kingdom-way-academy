"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { BookOpen, LayoutDashboard, GraduationCap } from "lucide-react";

export function UserNav() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-6">
      {/* Navigation Links */}
      <Link 
        href="/browse" 
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
      >
        <BookOpen className="h-4 w-4" />
        My Courses
      </Link>
      
      <Link 
        href="/admin" 
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
      >
        <LayoutDashboard className="h-4 w-4" />
        Admin Dashboard
      </Link>

      {/* User Info */}
      {user && (
        <div className="text-sm text-gray-600 hidden md:block">
          {user.firstName || user.emailAddresses[0].emailAddress}
        </div>
      )}

      {/* Clerk User Button with Sign Out */}
      <UserButton 
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "w-10 h-10 ring-2 ring-blue-100 hover:ring-blue-300 transition",
            userButtonPopoverCard: "shadow-xl",
            userButtonPopoverActionButton: "hover:bg-blue-50"
          }
        }}
      />
    </div>
  );
}