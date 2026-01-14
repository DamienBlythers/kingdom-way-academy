import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch real data
  const totalCourses = await prisma.course.count({
    where: { userId },
  });

  const publishedCourses = await prisma.course.count({
    where: { userId, isPublished: true },
  });

  const totalStudents = await prisma.enrollment.count({
    where: {
      course: {
        userId,
      },
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your courses and content
          </p>
        </div>
        <Link href="/admin/courses/create">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
          <p className="text-3xl font-bold">{totalCourses}</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-3xl font-bold">{totalStudents}</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Published Courses</h3>
          <p className="text-3xl font-bold">{publishedCourses}</p>
        </div>
      </div>
    </div>
  );
}
