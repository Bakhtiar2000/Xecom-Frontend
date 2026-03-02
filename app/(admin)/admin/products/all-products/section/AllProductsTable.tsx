import CustomSelect, { SelectOption } from "@/components/custom/customSelect";
import { SortableTableHead } from "@/components/custom/SortableTableHead";
import { TablePagination } from "@/components/custom/TablePagination";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableError,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useTableSort } from "@/hooks/useTableSort";
import { useGetAllAttributesQuery } from "@/redux/features/product/attribute.api";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { TAttribute, TProduct } from "@/types";
import { Eye, Loader2, MoreHorizontal, Package, Pencil, Search, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
type SortableFields = "name" | "totalSales" | "viewCount" | "avgRating";

const AllProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttributeValues, setSelectedAttributeValues] = useState<Record<string, string[]>>(
    {}
  );
  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>([]);

  const { handlePageChange, handlePageSizeChange, getPaginationParams, resetPage } =
    useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });

  const FAKE_CATEGORIES = Array.from({ length: 80 }, (_, i) => ({
    value: `cat-${i + 1}`,
    label:
      [
        "Electronics",
        "Clothing",
        "Food",
        "Home",
        "Sports",
        "Books",
        "Toys",
        "Beauty",
        "Automotive",
        "Health",
      ][i % 10] + (i >= 10 ? ` (${Math.floor(i / 10) + 1})` : ""),
  }));

  async function fetchCategories({ search, page, pageSize }) {
    await new Promise((r) => setTimeout(r, 300));
    const filtered = FAKE_CATEGORIES.filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase())
    );
    const start = (page - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      hasMore: start + pageSize < filtered.length,
    };
  }

  const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();

  const handleSortClick = (field: SortableFields) => {
    handleSort(field);
    resetPage();
  };
  const handleFilterChange = () => {
    resetPage();
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    resetPage();
  };

  const handleView = (id: string) => {
    console.log("view", id);
  };

  const handleEdit = (id: string) => {
    console.log("edit ", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete product:", id);
  };

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm);

  //  buildQueryParams to:
  const buildQueryParams = () => {
    const params = [...getPaginationParams(), ...getSortParams()];

    if (debouncedSearchTerm) params.push({ name: "searchTerm", value: debouncedSearchTerm });
    Object.entries(selectedAttributeValues).forEach(([attrName, values]) => {
      if (values.length) params.push({ name: attrName, value: values.join(",") });
    });

    return params;
  };
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery(buildQueryParams());
  const products = data?.data || [];
  const hasNoData = products.length === 0 && !isLoading;
  const isRefetching = isFetching && !isLoading;

  const { data: attributesData } = useGetAllAttributesQuery(undefined);
  const attributes: TAttribute[] = attributesData?.data || [];
  console.log("attribute data", attributesData);

  const activeFilters = [
    ...attributes.flatMap((attr) =>
      (selectedAttributeValues[attr.name.toLowerCase()] ?? []).map((valId) => {
        const attrVal = attr.values.find((v) => v.id === valId);
        return attrVal
          ? {
              label: attrVal.value,
              hexCode: attrVal.hexCode ?? null,
              onRemove: () => {
                setSelectedAttributeValues((prev) => ({
                  ...prev,
                  [attr.name.toLowerCase()]: (prev[attr.name.toLowerCase()] ?? []).filter(
                    (id) => id !== valId
                  ),
                }));
                resetPage();
              },
            }
          : null;
      })
    ),
  ].filter(Boolean) as { label: string; hexCode: string | null; onRemove: () => void }[];

  const totalActiveFilters = [...Object.values(selectedAttributeValues).flat()].filter(
    Boolean
  ).length;

  const clearAllFilters = () => {
    setSelectedAttributeValues({});
    resetPage();
  };
  return (
    <div>
      {/* Filters (unchanged) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={`pl-9 ${searchTerm ? "border-primary bg-primary/5" : ""}`}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* all attribute */}
          {attributes.map((attr) => {
            const attrKey = attr.name.toLowerCase();
            const selectedVals = selectedAttributeValues[attrKey] ?? [];

            return (
              <MultiSelect
                key={attr.id}
                values={selectedVals}
                onValuesChange={(vals) => {
                  setSelectedAttributeValues((prev) => ({ ...prev, [attrKey]: vals }));
                  handleFilterChange();
                }}
              >
                <MultiSelectTrigger
                  className={`bg-card-primary max-w-100 min-w-36 ${selectedVals.length ? "border-primary bg-primary/5" : ""}`}
                >
                  <MultiSelectValue placeholder={`All ${attr.name}s`} />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {attr.values.map((v) => (
                      <MultiSelectItem key={v.id} value={v.id}>
                        <span className="flex items-center gap-2">
                          {v.hexCode && (
                            <span
                              className="border-muted-foreground/30 inline-block h-3.5 w-3.5 shrink-0 rounded-full border"
                              style={{ backgroundColor: v.hexCode }}
                            />
                          )}
                          {v.value}
                        </span>
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
            );
          })}

          <div
            className={`max-w-64 min-w-44 ${selectedCategories.length ? "[&_button]:border-primary [&_button]:bg-primary/5" : ""}`}
          >
            <CustomSelect
              fetchOptions={fetchCategories}
              value={selectedCategories}
              onChange={(vals) => {
                setSelectedCategories(vals as SelectOption[]);
                handleFilterChange();
              }}
              multiSelect
              searchable
              placeholder="All Categories"
              pageSize={20}
            />
          </div>

          {/* — Clear all button */}
          {totalActiveFilters > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-destructive hover:text-destructive/80 border-destructive/30 flex items-center gap-1 rounded-md border px-2 py-1.5 text-xs transition-colors"
            >
              <X className="h-3 w-3" />
              Clear ({totalActiveFilters})
            </button>
          )}
        </div>
      </div>

      <div
        className={`relative transition-opacity duration-200 ${isRefetching ? "pointer-events-none opacity-60" : ""}`}
      >
        {/* Loading Spinner for Refetch */}
        {isRefetching && (
          <div className="absolute top-3 right-3 z-10">
            <Loader2 className="text-primary h-5 w-5 animate-spin" />
          </div>
        )}
        {/* active attribute  */}
        {activeFilters.length > 0 && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-xs">Active filters:</span>
            {activeFilters.map((filter, idx) => (
              <span
                key={idx}
                className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
              >
                {filter.hexCode && (
                  <span
                    className="border-primary/30 h-3 w-3 shrink-0 rounded-full border"
                    style={{ backgroundColor: filter.hexCode }}
                  />
                )}
                {filter.label}
                <button onClick={filter.onRemove}>
                  <X className="hover:text-destructive ml-0.5 h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="border-border relative mt-4 rounded-md border lg:mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableTableHead
                  field="name"
                  label="Product"
                  onSort={handleSortClick}
                  getSortIcon={getSortIcon}
                  disabled={hasNoData}
                />
                <TableHead>Max Order Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>

                <SortableTableHead
                  field="avgRating"
                  label="Rating"
                  onSort={handleSortClick}
                  getSortIcon={getSortIcon}
                  disabled={hasNoData}
                />
                <SortableTableHead
                  field="totalSales"
                  label="Sales"
                  onSort={handleSortClick}
                  getSortIcon={getSortIcon}
                  disabled={hasNoData}
                />
                <SortableTableHead
                  field="viewCount"
                  label="Views"
                  onSort={handleSortClick}
                  getSortIcon={getSortIcon}
                  disabled={hasNoData}
                />
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoading colSpan={8} rows={5} />
              ) : isError ? (
                <TableError colSpan={8}>Error loading users. Please try again.</TableError>
              ) : products.length === 0 ? (
                <TableEmpty colSpan={8}>No users found</TableEmpty>
              ) : (
                products.map((product: TProduct) => (
                  <TableRow key={product.id} className="bg-card-primary">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="bg-muted flex h-12 w-12 items-center justify-center rounded">
                            <Package className="text-muted-foreground h-6 w-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-muted-foreground line-clamp-1 text-xs">
                            {product.shortDescription}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product?.maxOrderQty}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.featured ? (
                        <Badge variant="default" className="bg-rating">
                          Featured
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-card-primary">
                          No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.avgRating ? (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{product.avgRating.toFixed(1)}</span>
                          <span className="text-muted-foreground text-xs">
                            ({product.reviewCount})
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No reviews</span>
                      )}
                    </TableCell>
                    <TableCell>{product.totalSales}</TableCell>
                    <TableCell>{product.viewCount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="hover:bg-muted rounded-md p-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(product.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleDelete(product.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {data?.meta && (
          <TablePagination
            meta={data.meta}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            disabled={hasNoData}
          />
        )}
      </div>
    </div>
  );
};

export default AllProductsTable;
