"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/redux/features/product/category.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
  TableLoading,
  TableError,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { TCategory } from "@/types/product.type";
import { TablePagination } from "@/components/custom/TablePagination";
import { SortableTableHead } from "@/components/custom/SortableTableHead";
import { Search, X, Folder, Pencil, Trash2, Loader2 } from "lucide-react";
import { useTableSort } from "@/hooks/useTableSort";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

type SortableFields = "name";

interface CategoryTableProps {
  onEdit: (category: TCategory) => void;
}

export function CategoryTable({ onEdit }: CategoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<TCategory | null>(null);

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();
  const { handlePageChange, handlePageSizeChange, getPaginationParams, resetPage } =
    useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });

  const buildQueryParams = () => {
    const params = [...getPaginationParams(), ...getSortParams()];

    if (debouncedSearchTerm) params.push({ name: "searchTerm", value: debouncedSearchTerm });
    if (isActive) params.push({ name: "isActive", value: isActive });
    return params;
  };

  const { data, isLoading, isFetching, isError } = useGetAllCategoriesQuery(buildQueryParams());

  const categories = data?.data || [];
  const hasNoData = categories.length === 0 && !isLoading;
  const isRefetching = isFetching && !isLoading;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    resetPage();
  };

  const handleFilterChange = () => {
    resetPage();
  };

  const handleSortClick = (field: SortableFields) => {
    handleSort(field);
    resetPage();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setIsActive("");
    resetPage();
  };

  const handleDeleteClick = (category: TCategory) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const result = await deleteCategory(categoryToDelete.id).unwrap();
      toast.success(result?.message || "Category deleted successfully");
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Failed to delete category";
      toast.error(errorMessage);
    }
  };

  const hasActiveFilters = debouncedSearchTerm || isActive;

  return (
    <>
      {/* Filters Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input */}
        <div className="relative w-full max-w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={`pl-9 ${searchTerm ? "border-primary bg-primary/5" : ""}`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 lg:flex-row lg:justify-end">
          {/* IsActive Filter */}
          <Select
            value={isActive}
            onValueChange={(value) => {
              setIsActive(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger
              className={isActive ? "border-primary bg-primary/5 min-w-32" : "min-w-32"}
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="hover:bg-danger hover:border-danger gap-2 duration-300 hover:text-white"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border-border relative mt-4 rounded-md border lg:mt-6">
        {/* Loading Spinner for Refetch */}
        {isRefetching && (
          <div className="absolute top-3 right-3 z-10">
            <Loader2 className="text-primary h-5 w-5 animate-spin" />
          </div>
        )}

        <div
          className={`transition-opacity duration-200 ${isRefetching ? "pointer-events-none opacity-60" : ""}`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <SortableTableHead
                  field="name"
                  label="Name"
                  onSort={handleSortClick}
                  getSortIcon={getSortIcon}
                  disabled={hasNoData}
                />
                <TableHead>Description</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-32">Total Products</TableHead>
                <TableHead className="w-24">Sort Order</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoading colSpan={7} rows={5} />
              ) : isError ? (
                <TableError colSpan={7}>Error loading categories. Please try again.</TableError>
              ) : categories.length === 0 ? (
                <TableEmpty colSpan={7}>No categories found</TableEmpty>
              ) : (
                categories.map((category: TCategory) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {category.imageUrl ? (
                        <div className="bg-muted relative h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={category.imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
                          <Folder className="text-muted-foreground h-6 w-6" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground line-clamp-2 text-sm">
                        {category.description || "No description"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={category.isActive ? "default" : "secondary"}
                        className={category.isActive ? "bg-success" : ""}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{category._count?.products ?? 0}</span>
                    </TableCell>
                    <TableCell className="text-center">{category.sortOrder}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(category)}
                          className="hover:bg-primary/10 hover:text-primary h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(category)}
                          className="hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category &quot;
              {categoryToDelete?.name}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
