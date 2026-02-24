import { Card, CardContent } from "@/components/ui/card";
import { PackageX } from "lucide-react";

export function NoSneakersCard() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
        <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-full">
          <PackageX className="text-muted-foreground h-7 w-7" />
        </div>

        <h3 className="text-lg font-semibold">No Sneakers Available</h3>

        <p className="text-muted-foreground max-w-xs text-sm">
          We don&apos;t have any sneakers from this brand right now. Please check back later or
          explore other brands.
        </p>
      </CardContent>
    </Card>
  );
}
