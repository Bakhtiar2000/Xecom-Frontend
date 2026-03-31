import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import ProductCard from "@/components/sections/shared/ProductCard";

type Props = {
  products: Product[];
  isLoading: boolean;
  viewMode: "grid" | "list";
  getBadgeColor: (badge?: string) => string;
};

export default function ProductGrid({ products, isLoading, viewMode, getBadgeColor }: Props) {
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 text-6xl">👟</div>
        <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
        <p className="text-muted-foreground text-sm">
          Try adjusting your filters or search to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" : "space-y-6"
        }
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`group cart-sec-bg relative animate-pulse overflow-hidden rounded-sm shadow-sm ${
              viewMode === "list" ? "flex flex-col md:flex-row" : ""
            }`}
          >
            <div className="absolute top-4 left-4 z-10">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <div
              className={`relative ${
                viewMode === "list" ? "md:w-64" : "h-64"
              } img-primary-bg overflow-hidden`}
            >
              <Skeleton className="absolute inset-0 h-full w-full" />
            </div>

            <div className={`space-y-3 p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
              {/* Brand & Rating */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>

              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-5 w-2/3 rounded" />

              <div className="flex items-center space-x-2">
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-5 w-12 rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-3 w-16 rounded" />
              </div>

              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid" ? "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4" : "space-y-6"
      }
    >
      {products.map((product: any) => (
        <ProductCard
          key={product.id}
          product={{
            ...product,
            rating: product.avgRating ?? 0,
            reviews: product.reviewCount ?? 0,
          }}
          viewMode={viewMode}
          getBadgeColor={getBadgeColor}
        />
      ))}
    </div>
  );
}
