import { Link, Package, Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function NoProductsFound() {
  return (
    <div className="bg-card rounded-md border">
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="bg-muted mb-6 rounded-full p-6">
          <Package className="text-muted-foreground h-16 w-16" strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 text-2xl font-semibold">No Products Found</h3>
        <p className="text-muted-foreground mb-6 max-w-md text-center">
          There are no products in your inventory yet. Start adding products to showcase them to
          your customers.
        </p>
        <Button asChild>
          <Link href="/admin/products/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Product
          </Link>
        </Button>
      </div>
    </div>
  );
}
