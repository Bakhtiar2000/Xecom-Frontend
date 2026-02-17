import { Link, Package, Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function NoProductsFound() {
  return (
    <div className="rounded-md border bg-card">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="rounded-full bg-muted p-6 mb-6">
          <Package className="w-16 h-16 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No Products Found</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          There are no products in your inventory yet. Start adding products to
          showcase them to your customers.
        </p>
        <Button asChild>
          <Link href="/admin/products/create">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Product
          </Link>
        </Button>
      </div>
    </div>
  );
}