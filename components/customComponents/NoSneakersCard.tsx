import { Card, CardContent } from "@/components/ui/card"
import { PackageX } from "lucide-react"

export function NoSneakersCard() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <PackageX className="w-7 h-7 text-muted-foreground" />
        </div>

        <h3 className="text-lg font-semibold">
          No Sneakers Available
        </h3>

        <p className="text-sm text-muted-foreground max-w-xs">
          We don&apos;t have any sneakers from this brand right now.
          Please check back later or explore other brands.
        </p>
      </CardContent>
    </Card>
  )
}
