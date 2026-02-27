// components/custom/MultiImageUpload.tsx
"use client";

import { X, Upload, ImageIcon } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

interface PreviewImage {
  file: File;
  url: string;
}

interface MultiImageUploadProps {
  values: PreviewImage[];
  onChange: (images: PreviewImage[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export const MultiImageUpload = ({
  values = [],
  onChange,
  maxFiles = 10,
  maxSizeMB = 5,
  accept = "image/*",
  className = "",
}: MultiImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = maxFiles - values.length;
    if (remaining <= 0) {
      alert(`Maximum ${maxFiles} images allowed.`);
      return;
    }

    const validFiles: PreviewImage[] = [];

    for (const file of files.slice(0, remaining)) {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        alert(`"${file.name}" exceeds ${maxSizeMB}MB limit. Skipped.`);
        continue;
      }
      validFiles.push({
        file,
        url: URL.createObjectURL(file),
      });
    }

    onChange([...values, ...validFiles]);

    // Reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    const updated = values.filter((_, i) => i !== index);
    // Revoke the object URL to free memory
    URL.revokeObjectURL(values[index].url);
    onChange(updated);
  };

  const handleMoveFirst = (index: number) => {
    if (index === 0) return;
    const updated = [...values];
    const [item] = updated.splice(index, 1);
    updated.unshift(item);
    onChange(updated);
  };

  const isMaxReached = values.length >= maxFiles;

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Preview Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {values.map((image, index) => (
            <div
              key={image.url}
              className="group bg-muted relative aspect-square overflow-hidden rounded-lg border"
            >
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* First image badge */}
              {index === 0 && (
                <span className="bg-primary text-primary-foreground absolute top-1.5 left-1.5 rounded px-1.5 py-0.5 text-[10px] font-semibold">
                  Main
                </span>
              )}

              {/* Overlay actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleMoveFirst(index)}
                    className="rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-black transition-colors hover:bg-white"
                  >
                    Set Main
                  </button>
                )}
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="hover:bg-destructive absolute top-1.5 right-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition-colors group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {/* Add more slot */}
          {!isMaxReached && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-muted-foreground hover:bg-muted/60 flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span className="text-xs">Add more</span>
            </button>
          )}
        </div>
      )}

      {/* Initial Upload Zone */}
      {values.length === 0 && (
        <label
          onClick={() => inputRef.current?.click()}
          className="bg-muted/40 hover:bg-muted/60 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
        >
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <ImageIcon className="h-8 w-8" />
            <span className="text-sm font-medium">Click to upload images</span>
            <span className="text-xs">PNG, JPG, WEBP up to {maxSizeMB}MB each</span>
            <span className="text-xs">Up to {maxFiles} images</span>
          </div>
        </label>
      )}

      {/* Counter */}
      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span>
          {values.length} / {maxFiles} images
        </span>
        {isMaxReached && <span className="text-destructive font-medium">Maximum reached</span>}
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
