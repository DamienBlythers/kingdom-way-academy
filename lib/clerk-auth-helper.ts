import { auth as clerkAuth, currentUser } from "@clerk/nextjs/server";

export const auth = {
  api: {
    async getSession({ headers }: { headers: any }) {
      const { userId } = await clerkAuth();
      
      if (!userId) {
        return null;
      }

      const user = await currentUser();
      
      if (!user) {
        return null;
      }

      // Extract role from Clerk public metadata
      // Default to "learner" if no role is set
      const role = (user.publicMetadata?.role as string) || "learner";
      const isAdmin = role === "admin";

      return {
        user: {
          id: userId,
          email: user.emailAddresses?.[0]?.emailAddress || "",
          name: user.fullName || user.firstName || "",
          image: user.imageUrl || "",
          role: role,
          isAdmin: isAdmin,
        },
        session: {
          id: userId,
          userId: userId,
        },
      };
    },
  },
};
