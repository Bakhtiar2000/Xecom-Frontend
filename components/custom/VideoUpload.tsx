// components/custom/VideoUpload.tsx
"use client";

import { X, Video, Upload } from "lucide-react";
import { useRef } from "react";

interface VideoUploadProps {
    value?: string | null;       // object URL or existing URL
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
                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="h-8 w-8" />
                        <span className="text-sm font-medium">Click to upload video</span>
                        <span className="text-xs">MP4, MOV, WEBM up to {maxSizeMB}MB</span>
                    </div>
                </label>
            ) : (
                /* Preview Area */
                <div className="relative rounded-lg border overflow-hidden bg-black">
                    <video
                        src={value}
                        controls
                        className="w-full max-h-56 rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>

                    {/* File info bar */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted/80 border-t">
                        <Video className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground truncate">
                            Video uploaded
                        </span>
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="ml-auto text-xs text-primary hover:underline shrink-0"
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