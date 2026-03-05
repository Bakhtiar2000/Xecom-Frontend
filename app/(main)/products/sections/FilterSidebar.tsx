import { FilterState } from "@/types";
import { Check } from "lucide-react";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type FilterOptions = {
  brands: { id: string; name: string }[];
  sizes: { id: string; value: string }[];
  colors: { id: string; name: string; value: string }[];
  materials: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  targets: string[];

};

type Brand = {
  id: string;
  name: string;
  _count?: {
    products: number;
  };
};

type Props = {
  filters: FilterState;
  filterOptions: FilterOptions;
  brands: Brand[];
  showFilters: boolean;
  toggleFilter: (type: keyof FilterState, value: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearAllFilters: () => void;
};

export default function FilterSidebar({
  filters,
  filterOptions,
  brands,
  showFilters,
  toggleFilter,
  setFilters,
  clearAllFilters,
}: Props) {
  return (
    <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
      <div className="bg-card-primary sticky top-24 rounded-lg p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={clearAllFilters}
            className="text-button-secondary cursor-pointer text-sm"
          >
            Clear All
          </button>
        </div>
        {/* Price Range */}
        <div className="mb-8">
          <h3 className="mb-4 font-semibold">Price Range</h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>TK{filters.priceRange[0]}</span>
              <span>TK{filters.priceRange[1]}</span>
            </div>

            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], Number(e.target.value)],
                }))
              }
              className="h-2 w-full rounded-lg"
            />
          </div>
        </div>

        {/* Brands */}
        <div className="mb-8">
          <h3 className="mb-4 font-semibold">Brands</h3>
          <div className="space-y-3">
            {brands.map((brand) => (
              <label key={brand.id} className="flex cursor-pointer items-center gap-3">
                <Checkbox
                  checked={filters.brands.includes(brand.id)}
                  onCheckedChange={() => toggleFilter("brands", brand.id)}
                />
                <span>{brand.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <h3 className="mb-4 font-semibold">Sizes</h3>
          <div className="grid grid-cols-3 gap-2">
            {filterOptions.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => toggleFilter("sizes", size.id)}
                className={`rounded py-2 ${filters.sizes.includes(size.id)
                  ? "bg-button-primary text-white"
                  : "bg-muted text-black dark:text-white"
                  }`}
              >
                {size.value}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-8">
          <h3 className="mb-4 font-semibold">Colors</h3>
          <div className="grid grid-cols-4 gap-3">
            {filterOptions.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => toggleFilter("colors", color.id)}
                className={`relative h-8 w-8 rounded-full border-2 ${filters.colors.includes(color.id)
                  ? "border-button-secondary"
                  : "border-muted"
                  }`}
              >
                <div
                  className="h-full w-full rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                {filters.colors.includes(color.id) && (
                  <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-4 font-semibold">Categories</h3>
          <div className="space-y-3">
            {filterOptions.categories.map((category) => (
              <label key={category.id} className="flex cursor-pointer items-center gap-3">
                <Checkbox
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => toggleFilter("categories", category.id)}
                />
                <span className="capitalize">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
