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

    const buildQueryParams = (): TQueryParam[] => [
        ...getPaginationParams(),
        ...getSortParams(),
    ];

    const { data, isLoading } = useGetAllReviewsQuery(buildQueryParams());

    const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();
    const [approveReview, { isLoading: approving }] = useApproveReviewMutation();

    const reviews = data?.data ?? [];

    const rows = reviews.map((review: any) => {
        const product =
            review.product && typeof review.product === "object"
                ? review.product
                : null;

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
            <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground">
                <Loader2 className="animate-spin h-5 w-5" />
                Loading reviews...
            </div>
        );
    }
    console.log("reviews", data)
    return (
        <div className="rounded-xl border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="w-15">Image</TableHead>
                        <TableHead>Product</TableHead>

                        <SortableTableHead
                            field="rating"
                            label="Rating"
                            onSort={handleSortClick}
                            getSortIcon={getSortIcon}
                        />

                        <TableHead>Comment</TableHead>

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
                                    <div className="h-11 w-11 rounded-lg overflow-hidden border bg-muted relative">
                                        {imgSrc ? (
                                            <Image
                                                src={imgSrc}
                                                alt="product"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-xs">
                                                N/A
                                            </div>
                                        )}
                                    </div>
                                </TableCell>

                                {/* Product */}
                                <TableCell>
                                    <p className="line-clamp-2 max-w-45 font-medium">
                                        {product?.name}
                                    </p>
                                </TableCell>

                                {/* Rating */}
                                <TableCell>{review.rating}/5</TableCell>

                                {/* Comment */}
                                <TableCell>
                                    <p className="line-clamp-2 max-w-45 text-sm text-muted-foreground">
                                        {review.comment}
                                    </p>
                                </TableCell>

                                {/* Date */}
                                <TableCell className="text-xs">
                                    {review.createdAt?.slice(0, 10)}
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    {review.isApproved ? (
                                        <Badge className="bg-green-100 text-green-600">
                                            Approved
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline">Pending</Badge>
                                    )}
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {!review.isApproved && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleApprove(getId(review))}
                                                disabled={approving}
                                            >
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                            </Button>
                                        )}

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