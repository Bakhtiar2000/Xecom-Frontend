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
    const {
        handlePageChange,
        handlePageSizeChange,
        getPaginationParams,
        resetPage,
    } = useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });

    const buildQueryParams = () => {
        const params = [...getPaginationParams(), ...getSortParams()];

        if (debouncedSearchTerm)
            params.push({ name: "searchTerm", value: debouncedSearchTerm });
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
            const errorMessage =
                error?.data?.message || error?.message || "Failed to delete category";
            toast.error(errorMessage);
        }
    };

    const hasActiveFilters = debouncedSearchTerm || isActive;

    return (
        <>
            {/* Filters Section */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                {/* Search Input */}
                <div className="relative max-w-80 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or description..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className={`pl-9 ${searchTerm ? "border-primary bg-primary/5" : ""}`}
                    />
                </div>

                <div className="flex flex-wrap lg:flex-row lg:justify-end items-center gap-4">
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
                            className="hover:text-white hover:bg-danger hover:border-danger duration-300 gap-2"
                        >
                            <X className="h-4 w-4" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="relative rounded-md border border-border mt-4 lg:mt-6">
                {/* Loading Spinner for Refetch */}
                {isRefetching && (
                    <div className="absolute top-3 right-3 z-10">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                )}

                <div className={`transition-opacity duration-200 ${isRefetching ? 'opacity-60 pointer-events-none' : ''}`}>
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
                                <TableError colSpan={7}>
                                    Error loading categories. Please try again.
                                </TableError>
                            ) : categories.length === 0 ? (
                                <TableEmpty colSpan={7}>No categories found</TableEmpty>
                            ) : (
                                categories.map((category: TCategory) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            {category.imageUrl ? (
                                                <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
                                                    <Image
                                                        src={category.imageUrl}
                                                        alt={category.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                                                    <Folder className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground line-clamp-2">
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
                                            <span className="font-medium">
                                                {category._count?.products ?? 0}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">{category.sortOrder}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onEdit(category)}
                                                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteClick(category)}
                                                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
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
