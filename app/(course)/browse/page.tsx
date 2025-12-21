import { prisma } from "@/lib/prisma";
import { CourseCard } from "./_components/course-card";

export default async function BrowsePage() {
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Browse Courses</h1>
        <p className="text-muted-foreground">
          Explore our collection of courses
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No courses available yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              imageUrl={course.imageUrl!}
              chaptersLength={course.chapters.length}
              price={course.price!}
            />
          ))}
        </div>
      )}
    </div>
  );
}
