import React from "react";
import { Grid, List, SlidersHorizontal, ChevronUp, ChevronDown } from "lucide-react";
import { FilterState } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = {
  value: string;
  label: string;
};

type FilterOptions = {
  sortOptions: SortOption[];
};

type Props = {
  filters: FilterState;
  productsLength: number;
  filteredLength: number;
  viewMode: "grid" | "list";
  setViewMode: (v: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  filterOptions: FilterOptions;
  toggleFilter: (type: keyof FilterState, value: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};
const MAX_PRICE = 10000;

export default function ProductTopBar({
  filters,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  filterOptions,
  setFilters,
}: Props) {
  return (
    <div className="bg-card-primary mb-2 rounded-lg px-4 py-2">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {/* Left Info */}
        <div>
          {/* Price Range */}
          <div className="">
            <div className="flex items-center justify-center gap-5 space-y-4">
              {/* Dual Range Track */}
              <div className="relative h-2 min-w-60">
                <h3 className="mt-4 text-center font-semibold">Price Range</h3>

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
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="bg-background hidden items-center rounded-lg p-1 md:flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`cursor-pointer rounded p-2 ${viewMode === "grid" ? "bg-card-primary shadow" : ""}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`cursor-pointer rounded p-2 ${viewMode === "list" ? "bg-card-primary shadow" : ""}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Sort */}
          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: value,
              }))
            }
          >
            <SelectTrigger className="hidden w-50 lg:flex">
              <span className="text-sm font-medium">Sort options:</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-button-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white lg:hidden"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
