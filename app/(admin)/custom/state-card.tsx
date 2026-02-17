import { Minus, TrendingDown, TrendingUp } from "lucide-react";

export default function StatsCard({
  title,
  value,
  subtitle,
  trend,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: "up" | "down" | "neutral";
}) {
  const getTrendIcon = () => {
    if (trend === "up")
      return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === "down")
      return <TrendingDown className="h-4 w-4 text-danger" />;
    return <Minus className="h-4 w-4 text-rating" />;
  };

  return (
    <div className="rounded-lg border bg-popover p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {trend && getTrendIcon()}
      </div>
      <h3 className="text-2xl font-bold mb-1">
        {typeof value === "number" ? value.toLocaleString() : value}
      </h3>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}