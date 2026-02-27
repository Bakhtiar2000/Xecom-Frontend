// components/custom/VideoUpload.tsx
"use client";

import { X, Video, Upload } from "lucide-react";
import { useRef } from "react";

interface VideoUploadProps {
  value?: string | null; // object URL or existing URL
  onChange: (file: File | null) => void;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export const VideoUpload = ({
  value,
  onChange,
  maxSizeMB = 100,
  accept = "video/*",
  className = "",
}: VideoUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      alert(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Upload Area */}
      {!value ? (
        <label
          onClick={() => inputRef.current?.click()}
          className="bg-muted/40 hover:bg-muted/60 flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
        >
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <Upload className="h-8 w-8" />
            <span className="text-sm font-medium">Click to upload video</span>
            <span className="text-xs">MP4, MOV, WEBM up to {maxSizeMB}MB</span>
          </div>
        </label>
      ) : (
        /* Preview Area */
        <div className="relative overflow-hidden rounded-lg border bg-black">
          <video src={value} controls className="max-h-56 w-full rounded-lg" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* File info bar */}
          <div className="bg-muted/80 flex items-center gap-2 border-t px-3 py-2">
            <Video className="text-muted-foreground h-4 w-4 shrink-0" />
            <span className="text-muted-foreground truncate text-xs">Video uploaded</span>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-primary ml-auto shrink-0 text-xs hover:underline"
            >
              Replace
            </button>
          </div>
        </div>
      )}

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
