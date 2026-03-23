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
  isBrandsLoading: boolean;
  isCategoriesLoading: boolean;
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
  isBrandsLoading: boolean;
  isCategoriesLoading: boolean;
};

const MAX_PRICE = 10000;

// Skeleton component
const FilterSkeletonList = ({ count = 5 }: { count?: number }) => (
  <div className="flex flex-col gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className="bg-muted h-4 w-4 animate-pulse rounded" />
        <div
          className="bg-muted h-4 animate-pulse rounded"
          style={{ width: `${60 + (i % 3) * 20}px` }}
        />
      </div>
    ))}
  </div>
);

export default function FilterSidebar({
  filters,
  filterOptions,
  brands,
  showFilters,
  toggleFilter,
  setFilters,
  clearAllFilters,
  isBrandsLoading,
  isCategoriesLoading,
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
            {/* Dual Range Track */}
            <div className="relative h-2 w-full">
              {/* Gray background track */}
              <div className="bg-muted absolute top-0 left-0 h-2 w-full rounded-full" />

              {/* Active range highlight */}
              <div
                className="bg-button-primary absolute top-0 h-2 rounded-full"
                style={{
                  left: `${(filters.priceRange[0] / MAX_PRICE) * 100}%`,
                  right: `${100 - (filters.priceRange[1] / MAX_PRICE) * 100}%`,
                }}
              />

              {/* Min thumb */}
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), filters.priceRange[1] - 1);
                  setFilters((prev) => ({ ...prev, priceRange: [val, prev.priceRange[1]] }));
                }}
                className="[&::-webkit-slider-thumb]:ring-button-primary pointer-events-none absolute top-0 left-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:ring-2"
              />

              {/* Max thumb */}
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), filters.priceRange[0] + 1);
                  setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], val] }));
                }}
                className="[&::-webkit-slider-thumb]:ring-button-primary pointer-events-none absolute top-0 left-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:ring-2"
              />
            </div>

            {/* Min / Max Input Fields */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-muted-foreground mb-1 block text-xs">Min</label>
                <div className="border-border flex items-center rounded-md border px-2 py-1.5">
                  <span className="text-muted-foreground text-xs">TK</span>
                  <input
                    type="number"
                    min="0"
                    max={filters.priceRange[1] - 1}
                    value={filters.priceRange[0]}
                    onChange={(e) => {
                      const val = Math.min(Number(e.target.value), filters.priceRange[1] - 1);
                      setFilters((prev) => ({ ...prev, priceRange: [val, prev.priceRange[1]] }));
                    }}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <span className="text-muted-foreground mt-4 text-sm">—</span>

              <div className="flex-1">
                <label className="text-muted-foreground mb-1 block text-xs">Max</label>
                <div className="border-border flex items-center rounded-md border px-2 py-1.5">
                  <span className="text-muted-foreground text-xs">TK</span>
                  <input
                    type="number"
                    min={filters.priceRange[0] + 1}
                    max={MAX_PRICE}
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      const val = Math.max(Number(e.target.value), filters.priceRange[0] + 1);
                      setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], val] }));
                    }}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brands */}
        <div className="mb-8">
          <h3 className="mb-4 font-semibold">Brands</h3>
          <div className="space-y-3">
            {isBrandsLoading ? (
              <FilterSkeletonList count={5} />
            ) : (
              brands.map((brand) => (
                <label key={brand.id} className="flex cursor-pointer items-center gap-3">
                  <Checkbox
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={() => toggleFilter("brands", brand.id)}
                  />
                  <span>{brand.name}</span>
                </label>
              ))
            )}
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
            {isCategoriesLoading ? (
              <FilterSkeletonList count={6} />
            ) : (
              filterOptions.categories.map((category) => (
                <label key={category.id} className="flex cursor-pointer items-center gap-3">
                  <Checkbox
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => toggleFilter("categories", category.id)}
                  />
                  <span className="capitalize">{category.name}</span>
                </label>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
