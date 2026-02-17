"use client";

import { useState } from "react";
import Title from "@/components/sections/shared/Title";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { TProduct } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  Search,
  Package,
  SlidersHorizontal,
  Calendar,
  ChevronDown,
} from "lucide-react";
import NoProductsFound from "@/components/custom/NoProductFound";
import StatsCard from "@/app/(admin)/custom/state-card";


export default function AllProductsPage() {
  const { data, isLoading, isError } = useGetAllProductsQuery([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Title mainTitle="All Products" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Title mainTitle="All Products" />
        <p className="text-danger">Error loading products</p>
      </div>
    );
  }

  const products = data?.data || [];

  // Calculate stats
  const totalProducts = products.length;
  const totalSales = products.reduce(
    (acc: number, p: TProduct) => acc + (p.totalSales || 0),
    0,
  );

  const stockProducts = products.filter((p: TProduct) => {
    if (p.variants && p.variants.length > 0) {
      return p.variants.some((v: any) => (v.stock || 0) > 0);
    }
    // If no variants, consider ACTIVE products as in stock
    return p.status === "ACTIVE";
  }).length;

 
  const outOfStock = products.filter((p: TProduct) => {
    if (p.variants && p.variants.length > 0) {
      return p.variants.every((v: any) => (v.stock || 0) === 0);
    }
    return false;
  }).length;

  // Filter products
  const filteredProducts = products.filter((product: TProduct) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "ellipsis",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages,
        );
      }
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      <Title mainTitle="All Products" />

      <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          subtitle="Total Products last 365 days"
          trend="neutral"
        />
        <StatsCard
          title="Products Sales"
          value={totalSales}
          subtitle="Products Sales last 365 days"
          trend="neutral"
        />
        <StatsCard
          title="Stock Products"
          value={stockProducts}
          subtitle="Stock Products last 365 days"
          trend="neutral"
        />
        <StatsCard
          title="Out of Stock"
          value={outOfStock}
          subtitle="Out of Stock last 365 days"
          trend="down"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row  gap-3">
        <div className="relative flex-1 bg-popover ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4  text-muted-foreground" />
          <Input
            placeholder="Search by name, Product ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
      
        >
          <SelectTrigger className="w-full bg-popover border-muted border-2 sm:w-45">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <SelectValue placeholder="All Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="w-full bg-popover sm:w-auto">
          <Calendar className="h-4 w-4 mr-2" />
          01 Jan, 2024 to 31 Dec, 2024
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>

        
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <NoProductsFound />
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map((product: TProduct) => (
                  <TableRow key={product.id} className="bg-popover">
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
                          <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {product.shortDescription}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.brand?.name || "N/A"}</TableCell>
                    <TableCell>{product.category?.name || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "ACTIVE" ? "default" : "secondary"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.featured ? (
                        <Badge variant="default" className="bg-rating">
                          Featured
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-popover">
                          No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.avgRating ? (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {product.avgRating.toFixed(1)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount})
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">
                          No reviews
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{product.totalSales}</TableCell>
                    <TableCell>{product.viewCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page as number);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          {/* Product count */}
          <p className="text-sm text-muted-foreground text-center">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
        </>
      )}
    </div>
  );
}
