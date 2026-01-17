"use client";

import { UploadDropzone } from "@uploadthing/react";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { X } from "lucide-react";

interface FileUploadProps {
  endpoint: keyof typeof ourFileRouter;
  value?: string | string[];
  onChange: (url?: string | string[]) => void;
  multiple?: boolean;
}

export const FileUpload = ({
  endpoint,
  value,
  onChange,
  multiple = false,
}: FileUploadProps) => {
  const urls = Array.isArray(value) ? value : value ? [value] : [];

  const handleRemove = (urlToRemove: string) => {
    if (multiple) {
      const newUrls = urls.filter(url => url !== urlToRemove);
      onChange(newUrls.length > 0 ? newUrls : undefined);
    } else {
      onChange(undefined);
    }
  };

  return (
    <div className="space-y-2">
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {urls.map((url, idx) => (
            <div key={idx} className="relative group">
              {endpoint.includes("Video") ? (
                <video src={url} className="w-32 h-32 rounded object-cover" />
              ) : endpoint.includes("Photo") || endpoint.includes("Image") ? (
                <img src={url} alt="upload" className="w-32 h-32 rounded object-cover" />
              ) : (
                <div className="w-32 h-32 bg-slate-100 rounded flex items-center justify-center">
                  <span className="text-xs text-slate-600">Document</span>
                </div>
              )}
              <button
                onClick={() => handleRemove(url)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                type="button"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {(multiple || urls.length === 0) && (
        <UploadDropzone<typeof ourFileRouter, keyof typeof ourFileRouter>
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res) {
              const newUrls = res.map((file: any) => file.url);
              if (multiple) {
                onChange([...urls, ...newUrls]);
              } else {
                onChange(newUrls[0]);
              }
              toast.success("Upload complete!");
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(`Upload failed: ${error.message}`);
          }}
        />
      )}
    </div>
  );
};