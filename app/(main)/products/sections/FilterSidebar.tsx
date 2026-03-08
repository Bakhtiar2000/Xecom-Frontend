import { FilterState } from "@/types";
import { Check } from "lucide-react";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type FilterOptions = {
  brands: { id: string; name: string }[];
  extraAttributes: {
    id: string;
    name: string;
    type: "color" | "size" | "checkbox";
    values: { id: string; label: string; hexCode?: string }[];
  }[];
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

        {/* Dynamic Attributes (sizes, colors, and others) */}
        {filterOptions.extraAttributes.map((attr) => (
          <div key={attr.id} className="mb-8">
            <h3 className="mb-4 font-semibold capitalize">{attr.name}</h3>

            {attr.type === "color" && (
              <div className="grid grid-cols-4 gap-3">
                {attr.values.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => toggleFilter("colors", v.id)}
                    className={`relative h-8 w-8 rounded-full border-2 ${
                      filters.colors.includes(v.id) ? "border-button-secondary" : "border-muted"
                    }`}
                  >
                    <div
                      className="h-full w-full rounded-full"
                      style={{ backgroundColor: v.hexCode }}
                    />
                    {filters.colors.includes(v.id) && (
                      <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {attr.type === "size" && (
              <div className="grid grid-cols-3 gap-2">
                {attr.values.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => toggleFilter("sizes", v.id)}
                    className={`rounded py-2 text-sm ${
                      filters.sizes.includes(v.id)
                        ? "bg-button-primary text-white"
                        : "bg-muted text-black dark:text-white"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            {attr.type === "checkbox" && (
              <div className="space-y-3">
                {attr.values.map((v) => (
                  <label key={v.id} className="flex cursor-pointer items-center gap-3">
                    <Checkbox
                      checked={filters.attributes.includes(v.id)}
                      onCheckedChange={() => toggleFilter("attributes", v.id)}
                    />
                    <span className="capitalize">{v.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

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
