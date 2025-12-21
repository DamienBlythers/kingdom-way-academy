import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { MainNav } from "@/components/navigation/main-nav";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="h-full">
      <MainNav user={{ email: session.user.email, isAdmin: true }} />
      <main className="h-full">{children}</main>
    </div>
  );
}
