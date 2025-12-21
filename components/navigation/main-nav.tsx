"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, GraduationCap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MainNavProps {
  user: {
    email: string;
    isAdmin?: boolean;
  };
}

export function MainNav({ user }: MainNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <div className="border-b bg-white dark:bg-slate-900">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <GraduationCap className="h-6 w-6" />
          <span className="hidden sm:inline">Kingdom Way Academy</span>
          <span className="sm:hidden">KWA</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 ml-6">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className={cn(
                "gap-2",
                isActive("/dashboard") && !pathname.includes("/admin") && "bg-slate-100 dark:bg-slate-800"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>

          <Link href="/browse">
            <Button
              variant="ghost"
              className={cn(
                "gap-2",
                isActive("/browse") && "bg-slate-100 dark:bg-slate-800"
              )}
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Browse</span>
            </Button>
          </Link>

          {user.isAdmin && (
            <Link href="/admin/courses">
              <Button
                variant="ghost"
                className={cn(
                  "gap-2",
                  isActive("/admin") && "bg-slate-100 dark:bg-slate-800"
                )}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Admin</span>
              </Button>
            </Link>
          )}
        </nav>

        {/* Right Side - User Menu */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline">{user.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm">
                <p className="font-medium">Signed in as</p>
                <p className="text-muted-foreground truncate">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  My Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/browse">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Courses
                </Link>
              </DropdownMenuItem>
              {user.isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin/courses">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <form action="/api/auth/sign-out" method="POST" className="w-full">
                  <button type="submit" className="w-full text-left">
                    Sign Out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
