import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/clerk-auth-helper";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Courses</h1>
          <p className="text-muted-foreground">
            Manage and create your courses
          </p>
        </div>
        <Link href="/admin/courses/create">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first course
          </p>
          <Link href="/admin/courses/create">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/admin/courses/${course.id}`}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {course.isPublished ? "Published" : "Draft"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
