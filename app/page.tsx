import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Enhanced Header with Branding */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 group">
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
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kingdom Way Academy
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Transform your faith journey with Kingdom-focused education
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <BookOpen className="h-8 w-8 text-blue-600 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2 text-gray-900">Quality Content</h3>
              <p className="text-sm text-gray-600">
                Expert-crafted Kingdom curriculum
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Users className="h-8 w-8 text-purple-600 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2 text-gray-900">Learn Together</h3>
              <p className="text-sm text-gray-600">
                Join our Kingdom community
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Award className="h-8 w-8 text-green-600 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2 text-gray-900">Track Progress</h3>
              <p className="text-sm text-gray-600">
                Measure your transformation
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button size="lg" className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800">
                Browse Courses
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-900 text-blue-900 hover:bg-blue-50">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="border-t bg-white py-6">
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
