import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Kingdom Way!
        </h1>

        <p className="text-gray-600 mb-8">
          Your subscription is now active. Get ready to transform your faith journey with Kingdom-focused education.
        </p>

        <div className="space-y-3">
          <Link href="/browse">
            <Button className="w-full bg-blue-900 hover:bg-blue-800" size="lg">
              Browse Courses
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Check your email for your receipt and welcome message.
        </p>
      </div>
    </div>
  );
}
