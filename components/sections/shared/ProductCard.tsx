import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
  viewMode: "grid" | "list";
  getBadgeColor: (badge?: string) => string;
};

export default function ProductCard({ product, viewMode, getBadgeColor }: Props) {
  return (
    <div
      className={`group bg-card-primary relative transform overflow-hidden rounded-sm shadow-sm transition-all duration-500 hover:shadow-lg ${
        viewMode === "list" ? "flex flex-col md:flex-row" : ""
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold ${getBadgeColor(
            product.badge
          )}`}
        >
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div
        className={`relative ${
          viewMode === "list" ? "md:w-64" : "h-64"
        } img-primary-bg overflow-hidden`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Out of Stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="bg-danger rounded-lg px-4 py-2 font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
        {/* Brand & Rating */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase">{product.brand}</span>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`text-rating h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-current" : ""
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs">({product.reviews})</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="tranding-secondry-text mb-2 line-clamp-2 font-semibold">{product.name}</h3>

        {/* Price */}
        <div className="mb-4 flex items-center space-x-2">
          <span className="tranding-secondry-text text-xl font-bold">{product.price}</span>
          <span className="text-sm line-through">{product.originalPrice}</span>
          <span className="rounded px-2 py-1 text-xs font-semibold">{product.discount}</span>
        </div>

        {/* Colors + Sizes */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-1">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="h-4 w-4 rounded-full border shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-xs">{product.sizes.length} sizes</span>
        </div>

        {/* CTA */}
        <Link
          href={`/product-details/${product.id}`}
          className={`bg-button-primary flex justify-center rounded-lg px-4 py-3 font-semibold text-white ${viewMode === "grid" ? "w-full" : "w-40"} `}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
