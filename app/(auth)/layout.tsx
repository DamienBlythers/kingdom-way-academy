import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      {/* Back Button - Top Left */}
      <Link
        href="/"
        className="absolute left-8 top-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        <span>Back</span>
      </Link>

      {/* Main Content Container */}
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Logo/Branding */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Kingdom Way Academy</h1>
          <p className="text-sm text-muted-foreground">
            A kingdom education platform.
          </p>
        </div>

        {/* Children (login page, signup page, etc.) */}
        {children}

        {/* Terms & Privacy Footer */}
        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
