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

export default function ProductTopBar({
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
    <div className="bg-card-primary mb-6 rounded-lg p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {/* Left Info */}
        <div>
          <p className="font-semibold">
            Showing <span className="text-muted-foreground font-semibold">{filteredLength}</span> of{" "}
            <span className="text-muted-foreground font-semibold">{productsLength}</span> products
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="bg-background hidden items-center rounded-lg p-1 md:flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded p-2 ${viewMode === "grid" ? "bg-card-primary shadow" : ""}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded p-2 ${viewMode === "list" ? "bg-card-primary shadow" : ""}`}
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
