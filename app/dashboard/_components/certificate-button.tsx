"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Award } from "lucide-react";
import { toast } from "sonner";

interface CertificateButtonProps {
  courseId: string;
  courseName: string;
}

export function CertificateButton({
  courseId,
  courseName,
}: CertificateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onDownload() {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/courses/${courseId}/certificate`);

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Failed to generate certificate");
        return;
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${courseName.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Certificate downloaded!");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onDownload}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Download className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Award className="h-4 w-4" />
          Download Certificate
        </>
      )}
    </Button>
  );
}
