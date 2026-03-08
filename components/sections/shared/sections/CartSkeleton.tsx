import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
    return (
        <div className="space-y-4">
            {/* Select all bar */}
            <div className="bg-card-primary rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-28" />
                </div>
            </div>

            {/* Store groups */}
            {[1, 2].map((group) => (
                <div key={group} className="bg-card-primary rounded-xl overflow-hidden">
                    {/* Store header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-4 rounded" />
                    </div>

                    {/* Items */}
                    {[1, 2].map((item) => (
                        <div key={item} className="flex gap-4 p-4 border-t first:border-t-0">
                            <Skeleton className="h-4 w-4 mt-1 rounded shrink-0" />
                            <Skeleton className="h-[72px] w-[72px] rounded-lg shrink-0" />
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                    <Skeleton className="h-4 w-4 rounded" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-8 w-24 rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {/* Summary */}
            <div className="bg-card-primary rounded-xl p-4 space-y-4">
                <div className="flex justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-12 w-full rounded-lg" />
            </div>
        </div>
    );
}