"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export function ChapterActions({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);

      if (isPublished) {
        await fetch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`, {
          method: "PATCH",
        });
        toast.success("Chapter unpublished");
      } else {
        await fetch(`/api/courses/${courseId}/chapters/${chapterId}/publish`, {
          method: "PATCH",
        });
        toast.success("Chapter published");
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

      await fetch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        method: "DELETE",
      });

      toast.success("Chapter deleted");
      router.push(`/admin/courses/${courseId}`);
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
      <Button onClick={onDelete} size="sm" disabled={isLoading}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
