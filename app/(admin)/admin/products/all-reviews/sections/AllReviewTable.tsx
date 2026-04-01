"use client";

import { Loader2, Trash2, CheckCircle } from "lucide-react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
  useApproveReviewMutation,
} from "@/redux/features/product/review.api";

import { useTablePagination } from "@/hooks/useTablePagination";
import { useTableSort } from "@/hooks/useTableSort";
import { TQueryParam } from "@/types";
import { SortableTableHead } from "@/components/custom/SortableTableHead";
import { TablePagination } from "@/components/custom/TablePagination";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const getId = (item: any): string => item?.id ?? "";

const AllReviewTable = () => {
  type SortableFields = "rating" | "createdAt";

  const { handlePageChange, handlePageSizeChange, getPaginationParams, resetPage } =
    useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });

  const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();

  const handleSortClick = (field: SortableFields) => {
    handleSort(field);
    resetPage();
  };

  const handleToggleStatus = async (review: any) => {
    try {
      await approveReview({
        id: getId(review),
        data: {
          isApproved: !review.isApproved,
        },
      }).unwrap();

      toast.success("Review status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };
  const buildQueryParams = (): TQueryParam[] => [...getPaginationParams(), ...getSortParams()];

  const { data, isLoading } = useGetAllReviewsQuery(buildQueryParams());

  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();
  const [approveReview, { isLoading: approving }] = useApproveReviewMutation();

  const reviews = data?.data ?? [];

  const rows = reviews.map((review: any) => {
    const product = review.product && typeof review.product === "object" ? review.product : null;

    // fallback: product info might be nested under review directly
    const resolvedProduct = product ?? {
      name: review.productName ?? "Unknown Product",
      images: review.images ?? [],
    };

    return { review, product: resolvedProduct };
  });

  const handleApprove = async (id: string) => {
    try {
      await approveReview({
        id,
        data: { isApproved: true },
      }).unwrap();

      toast.success("Review approved!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex items-center justify-center gap-2 py-20">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading reviews...
      </div>
    );
  }
  console.log("reviews", data);
  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-15">Images</TableHead>
            <TableHead>Products</TableHead>

            <SortableTableHead
              field="rating"
              label="Rating"
              onSort={handleSortClick}
              getSortIcon={getSortIcon}
            />

            <TableHead>Comments</TableHead>

            <SortableTableHead
              field="createdAt"
              label="Date"
              onSort={handleSortClick}
              getSortIcon={getSortIcon}
            />

            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map(({ review, product }) => {
            const imgSrc =
              product?.images?.find((img: any) => img.isFeatured)?.imageUrl ||
              product?.images?.[0]?.imageUrl ||
              review?.product?.images?.[0]?.imageUrl ||
              null;

            return (
              <TableRow key={getId(review)}>
                {/* Image */}
                <TableCell>
                  <div className="bg-muted relative h-11 w-11 overflow-hidden rounded-lg border">
                    {imgSrc ? (
                      <Image src={imgSrc} alt="product" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs">N/A</div>
                    )}
                  </div>
                </TableCell>

                {/* Product */}
                <TableCell>
                  <p className="line-clamp-2 max-w-45 font-medium">{product?.name}</p>
                </TableCell>

                {/* Rating */}
                <TableCell>{review.rating}/5</TableCell>

                {/* Comment */}
                <TableCell>
                  <p className="text-muted-foreground line-clamp-2 max-w-45 text-sm">
                    {review.comment}
                  </p>
                </TableCell>

                {/* Date */}
                <TableCell className="text-xs">{review.createdAt?.slice(0, 10)}</TableCell>

                {/* Status */}
                <TableCell className="text-center">
                  <div className="flex items-center  justify-center gap-2">
                    <Switch
                      className="cursor-pointer"
                      checked={review.isApproved}
                      disabled={approving}
                      onCheckedChange={() => handleToggleStatus(review)}
                    />

                    <span
                      className={`text-xs font-medium ${review.isApproved ? "text-emerald-600" : "text-muted-foreground"
                        }`}
                    >
                      {review.isApproved ? "Approved" : "Pending"}
                    </span>
                  </div>
                </TableCell>
                {/* Actions */}
                <TableCell className="text-right">
                  <div className=" text-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(getId(review))}
                      disabled={deleting}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {data?.meta && (
        <TablePagination
          meta={data.meta}
          onPageChange={handlePageChange}
          onPageSizeChange={(size) => {
            handlePageSizeChange(size);
            resetPage();
          }}
        />
      )}
    </div>
  );
};

export default AllReviewTable;
