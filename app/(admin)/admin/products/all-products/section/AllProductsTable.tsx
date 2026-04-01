import CustomSelect, { SelectOption } from "@/components/custom/CustomSelect";
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
import { API_URL } from "@/redux/api/baseApi";
import { useGetAllAttributesQuery } from "@/redux/features/product/attribute.api";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/product.api";
import { TAttribute, TProduct } from "@/types";
import { Eye, Loader2, MoreHorizontal, Package, Pencil, Search, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AttributeFilter } from "./AttributeFilter";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type SortableFields = "name" | "totalSales" | "viewCount" | "avgRating";

const AllProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttributeValues, setSelectedAttributeValues] = useState<Record<string, string[]>>(
    {}
  );
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>([]);

  const { handlePageChange, handlePageSizeChange, getPaginationParams, resetPage } =
    useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });

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

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const openDeleteModal = (id: string) => {
    setDeleteTargetId(id);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteProduct(deleteTargetId).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product", error);
    } finally {
      setDeleteTargetId(null);
    }
  };

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm);

  //  buildQueryParams to:
  const buildQueryParams = () => {
    const params = [...getPaginationParams(), ...getSortParams()];

    if (debouncedSearchTerm) params.push({ name: "searchTerm", value: debouncedSearchTerm });

    // Flatten all attribute values and send each as attributeValueIds
    const allAttributeValueIds = Object.values(selectedAttributeValues).flat();
    allAttributeValueIds.forEach((valueId) => {
      params.push({ name: "attributeValueIds", value: valueId });
    });

    // Add category IDs
    selectedCategories.forEach((category) => {
      params.push({ name: "categoryIds", value: category.value.toString() });
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

  const totalActiveFilters = [
    ...Object.values(selectedAttributeValues).flat(),
    ...selectedCategories.map((c) => c.value),
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedAttributeValues({});
    setSelectedCategories([]);
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
              <AttributeFilter
                key={attr.id}
                attribute={attr}
                selectedValues={selectedVals}
                onValuesChange={(vals) => {
                  setSelectedAttributeValues((prev) => ({ ...prev, [attrKey]: vals }));
                  handleFilterChange();
                }}
              />
            );
          })}

          <div
            className={`max-w-64 min-w-44 ${selectedCategories.length ? "[&_button]:border-primary [&_button]:bg-primary/5" : ""}`}
          >
            <CustomSelect
              endpoint={`${API_URL}/category`}
              fields={["name", "id"]}
              mapToOption={(item) => ({
                value: item.id,
                label: item.name,
              })}
              value={selectedCategories}
              onChange={(vals) => {
                setSelectedCategories(vals as SelectOption[]);
                handleFilterChange();
              }}
              multiSelect
              searchable
              paginated
              placeholder="All Categories"
            />
          </div>

          {/* — Clear all button */}
          {totalActiveFilters > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-destructive hover:text-destructive/80 border-destructive/30 flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1.5 text-xs transition-colors"
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
                            src={product.images[0].imageUrl || "/placeholder-product.png"}
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
                          <span className="font-medium">
                            {Number(product.avgRating).toFixed(1)}
                          </span>
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
                            onClick={() => openDeleteModal(product.id)}
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

        <AlertDialog
          open={!!deleteTargetId}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product and remove it
                from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AllProductsTable;
