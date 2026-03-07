"use client";

import { FilterState } from "@/types";
import { useState, useMemo } from "react";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { useSearchParams } from "next/navigation";
import { useGetAllBrandsQuery } from "@/redux/features/product/brand.api";
import { useGetAllAttributesQuery } from "@/redux/features/product/attribute.api";
import { useGetAllCategoriesQuery } from "@/redux/features/product/category.api";
import FilterSidebar from "./FilterSidebar";
import ProductTopBar from "./ProductTopBar";
import ProductGrid from "./ProductGrid";

export default function ProductContent() {
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);

    const { data: categoriesData } = useGetAllCategoriesQuery([]);



    const urlCategories = searchParams.get("categories");

    const [filters, setFilters] = useState<FilterState>({
        brands: [],
        priceRange: [0, 2500],
        sizes: [],
        colors: [],
        categories: urlCategories ? urlCategories.split(",").filter(Boolean) : [],
        targets: [],
        attributes: [],
        sortBy: "none",
    });




    // fetch attributes
    const { data: attributesData } = useGetAllAttributesQuery([]);
    const { data: brandsData } = useGetAllBrandsQuery([{ name: "fields", value: "name,id" }]);

    const filterOptions = useMemo(() => {
        const attributes = attributesData?.data ?? [];
        return {
            targets: ["men", "women", "kids"],
            extraAttributes: attributes.map((attr) => ({
                id: attr.id,
                name: attr.name,
                type: (
                    attr.name.toLowerCase() === "color" ? "color" :
                        attr.name.toLowerCase() === "size" ? "size" :
                            "checkbox"
                ) as "color" | "size" | "checkbox",
                values: attr.values.map((v) => ({
                    id: v.id,
                    label: v.value,
                    hexCode: v.hexCode ?? undefined,
                })),
            })),
            categories: categoriesData?.data?.map((c) => ({ id: c.id, name: c.name })) ?? [],
            sortOptions: [
                { label: "None", value: "none" },
                { label: "Price: Low to High", value: "price-low" },
                { label: "Price: High to Low", value: "price-high" },
                { label: "Newest", value: "newest" },
                { label: "Top Rated", value: "rating" },
                { label: "Most Popular", value: "popular" },
            ],
            brands: brandsData?.data || [],
        };
    }, [attributesData, brandsData, categoriesData]);

    const buildQueryParams = () => {
        const params: { name: string; value: string }[] = [];

        // Categories handles everything now (both audience-wide and specific)
        if (filters.categories.length > 0)
            params.push({ name: "categoryIds", value: filters.categories.join(",") });

        if (filters.brands.length > 0)
            params.push({ name: "brandIds", value: filters.brands.join(",") });

        const attributeValueIds = [...filters.sizes, ...filters.colors, ...filters.attributes];
        if (attributeValueIds.length > 0)
            params.push({ name: "attributeValueIds", value: attributeValueIds.join(",") });

        if (filters.sortBy === "price-low")
            params.push({ name: "sortBy", value: "price" }, { name: "sortOrder", value: "asc" });
        if (filters.sortBy === "price-high")
            params.push({ name: "sortBy", value: "price" }, { name: "sortOrder", value: "desc" });
        if (filters.sortBy === "newest")
            params.push({ name: "sortBy", value: "createdAt" }, { name: "sortOrder", value: "desc" });

        params.push({ name: "priceStarts", value: String(filters.priceRange[0]) });
        params.push({ name: "priceEnds", value: String(filters.priceRange[1]) });

        return params;
    };
    const { data, isLoading, isFetching } = useGetAllProductsQuery(buildQueryParams());

    const filteredProducts = useMemo(() => {
        const products = data?.data ?? [];
        const result = [...products];

        if (filters.sortBy === "rating") result.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));

        if (filters.sortBy === "popular")
            result.sort((a, b) => (b.totalSales ?? 0) - (a.totalSales ?? 0));

        return result;
    }, [filters.sortBy, data?.data]);

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
            targets: [],
            sortBy: "none",
            attributes: [],
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

    return (
        <div>
            <div className="container lg:-mt-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <FilterSidebar
                        filters={filters}
                        brands={brandsData?.data || []}
                        filterOptions={filterOptions}
                        showFilters={showFilters}
                        toggleFilter={toggleFilter}
                        setFilters={setFilters}
                        clearAllFilters={clearAllFilters}
                    />

                    <div className="flex-1">
                        <ProductTopBar
                            filters={filters}
                            productsLength={data?.meta?.totalCount ?? 0}
                            filteredLength={filteredProducts.length}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            showFilters={showFilters}
                            setShowFilters={setShowFilters}
                            filterOptions={filterOptions}
                            toggleFilter={toggleFilter}
                            setFilters={setFilters}
                        />

                        <ProductGrid
                            products={filteredProducts as any}
                            isLoading={isLoading || isFetching}
                            viewMode={viewMode}
                            getBadgeColor={getBadgeColor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
