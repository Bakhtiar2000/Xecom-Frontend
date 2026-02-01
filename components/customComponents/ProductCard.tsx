"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sneaker } from "@/data/premium_shoes";

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
      className="group relative bg-card-primary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: isVisible
          ? `fadeInUp 0.6s ease-out ${index * 100}ms both`
          : "none",
      }}
    >
      {/* Badge */}
      <div className="absolute to-2 md:top-4 left-2 md:left-4 z-10">
        <span
          className={`md:px-3 px-2 py-1 md:py-1.5 rounded-full text-[8px] md:text-xs font-bold shadow-lg ${
            product.badge === "BEST SELLER"
              ? "bg-red-200 text-primary"
              : product.badge === "TRENDING"
              ? "bg-yellow-500 text-primary"
              : product.badge === "HOT"
              ? "bg-green-200 text-primary"
              : product.badge === "NEW"
              ? "text-primary"
              : "bg-blue-300 text-primary"
          }`}
        >
          {product.badge}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-30 md:h-64 img-primary-bg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="md:p-6  p-2 ">
        {/* Brand + Rating */}
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <span className="text-[15px] md:text-lg font-semibold  uppercase">
            {product.brand}
          </span>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`md:w-4 md:h-4 lg:h-4 lg:w-4 w-3 h-3 text-rating ${
                  i < Math.floor(product.rating) ? "fill-current" : ""
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[8px] md:text-xs  ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[10px] md:text-sm text-muted-foreground mb-1 sm:sm:h-auto h-4  md:mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-2 md:mb-4">
          <span className="text-sm md:text-xl font-bold ">
            {product.price}
          </span>
          <span className="text-sm md:text-lg line-through">
            {product.originalPrice}
          </span>
          <span className="text-[8px] md:text-sm font-semibold px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* Colors + Sizes */}
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex space-x-1">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full border shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-xs ">
            {product.sizes.length} sizes
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/Product/${product.id}`}
          className="text-white bg-button-primary py-2 px-2 md:py-3 md:px-4 text-[8px] md:text-[13px] rounded-lg  font-semibold flex justify-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
