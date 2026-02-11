"use client"

import CategoryTopBar from "@/utils/categoryTopBar";
import FilterSidebar from "@/utils/filterSideBar";
import ProductGrid from "@/utils/productGrid";
import { ManProductData } from "@/data/category-products";
import { FilterState, Product } from "@/types";
import { useState, useEffect, useMemo } from "react";
import CategoryLayout from "@/utils/categoryLayout";

export default function MensCategoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [quickViewOpen, setQuickViewOpen] = useState(false);

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
  const [products] = useState<Product[]>(ManProductData as Product[]);

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

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "BEST SELLER":
        return "bg-danger text-danger-foreground";
      case "NEW":
        return "bg-success text-success-foreground";
      case "TRENDING":
        return "bg-rating text-rating-foreground ";
      case "LIMITED":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-success text-success-foreground";
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <CategoryLayout
      sidebar={
        <FilterSidebar
          filters={filters}
          filterOptions={filterOptions}
          showFilters={showFilters}
          toggleFilter={toggleFilter}
          setFilters={setFilters}
          clearAllFilters={clearAllFilters}
        />
      }
      topbar={
        <CategoryTopBar
          filters={filters}
          productsLength={products.length}
          filteredLength={filteredProducts.length}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filterOptions={filterOptions}
          toggleFilter={toggleFilter}
          setFilters={setFilters}
        />
      }
    >
      <ProductGrid
        products={filteredProducts}
        isLoading={isLoading}
        viewMode={viewMode}
        getBadgeColor={getBadgeColor}
      />
    </CategoryLayout>
  );
}
