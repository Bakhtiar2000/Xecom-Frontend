import React from "react";
import {
  Grid,
  List,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { FilterState } from "@/types";

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

export default function CategoryTopBar({
  filters,
  productsLength,
  filteredLength,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  filterOptions,
  toggleFilter,
  setFilters,
}: Props) {
  return (
    <div className="bg-card-primary rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Info */}
        <div>
          <p className="font-semibold">
            Showing{" "}
            <span className="font-semibold text-muted-foreground">
              {filteredLength}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-muted-foreground">
              {productsLength}
            </span>{" "}
            products
          </p>

        
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          
          {/* View Toggle */}
          <div className="hidden md:flex items-center bg-background rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid" ? "bg-card-primary shadow" : ""
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list" ? "bg-card-primary shadow" : ""
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: e.target.value,
              }))
            }
            className="px-4 hidden lg:block py-2 border border-muted-foreground bg-background rounded-lg"
          >
            {filterOptions.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by: {option.label}
              </option>
            ))}
          </select>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
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
  );
}
