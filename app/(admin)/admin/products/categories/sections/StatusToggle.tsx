
"use client"
import { useUpdateCategoryMutation } from "@/redux/features/product/category.api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StatusToggle({ id, isActive }: { id: string; isActive: boolean }) {
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
    const [optimistic, setOptimistic] = useState(isActive);

    const handleToggle = async () => {
        const newValue = !optimistic;
        setOptimistic(newValue);
        try {
            const formData = new FormData();
            formData.append("text", JSON.stringify({ id, isActive: newValue }));
            await updateCategory({ id, data: formData }).unwrap();
            toast.success(newValue ? "Category activated" : "Category deactivated");
        } catch {
            setOptimistic(!newValue);
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleToggle}
                disabled={isLoading}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-60 ${optimistic ? "bg-success" : "bg-muted-foreground/30"
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${optimistic ? "translate-x-6" : "translate-x-1"
                        }`}
                />
            </button>
            {isLoading ? (
                <Loader2 size={14} className="animate-spin text-muted-foreground" />
            ) : (
                <span className={`text-xs font-medium ${optimistic ? "text-success" : "text-muted-foreground"}`}>
                    {optimistic ? "Active" : "Inactive"}
                </span>
            )}
        </div>
    );
}


export default StatusToggle;