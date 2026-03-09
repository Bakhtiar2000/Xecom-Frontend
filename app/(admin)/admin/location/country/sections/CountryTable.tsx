"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useAddCountryMutation,
  useDeleteCountryMutation,
  useGetAllCountriesQuery,
  useGetSingleCountryQuery,
} from "@/redux/features/location/country.api";


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
import { TCountry } from "@/types/location.type";
import { TablePagination } from "@/components/custom/TablePagination";
import { SortableTableHead } from "@/components/custom/SortableTableHead";
import { Search, X, Folder, Pencil, Trash2 } from "lucide-react";
import { useTableSort } from "@/hooks/useTableSort";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

type SortableFields = "name";

interface CountryTableProps {
  onEdit: (country: TCountry) => void;
}
 
export default function CountryTable({ onEdit }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [countryToDelete, setCountryToDelete] = useState<TCountry | null>(null);

    const [deleteCountry, { isLoading: isDeleting }] = useDeleteCountryMutation();

  const debouncedSearchTerm = useDebounce(searchTerm);

  const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();
  const { handlePageChange, handlePageSizeChange, getPaginationParams, resetPage } =
    useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });

  //   const buildQueryParams = () => {
  //     const params = [...getPaginationParams(), ...getSortParams()];

  //     if (debouncedSearchTerm)
  //       params.push({ name: "searchTerm", value: debouncedSearchTerm });
  //     if (selectedCountry) params.push({ name: "sort", value: selectedCountry });
  //     return params;
  //   };

  const buildQueryParams = () => {
    const params = [...getPaginationParams(), ...getSortParams()];

    // priority: select > search input
    const finalSearchTerm = selectedCountry || debouncedSearchTerm;

    if (finalSearchTerm) {
      params.push({ name: "searchTerm", value: finalSearchTerm });
    }

    return params;
  };

  const { data, isLoading, isError } = useGetAllCountriesQuery(buildQueryParams());

  const countries = data?.data || [];
  const hasNoData = countries.length === 0 && !isLoading;

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
    setSelectedCountry("");
    resetPage();
  };

    const handleDeleteClick = (country: TCountry) => {
      setCountryToDelete(country);
      setDeleteDialogOpen(true);
    };
  
    const handleConfirmDelete = async () => {
      if (!countryToDelete) return;
  
      try {
        const result = await deleteCountry(countryToDelete.id).unwrap();
        toast.success(result?.message || "Country deleted successfully");
        setDeleteDialogOpen(false);
        setCountryToDelete(null);
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || "Failed to delete Country";
        toast.error(errorMessage);
      }
    };


  const hasActiveFilters = debouncedSearchTerm || selectedCountry;

  return (
    <>
      {/* Filters Section */}

      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

      </div>

      <div className="border-border rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-20">Country Name</TableHead> */}
              <SortableTableHead
                field="name"
                label="Country Name"
                onSort={handleSortClick}
                getSortIcon={getSortIcon}
                disabled={hasNoData}
              />
              <TableHead>Total Divisions</TableHead>
              <TableHead className="w-24">Total Districts</TableHead>
              <TableHead className="w-32">Total Thanas</TableHead>
              {/* <TableHead className="w-24">Sort Order</TableHead> */}
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={7} rows={5} />
            ) : isError ? (
              <TableError colSpan={7}>Error loading countries. Please try again.</TableError>
            ) : countries.length === 0 ? (
              <TableEmpty colSpan={7}>No country found</TableEmpty>
            ) : (
              countries.map((country: TCountry) => (
                <TableRow key={country.id}>
                  <TableCell className="font-medium">
                    {country.code ? (
                      <p>
                        {country.name} {`(${country.code})`}
                      </p>
                    ) : (
                      <p>{country.name}</p>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{country._count?.divisions ?? 0}</TableCell>
                  <TableCell className="font-medium">{country._count?.districts ?? 0}</TableCell>
                  <TableCell className="font-medium">{country._count?.thanas ?? 0}</TableCell>
                  {/* <TableCell>
                          <span className="text-sm text-muted-foreground line-clamp-2">
                            {brand.description || "No description"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={brand.isActive ? "default" : "secondary"}
                            className={brand.isActive ? "bg-success" : ""}
                          >
                            {brand.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">
                            {brand._count?.products ?? 0}
                          </span>
                        </TableCell> */}
                  {/* <TableCell className="text-center">{brand.sortOrder}</TableCell> */}
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(country)}
                        className="hover:bg-primary/10 hover:text-primary h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(country)}
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

            {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the country &quot;
              {countryToDelete?.name}&quot;. This action cannot be undone.
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
