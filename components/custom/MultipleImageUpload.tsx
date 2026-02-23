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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {values.map((image, index) => (
            <div
              key={image.url}
              className="relative group rounded-lg border overflow-hidden aspect-square bg-muted"
            >
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* First image badge */}
              {index === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[10px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                  Main
                </span>
              )}

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleMoveFirst(index)}
                    className="text-[10px] font-medium bg-white/90 hover:bg-white text-black px-2 py-1 rounded transition-colors"
                  >
                    Set Main
                  </button>
                )}
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-destructive text-white rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
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
              className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 text-muted-foreground hover:bg-muted/60 transition-colors"
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
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60 transition-colors"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <span className="text-sm font-medium">Click to upload images</span>
            <span className="text-xs">PNG, JPG, WEBP up to {maxSizeMB}MB each</span>
            <span className="text-xs">Up to {maxFiles} images</span>
          </div>
        </label>
      )}

      {/* Counter */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{values.length} / {maxFiles} images</span>
        {isMaxReached && (
          <span className="text-destructive font-medium">Maximum reached</span>
        )}
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