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
  clearAllFilters,
  isBrandsLoading,
  isCategoriesLoading,
}: Props) {
  return (
    <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
      {/* Scoped scrollbar style */}
      <style>{`
        .filter-sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .filter-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .filter-sidebar-scroll::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 999px;
        }
        .filter-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
      `}</style>

      <div
        className="filter-sidebar-scroll bg-card-primary sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg p-6 shadow-sm"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={clearAllFilters}
            className="text-button-secondary cursor-pointer text-sm"
          >
            Clear All
          </button>
        </div>
        {/* Brands */}
        <div className="mb-4">
          <h3 className="mb-2 font-semibold">Brands</h3>
          <div className="space-y-1">
            {isBrandsLoading ? (
              <FilterSkeletonList count={5} />
            ) : (
              brands.map((brand) => (
                <label key={brand.id} className="flex cursor-pointer items-center gap-2">
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
          <div key={attr.id} className="mb-4">
            <h3 className="mb-2 font-semibold capitalize">{attr.name}</h3>

            {attr.type === "color" && (
              <div className="grid grid-cols-6 gap-1">
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
              <div className="grid grid-cols-5 gap-1">
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
              <div className="space-y-1">
                {attr.values.map((v) => (
                  <label key={v.id} className="flex cursor-pointer items-center gap-2">
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
          <div className="space-y-1">
            {isCategoriesLoading ? (
              <FilterSkeletonList count={6} />
            ) : (
              filterOptions.categories.map((category) => (
                <label key={category.id} className="flex cursor-pointer items-center gap-2">
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
