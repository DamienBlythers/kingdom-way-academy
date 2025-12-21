"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lesson } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Video, Trash2 } from "lucide-react";
import { toast } from "sonner";
import MuxPlayer from "@mux/mux-player-react";

interface LessonVideoFormProps {
  initialData: Lesson;
  courseId: string;
  chapterId: string;
}

export function LessonVideoForm({
  initialData,
  courseId,
  chapterId,
}: LessonVideoFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function onSubmit() {
    try {
      setIsUploading(true);

      await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}/lessons/${initialData.id}/video`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoUrl }),
        }
      );

      toast.success("Video uploaded! Processing...");
      setIsEditing(false);
      setVideoUrl("");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUploading(false);
    }
  }

  async function onDelete() {
    try {
      await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}/lessons/${initialData.id}/video`,
        {
          method: "DELETE",
        }
      );

      toast.success("Video deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          <h3 className="font-semibold">Lesson Video</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing && !initialData.muxPlaybackId && (
        <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-800 rounded-lg">
          <Video className="h-10 w-10 text-slate-500" />
        </div>
      )}

      {!isEditing && initialData.muxPlaybackId && (
        <div className="relative aspect-video">
          <MuxPlayer
            playbackId={initialData.muxPlaybackId}
            className="rounded-lg"
          />
        </div>
      )}

      {isEditing && (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Enter a video URL (YouTube, Vimeo, or direct video file)
            </p>
            <Input
              placeholder="https://example.com/video.mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              disabled={isUploading}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={onSubmit}
              disabled={!videoUrl || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </Button>
            {initialData.videoUrl && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                disabled={isUploading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Video
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Note: Video will be processed by Mux. This may take a few minutes.
          </p>
        </div>
      )}

      {!isEditing && initialData.videoUrl && !initialData.muxPlaybackId && (
        <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-800 rounded-lg">
          <div className="text-center">
            <Video className="h-10 w-10 mx-auto text-slate-500 mb-2" />
            <p className="text-sm text-muted-foreground">
              Video is processing...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
