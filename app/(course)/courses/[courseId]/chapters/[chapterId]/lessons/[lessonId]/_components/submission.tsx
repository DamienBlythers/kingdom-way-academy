"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, FileText, Image as ImageIcon, Video, Upload } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Lab {
  id: string;
  title: string;
  description: string;
  instructions: string;
  requiresText: boolean;
  requiresPhoto: boolean;
  requiresFileUpload: boolean;
  requiresVideo: boolean;
  isGraded: boolean;
  maxPoints?: number;
}

interface LabSubmission {
  id: string;
  labId: string;
  userId: string;
  textResponse?: string;
  photoUrls: string[];
  fileUrls: string[];
  videoUrl?: string;
  status: string;
  submittedAt?: Date;
  grade?: number;
  feedback?: string;
}

interface LabSubmissionProps {
  lab: Lab;
  existingSubmission?: LabSubmission | null;
}

export function LabSubmission({ lab, existingSubmission }: LabSubmissionProps) {
  const [textResponse, setTextResponse] = useState(existingSubmission?.textResponse || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(!!existingSubmission);
  const router = useRouter();

  const handleSubmit = async () => {
    if (lab.requiresText && !textResponse.trim()) {
      toast.error("Please enter a text response");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/labs/${lab.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textResponse,
          photoUrls: [], // We'll add file upload later
          fileUrls: [],
          videoUrl: null,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Lab submitted successfully! 🎉");
      setIsSubmitted(true);
      router.refresh();
    } catch (error) {
      console.error("[LAB_SUBMIT_ERROR]", error);
      toast.error("Failed to submit lab. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show completion message if already submitted
  if (isSubmitted && existingSubmission) {
    return (
      <div className="border rounded-lg p-6 bg-green-50 border-green-200">
        <div className="flex items-start gap-4">
          <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              {lab.title} - Completed ✓
            </h3>
            <p className="text-green-700 text-sm mb-4">
              Submitted on {new Date(existingSubmission.submittedAt!).toLocaleDateString()}
            </p>
            
            {existingSubmission.grade !== null && existingSubmission.grade !== undefined && (
              <div className="bg-white rounded p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-700">Grade:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {existingSubmission.grade}/{lab.maxPoints || 100}
                  </span>
                </div>
                {existingSubmission.feedback && (
                  <div className="mt-3 pt-3 border-t border-green-100">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Feedback:</p>
                    <p className="text-sm text-slate-600">{existingSubmission.feedback}</p>
                  </div>
                )}
              </div>
            )}
            
            {!existingSubmission.grade && (
              <p className="text-sm text-green-600">
                Your submission is under review. You'll be notified when graded.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show submission form
  return (
    <div className="border rounded-lg p-6 space-y-6 bg-white shadow-sm">
      <div className="border-b pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-blue-900">
          <CheckCircle className="h-6 w-6" />
          Kingdom Lab: {lab.title}
        </h3>
        <p className="text-slate-600 mt-2">{lab.description}</p>
        {lab.isGraded && lab.maxPoints && (
          <p className="text-sm text-slate-500 mt-1">
            Worth {lab.maxPoints} points
          </p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded p-4">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Instructions:
        </h4>
        <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
          {lab.instructions}
        </p>
      </div>

      <div className="space-y-4">
        {lab.requiresText && (
          <div>
            <Label className="flex items-center gap-2 mb-2 text-base">
              <FileText className="h-4 w-4" />
              Written Reflection *
            </Label>
            <Textarea
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
              placeholder="Share your reflection, insights, and application..."
              rows={8}
              className="bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Take your time to reflect deeply on what you've learned.
            </p>
          </div>
        )}

        {/* Upload Placeholders - Will be replaced with actual upload components later */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lab.requiresPhoto && (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition">
              <ImageIcon className="h-8 w-8 mb-2" />
              <span className="text-xs text-center">Photo Evidence</span>
              <span className="text-xs text-slate-400 mt-1">(Coming soon)</span>
            </div>
          )}
          {lab.requiresVideo && (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition">
              <Video className="h-8 w-8 mb-2" />
              <span className="text-xs text-center">Video Testimony</span>
              <span className="text-xs text-slate-400 mt-1">(Coming soon)</span>
            </div>
          )}
          {lab.requiresFileUpload && (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition">
              <Upload className="h-8 w-8 mb-2" />
              <span className="text-xs text-center">Document Upload</span>
              <span className="text-xs text-slate-400 mt-1">(Coming soon)</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || (lab.requiresText && !textResponse.trim())}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Submit Lab Assignment"}
        </Button>
        <p className="text-xs text-slate-500">
          Your work will be saved and reviewed by your facilitator.
        </p>
      </div>
    </div>
  );
}
