"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  ChevronDown,
  ChevronUp,
  Check,
  X,
 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ManProductData } from "@/data/category_Products";
interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  image: string;
  badge?: "BEST SELLER" | "NEW" | "TRENDING" | "LIMITED" | "CLASSIC";
  inStock: boolean;
  deliveryTime: string;
  features: string[];
}

interface FilterState {
  brands: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  categories: string[];
  sortBy: string;
}

export default function MensCategoryPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    categories: [],
    sortBy: "featured",
  });

  // Available filter options
  const filterOptions = {
    brands: [
      "Nike",
      "Adidas",
      "Puma",
      "New Balance",
      "Reebok",
      "Converse",
      "Vans",
      "Under Armour",
    ],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12", "13"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Blue", value: "#3B82F6" },
      { name: "Red", value: "#EF4444" },
      { name: "Green", value: "#10B981" },
      { name: "Gray", value: "#6B7280" },
      { name: "Orange", value: "#F97316" },
      { name: "Purple", value: "#8B5CF6" },
    ],
    categories: [
      "Running",
      "Casual",
      "Basketball",
      "Training",
      "Skateboarding",
      "Lifestyle",
      "Slippers",
    ],
    sortOptions: [
      { value: "featured", label: "Featured" },
      { value: "newest", label: "Newest" },
      { value: "price-low", label: "Price: Low to High" },
      { value: "price-high", label: "Price: High to Low" },
      { value: "rating", label: "Highest Rated" },
      { value: "popular", label: "Most Popular" },
    ],
  };

  // Product data
  const [products, setProducts] = useState<Product[]>(
    ManProductData as Product[]
  );

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    // Filter by brands
    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Filter by sizes
    if (filters.sizes.length > 0) {
      result = result.filter((product) =>
        product.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    // Filter by colors
    if (filters.colors.length > 0) {
      result = result.filter((product) =>
        product.colors.some((color) => filters.colors.includes(color))
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "popular":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        const badgePriority = {
          "BEST SELLER": 4,
          TRENDING: 3,
          NEW: 2,
          LIMITED: 1,
          CLASSIC: 0,
        };
        result.sort((a, b) => {
          const aPriority = a.badge ? badgePriority[a.badge] || 0 : 0;
          const bPriority = b.badge ? badgePriority[b.badge] || 0 : 0;
          return bPriority - aPriority;
        });
    }

    return result;
  }, [filters, products]);

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[type] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [type]: currentValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [type]: [...currentValues, value],
        };
      }
    });
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      categories: [],
      sortBy: "featured",
    });
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "BEST SELLER":
        return "bg-red-500 text-white";
      case "NEW":
        return "bg-green-500 text-white";
      case "TRENDING":
        return "bg-purple-500 text-white";
      case "LIMITED":
        return "bg-yellow-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5s delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="w-11/12 mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      TK{filters.priceRange[0]}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      TK{filters.priceRange[1]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: [
                          prev.priceRange[0],
                          parseInt(e.target.value),
                        ],
                      }))
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            parseInt(e.target.value) || 0,
                            prev.priceRange[1],
                          ],
                        }))
                      }
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                    <span className="self-center">to</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            prev.priceRange[0],
                            parseInt(e.target.value) || 500,
                          ],
                        }))
                      }
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Brands
                </h3>
                <div className="space-y-2">
                  {filterOptions.brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleFilter("brands", brand)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Sizes
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {filterOptions.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleFilter("sizes", size)}
                      className={`py-2 rounded-lg text-center ${
                        filters.sizes.includes(size)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Colors
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {filterOptions.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleFilter("colors", color.value)}
                      className={`relative w-8 h-8 rounded-full border-2 ${
                        filters.colors.includes(color.value)
                          ? "border-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      title={color.name}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      {filters.colors.includes(color.value) && (
                        <Check className="absolute inset-0 m-auto w-5 h-5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {filterOptions.categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleFilter("categories", category)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {filteredProducts.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {products.length}
                    </span>{" "}
                    products
                  </p>
                  {Object.values(filters).some((filter) =>
                    Array.isArray(filter)
                      ? filter.length > 0
                      : filter !== "featured"
                  ) && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {filters.brands.map((brand) => (
                        <span
                          key={brand}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm flex items-center"
                        >
                          {brand}
                          <button
                            onClick={() => toggleFilter("brands", brand)}
                            className="ml-2 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      {filters.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm flex items-center"
                        >
                          {size}
                          <button
                            onClick={() => toggleFilter("sizes", size)}
                            className="ml-2 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid"
                          ? "bg-white dark:bg-gray-600 shadow"
                          : ""
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list"
                          ? "bg-white dark:bg-gray-600 shadow"
                          : ""
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Sort By */}
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        Sort by: {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                    {showFilters ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Filter className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your filters or browse our full collection
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            ) : isLoading ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "space-y-6"
                }
              >
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className={`group relative cart-sec-bg rounded-sm overflow-hidden shadow-sm animate-pulse ${
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
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    </div>

                    <div
                      className={`p-6 space-y-3 ${
                        viewMode === "list" ? "flex-1" : ""
                      }`}
                    >
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
                            <Skeleton
                              key={i}
                              className="w-4 h-4 rounded-full"
                            />
                          ))}
                        </div>
                        <Skeleton className="h-3 w-16 rounded" />
                      </div>

                      <Skeleton className="h-11 w-full rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "space-y-6"
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group relative cart-sec-bg rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 ${
                      viewMode === "list" ? "flex flex-col md:flex-row" : ""
                    }`}
                  >
                    {/* Badge */}
                    {product.badge && (
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(
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
                        className="object-contain transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Out of Stock Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div
                      className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                    >
                      {/* Brand & Rating */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold treanding-base-text uppercase tracking-wide">
                          {product.brand}
                        </span>
                        <div className="flex items-center">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-current"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs treanding-base-text ml-1">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-semibold tranding-secondry-text mb-2 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold tranding-secondry-text">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <>
                              <span className="text-sm treanding-base-text line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                -{product.discount}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Colors & Sizes */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-1">
                          {product.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-xs treanding-base-text">
                          {product.sizes.length} sizes
                        </span>
                      </div>
                      <div>
                        {viewMode === "list" && (
                          <Link
                            href={`/Product/${product.id}`}
                            className="w-40 button-base-bg text-primary py-3 mb-3 px-4 rounded-lg font-semibold hover:bg-gray-800  flex items-center justify-center space-x-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span>
                              {!product.inStock
                                ? "Out of Stock"
                                : "Add to Cart"}
                            </span>
                          </Link>
                        )}
                      </div>

                      {/* Add to Cart */}
                      {viewMode === "grid" && (
                        <div className="flex space-x-2">
                          <Link
                            href={`/Product/${product.id}`}
                            className="flex-1 button-base-bg text-primary py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span>
                              {!product.inStock
                                ? "Out of Stock"
                                : "Add to Cart"}
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick View Modal */}
            {quickViewOpen && selectedProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  {/* Modal content would go here */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
