"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export function CourseActions({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);

      if (isPublished) {
        await fetch(`/api/courses/${courseId}/unpublish`, {
          method: "PATCH",
        });
        toast.success("Course unpublished");
      } else {
        await fetch(`/api/courses/${courseId}/publish`, {
          method: "PATCH",
        });
        toast.success("Course published");
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);

      await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });

      toast.success("Course deleted");
      router.push(`/admin/courses`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button onClick={onDelete} size="sm" disabled={isLoading} variant="destructive">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
