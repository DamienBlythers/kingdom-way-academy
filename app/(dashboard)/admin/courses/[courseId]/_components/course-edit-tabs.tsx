"use client";

import { Course, Chapter, Lesson } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TitleForm } from "./title-form";
import { DescriptionForm } from "./description-form";
import { ImageForm } from "./image-form";
import { PriceForm } from "./price-form";
import { ChaptersForm } from "./chapters-form";

type CourseWithChapters = Course & {
  chapters: (Chapter & {
    lessons: Lesson[];
  })[];
};

interface CourseEditTabsProps {
  course: CourseWithChapters;
}

export function CourseEditTabs({ course }: CourseEditTabsProps) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="structure">Course Structure</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
          </div>
          <div className="space-y-6">
            <ImageForm initialData={course} courseId={course.id} />
            <PriceForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="structure" className="mt-6">
        <ChaptersForm initialData={course} courseId={course.id} />
      </TabsContent>
    </Tabs>
  );
}
