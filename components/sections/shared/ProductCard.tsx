import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  status: string;
  featured: boolean;
  avgRating: number | null;
  reviewCount: number;
  totalSales: number;
  tags: string[];
  _count: { images: number; variants: number };
  variants?: {
    price: number;
    comparePrice?: number;
    color?: string;
    size?: string;
    images?: { url: string }[];
  }[];
  images?: { imageUrl: string; isFeatured: boolean }[];
};

type Props = {
  product: ApiProduct;
  viewMode: "grid" | "list";
  getBadgeColor: (badge?: string) => string;
};

export default function ProductCard({ product, viewMode, getBadgeColor }: Props) {
  // Primary image: from images array or first variant image
  const primaryImage =
    product.images?.find((img) => img.isFeatured)?.imageUrl ||
    product.images?.[0]?.imageUrl ||
    "/placeholder-product.png";

  // Price: from first variant
  const basePrice = product.variants?.[0]?.price;
  const comparePrice = product.variants?.[0]?.comparePrice;
  const discount =
    basePrice && comparePrice && comparePrice > basePrice
      ? Math.round(((comparePrice - basePrice) / comparePrice) * 100)
      : null;

  // Badge: featured → "FEATURED", or derive from tags
  const badge = product.featured
    ? "FEATURED"
    : product.tags?.includes("new")
      ? "NEW"
      : product.tags?.includes("trending")
        ? "TRENDING"
        : null;

  const inStock = product.status === "ACTIVE";
  const rating = product.avgRating ?? 0;

  return (
    <div
      className={`group bg-card-primary relative transform overflow-hidden rounded-sm shadow-sm transition-all duration-500 hover:shadow-lg ${viewMode === "list" ? "flex flex-col md:flex-row" : ""
        }`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-bold ${getBadgeColor(badge)}`}
        >
          {badge}
        </div>
      )}

      {/* Image */}
      <div
        className={`relative ${viewMode === "list" ? "md:w-64" : "h-64"
          } img-primary-bg overflow-hidden`}
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="bg-danger rounded-lg px-4 py-2 font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
        {/* Rating row */}
        <div className="mb-2 flex items-center justify-between">
          {/* Tag pill instead of brand (no brand name in response root) */}
          <span className="text-xs font-semibold uppercase">{product.tags?.[0] ?? "—"}</span>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className={`text-rating ${i < Math.floor(rating) ? "fill-current" : "fill-none"}`}
              />
            ))}
            <span className="ml-1 text-xs">({product.reviewCount})</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="tranding-secondry-text mb-1 line-clamp-2 font-semibold">{product.name}</h3>

        {/* Short description */}
        <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="mb-4 flex items-center gap-2">
          {basePrice !== undefined ? (
            <>
              <span className="tranding-secondry-text text-xl font-bold">
                ${basePrice.toFixed(2)}
              </span>
              {comparePrice && comparePrice > basePrice && (
                <span className="text-muted-foreground text-sm line-through">
                  ${comparePrice.toFixed(2)}
                </span>
              )}
              {discount && (
                <span className="bg-success/10 text-success rounded px-2 py-0.5 text-xs font-semibold">
                  -{discount}%
                </span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground text-sm">
              {product._count.variants} variant{product._count.variants !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/product/${product.id}`}
          className={`bg-button-primary flex justify-center rounded-lg px-4 py-3 font-semibold text-white ${viewMode === "grid" ? "w-full" : "w-40"
            }`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
