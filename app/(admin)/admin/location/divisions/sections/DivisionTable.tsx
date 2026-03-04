"use client";

import { useState } from "react";
import { useGetAllDivisonQuery,useDeleteDivisionMutation } from "@/redux/features/location/division.api";
import { useGetAllCountriesQuery } from "@/redux/features/location/country.api";

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

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TDivision } from "@/types/location.type";
import { TablePagination } from "@/components/custom/TablePagination";
import { SortableTableHead } from "@/components/custom/SortableTableHead";
import { X, Pencil, Trash2 } from "lucide-react";
import { useTableSort } from "@/hooks/useTableSort";
import { useTablePagination } from "@/hooks/useTablePagination";
import { toast } from "sonner";

import { AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,} from "@/components/ui/alert-dialog";

type SortableFields = "name";

interface DivisionTableProps {
  onEdit: (division: TDivision) => void;
}

export default function DivisionTable({ onEdit }: DivisionTableProps) {
  const [selectedCountry, setSelectedCountry] = useState("");

  const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();


      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
      const [divisionToDelete, setDivisionToDelete] = useState<TDivision | null>(null);
  
      const [deleteDivision, { isLoading: isDeleting }] = useDeleteDivisionMutation();
  


  const { handlePageChange, handlePageSizeChange, getPaginationParams, resetPage } =
    useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });

  const { data: countryData } = useGetAllCountriesQuery([]);
  const countries = countryData?.data || [];

  const buildQueryParams = () => {
    const params = [...getPaginationParams(), ...getSortParams()];

    if (selectedCountry) {
      params.push({ name: "countryId", value: selectedCountry });
    }

    return params;
  };

  const { data, isLoading, isError } = useGetAllDivisonQuery(buildQueryParams());

  const divisions = data?.data || [];
  const hasNoData = divisions.length === 0 && !isLoading;

  const clearFilters = () => {
    setSelectedCountry("");
    resetPage();
  };

  const handleSortClick = (field: SortableFields) => {
    handleSort(field);
    resetPage();
  };


  const handleDeleteClick = (division: TDivision) => {
      setDivisionToDelete(division);
      setDeleteDialogOpen(true);
    };
  
    const handleConfirmDelete = async () => {
      if (!divisionToDelete) return;
  
      try {
        const result = await deleteDivision(divisionToDelete.id).unwrap();
        toast.success(result?.message || "Division deleted successfully");
        setDeleteDialogOpen(false);
        setDivisionToDelete(null);
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || "Failed to delete Division";
        toast.error(errorMessage);
      }
    };

  return (
    <>
      {/* 🔹 Filters Section */}
      <div className="mb-4 flex items-center justify-start gap-4">
        <Select
          value={selectedCountry}
          onValueChange={(value) => {
            setSelectedCountry(value);
            resetPage();
          }}
        >
          <SelectTrigger
            className={selectedCountry ? "border-primary bg-primary/5 min-w-40" : "min-w-40"}
          >
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>

          <SelectContent>
            {countries.map((country: any) => (
              <SelectItem key={country.id} value={String(country.id)}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCountry && (
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

      {/* 🔹 Table */}
      <div className="border-border rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableTableHead
                field="name"
                label="Division Name"
                onSort={handleSortClick}
                getSortIcon={getSortIcon}
                disabled={hasNoData}
              />
              <TableHead className="w-24">Total Districts</TableHead>
              <TableHead className="w-24">Total Thanas</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={4} rows={5} />
            ) : isError ? (
              <TableError colSpan={4}>Error loading division. Please try again.</TableError>
            ) : divisions.length === 0 ? (
              <TableEmpty colSpan={4}>No division found</TableEmpty>
            ) : (
              divisions.map((division: TDivision) => (
                <TableRow key={division.id}>
                  <TableCell className="font-medium">{division.name}</TableCell>

                  <TableCell>{division._count?.districts ?? 0}</TableCell>

                  <TableCell>{division._count?.thanas ?? 0}</TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(division)}
                        className="hover:bg-primary/10 hover:text-primary h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(division)}
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
                    This will permanently delete the brand &quot;
                    {divisionToDelete?.name}&quot;. This action cannot be undone.
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
