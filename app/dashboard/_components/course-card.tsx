"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CertificateButton } from "./certificate-button";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    imageUrl: string | null;
    chaptersCount: number;
    lessonsCount: number;
    completedLessons: number;
    progressPercentage: number;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const isCompleted = course.progressPercentage === 100;

  return (
    <Card className="overflow-hidden">
      {course.imageUrl && (
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4 space-y-3">
        <h3 className="font-semibold line-clamp-2">{course.title}</h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.chaptersCount} chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.lessonsCount} lessons</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{course.progressPercentage}%</span>
          </div>
          <Progress value={course.progressPercentage} />
        </div>

        <div className="flex flex-col gap-2">
          {isCompleted ? (
            <>
              <CertificateButton courseId={course.id} courseName={course.title} />
              <Link href={`/courses/${course.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Course
                </Button>
              </Link>
            </>
          ) : (
            <Link href={`/courses/${course.id}`} className="w-full">
              <Button className="w-full">Continue Learning</Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
