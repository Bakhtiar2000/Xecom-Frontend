"use client";

import { useState } from "react";
import { useGetAllDivisonQuery } from "@/redux/features/location/division.api";
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
import { X, Pencil } from "lucide-react";
import { useTableSort } from "@/hooks/useTableSort";
import { useTablePagination } from "@/hooks/useTablePagination";

type SortableFields = "name";

interface DivisionTableProps {
  onEdit: (division: TDivision) => void;
}

export default function DivisionTable({ onEdit }: DivisionTableProps) {
  const [selectedCountry, setSelectedCountry] = useState("");

  const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();

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
    </>
  );
}
