"use client";

import { useRef } from "react";
import { Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value: string | null;
    onChange: (file: File | null) => void;
    className?: string;
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
};

export function ImageUpload({
    value,
    onChange,
    className,
    size = "md"
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={cn("relative", sizeClasses[size], className)}>
            <div
                className="w-full h-full rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer overflow-hidden bg-muted/10 relative group"
                onClick={handleImageClick}
            >
                {value ? (
                    <>
                        <img
                            src={value}
                            alt="Upload preview"
                            className="w-full h-full object-cover"
                        />
                        {/* Cancel Icon */}
                        <button
                            onClick={handleRemove}
                            className="absolute top-1 right-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            type="button"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Camera className="w-8 h-8" />
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}
