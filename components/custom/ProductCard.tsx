"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sneaker } from "@/data/premium-shoes";

export type ProductCardProps = {
  product: Sneaker;
  index?: number;
  isVisible?: boolean;
};

const ProductCard = ({
  product,
  index = 0,
  isVisible = true,
}: ProductCardProps): React.JSX.Element => {
  return (
    <div
      className="group bg-card-primary relative transform overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 100}ms both` : "none",
      }}
    >
      {/* Badge */}
      <div className="to-2 absolute left-2 z-10 md:top-4 md:left-4">
        <span
          className={`rounded-full px-2 py-1 text-[8px] font-bold shadow-lg md:px-3 md:py-1.5 md:text-xs ${
            product.badge === "BEST SELLER"
              ? "bg-success text-success-foreground"
              : product.badge === "TRENDING"
                ? "bg-rating text-rating-foreground"
                : product.badge === "HOT"
                  ? "bg-danger text-danger-foreground"
                  : product.badge === "NEW"
                    ? "bg-success text-success-foreground"
                    : "bg-success text-success-foreground"
          }`}
        >
          {product.badge}
        </span>
      </div>

      {/* Image */}
      <div className="img-primary-bg relative h-30 overflow-hidden md:h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-2 md:p-6">
        {/* Brand + Rating */}
        <div className="mb-1 flex items-center justify-between md:mb-2">
          <span className="text-[15px] font-semibold uppercase md:text-lg">{product.brand}</span>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`text-rating h-3 w-3 md:h-4 md:w-4 lg:h-4 lg:w-4 ${
                  i < Math.floor(product.rating) ? "fill-current" : ""
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-[8px] md:text-xs">({product.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-muted-foreground mb-1 line-clamp-2 h-4 text-[10px] font-semibold sm:sm:h-auto md:mb-2 md:text-sm">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-2 flex items-center space-x-2 md:mb-4">
          <span className="text-sm font-bold md:text-xl">{product.price}</span>
          <span className="text-sm line-through md:text-lg">{product.originalPrice}</span>
          <span className="rounded px-2 py-1 text-[8px] font-semibold md:text-sm">
            {product.discount}
          </span>
        </div>

        {/* Colors + Sizes */}
        <div className="mb-2 flex items-center justify-between md:mb-4">
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
          className="bg-button-primary flex justify-center rounded-lg px-2 py-2 text-[8px] font-semibold text-white md:px-4 md:py-3 md:text-[13px]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
