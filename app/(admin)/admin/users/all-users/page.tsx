"use client";

import { useState } from "react";
import Title from "@/components/sections/shared/Title";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
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
import { TUser } from "@/types";
import { TablePagination } from "@/components/custom/TablePagination";
import { SortableTableHead } from "@/components/custom/SortableTableHead";
import { Gender, UserStatus, UserRole } from "@/constants/enum";
import { Search, X } from "lucide-react";
import { useTableSort } from "@/hooks/useTableSort";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useDebounce } from "@/hooks/useDebounce";

type SortableFields = "name" | "email" | "phoneNumber";

export default function AllUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [role, setRole] = useState<string>("");

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm);

  const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();
  const {
    pageNumber,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    getPaginationParams,
    resetPage
  } = useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });

  const buildQueryParams = () => {
    const params = [
      ...getPaginationParams(),
    ];

    if (debouncedSearchTerm) params.push({ name: "searchTerm", value: debouncedSearchTerm });
    if (gender) params.push({ name: "gender", value: gender });
    if (status) params.push({ name: "status", value: status });
    if (role) params.push({ name: "role", value: role });

    // Add sort params from the hook
    params.push(...getSortParams());

    return params;
  };

  const { data, isLoading, isError } = useGetAllUsersQuery(buildQueryParams());

  const users = data?.data || [];

  const hasNoData = users.length === 0 && !isLoading;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    resetPage(); // Reset to first page when search changes
  };

  const handleFilterChange = () => {
    resetPage(); // Reset to first page when filters change
  };

  const handleSortClick = (field: SortableFields) => {
    handleSort(field);
    resetPage(); // Reset to first page when sorting changes
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGender("");
    setStatus("");
    setRole("");
    resetPage();
  };

  const hasActiveFilters = debouncedSearchTerm || gender || status || role;

  return (
    <div className="space-y-4">
      <Title mainTitle="All Users" />

      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap lg:flex-row lg:justify-end items-center gap-4">
          {/* Gender Filter */}
          <Select
            value={gender}
            onValueChange={(value) => {
              setGender(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
            </SelectContent>
          </Select>

          {/* Role Filter */}
          <Select
            value={role}
            onValueChange={(value) => {
              setRole(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="STAFF">Staff</SelectItem>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableTableHead
                field="name"
                label="Name"
                onSort={handleSortClick}
                getSortIcon={getSortIcon}
                disabled={hasNoData}
              />
              <SortableTableHead
                field="email"
                label="Email"
                onSort={handleSortClick}
                getSortIcon={getSortIcon}
                disabled={hasNoData}
              />
              <SortableTableHead
                field="phoneNumber"
                label="Phone"
                onSort={handleSortClick}
                getSortIcon={getSortIcon}
                disabled={hasNoData}
              />
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email Verified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={6} rows={5} />
            ) : isError ? (
              <TableError colSpan={6}>Error loading users. Please try again.</TableError>
            ) : users.length === 0 ? (
              <TableEmpty colSpan={6}>No users found</TableEmpty>
            ) : (
              users.map((user: TUser) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.emailVerified ? (
                      <Badge variant="default" className="bg-success">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Not Verified</Badge>
                    )}
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
  );
}
