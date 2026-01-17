import { redirect } from "next/navigation";
import { auth } from "@/lib/clerk-auth-helper";
import { headers } from "next/headers";
import { MainNav } from "@/components/navigation/main-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-50 bg-background border-b">
        <MainNav user={{ 
          email: session.user.email, 
          isAdmin: session.user.isAdmin || false 
        }} />
      </div>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
