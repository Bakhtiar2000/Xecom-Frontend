import { LucideIcon, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export type ColorVariant =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "red"
  | "pink"
  | "yellow"
  | "indigo"
  | "teal"
  | "cyan";

export interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  colorVariant?: ColorVariant;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

const colorVariants: Record<ColorVariant, { bg: string; icon: string }> = {
  blue: { bg: "bg-blue-500/10", icon: "text-blue-500" },
  green: { bg: "bg-green-500/10", icon: "text-green-500" },
  purple: { bg: "bg-purple-500/10", icon: "text-purple-500" },
  orange: { bg: "bg-orange-500/10", icon: "text-orange-500" },
  red: { bg: "bg-red-500/10", icon: "text-red-500" },
  pink: { bg: "bg-pink-500/10", icon: "text-pink-500" },
  yellow: { bg: "bg-yellow-500/10", icon: "text-yellow-500" },
  indigo: { bg: "bg-indigo-500/10", icon: "text-indigo-500" },
  teal: { bg: "bg-teal-500/10", icon: "text-teal-500" },
  cyan: { bg: "bg-cyan-500/10", icon: "text-cyan-500" },
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  colorVariant = "blue",
  isLoading = false,
  isError = false,
  className = "",
}: StatsCardProps) {
  const colors = colorVariants[colorVariant];

  if (isError) {
    return (
      <div
        className={`border-destructive/50 bg-destructive/10 rounded-lg border p-4 shadow-md ${className}`}
      >
        <div className="text-destructive flex flex-col items-center justify-center gap-3">
          <AlertCircle className="h-8 w-8" />
          <p className="text-center text-sm font-medium">{title}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`bg-card rounded-lg border p-4 shadow-md ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-card rounded-lg border p-4 shadow-md transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value.toLocaleString()}</p>
        </div>
        <div className={`${colors.bg} rounded-full p-3`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}
