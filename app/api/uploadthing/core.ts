import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/clerk-auth-helper";
import { headers } from "next/headers";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");
  return { userId: session.user.id };
};

export const ourFileRouter = {
  // ... your existing routes (courseImage, courseVideo)
  
  // Kingdom Labs uploads
  labPhoto: f({ image: { maxFileSize: "8MB", maxFileCount: 3 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
    
  labVideo: f({ video: { maxFileSize: "256MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
    
  labDocument: f({ pdf: { maxFileSize: "16MB", maxFileCount: 5 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;
