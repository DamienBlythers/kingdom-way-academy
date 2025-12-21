"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EnrollButtonProps {
  courseId: string;
  isEnrolled: boolean;
  price: number;
}

export function EnrollButton({
  courseId,
  isEnrolled,
  price,
}: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);

      // Create checkout session
      const response = await fetch(`/api/courses/${courseId}/checkout`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      // Redirect to Stripe checkout
      window.location.assign(data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  if (isEnrolled) {
    return (
      <Button size="lg" disabled>
        Already Enrolled
      </Button>
    );
  }

  return (
    <Button size="lg" onClick={onClick} disabled={isLoading}>
      {isLoading ? "Loading..." : `Enroll for $${price.toFixed(2)}`}
    </Button>
  );
}