"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Star,
  Trash2,
  PackageSearch,
  Loader2,
  Pencil,
  PenLine,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
} from "@/redux/features/product/review.api";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import { toast } from "sonner";

// ── Zod Schema ────────────────────────────────────────────────────────────────
const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});
type ReviewFormData = z.infer<typeof reviewSchema>;

// ── Helper ────────────────────────────────────────────────────────────────────
const getId = (item: any): string => item?._id ?? item?.id ?? "";

// ── Star Row ──────────────────────────────────────────────────────────────────
function StarRow({
  rating,
  interactive = false,
  onRate,
  hoverRating = 0,
  onHover,
  onLeave,
  size = "md",
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (n: number) => void;
  hoverRating?: number;
  onHover?: (n: number) => void;
  onLeave?: () => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const val = i + 1;
        const filled = val <= (interactive ? hoverRating || rating : rating);
        return (
          <Star
            key={i}
            className={`transition-all ${size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5"} ${filled
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/30"
              } ${interactive ? "cursor-pointer hover:scale-110" : ""}`}
            onClick={() => interactive && onRate?.(val)}
            onMouseEnter={() => interactive && onHover?.(val)}
            onMouseLeave={() => interactive && onLeave?.()}
          />
        );
      })}
    </div>
  );
}

// ── Review Form (inside Dialog) ───────────────────────────────────────────────
function ReviewForm({
  productId,
  existingReview,
  onClose,
}: {
  productId: string;
  existingReview?: any;
  onClose: () => void;
}) {
  const isUpdateMode = !!existingReview;
  const [hoverRating, setHoverRating] = useState(0);

  const [addReview, { isLoading: adding }] = useAddReviewMutation();
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const isLoading = adding || updating;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productId,
      rating: existingReview?.rating ?? 0,
      comment: existingReview?.comment ?? "",
    },
  });

  const selectedRating = watch("rating");

  const onSubmit = async (data: ReviewFormData) => {
    try {
      if (isUpdateMode) {
        await updateReview({
          id: getId(existingReview),
          data: { rating: data.rating, comment: data.comment },
        }).unwrap();
        toast.success("Review updated successfully!"); 
      } else {
        await addReview(data).unwrap();
        toast.success("Review submitted successfully!");
      }
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("productId")} />

      {/* Star Rating */}
      <div>
        <p className="text-muted-foreground mb-1.5 text-xs font-medium">
          Your rating
        </p>
        <StarRow
          rating={selectedRating}
          interactive
          hoverRating={hoverRating}
          onRate={(v) => setValue("rating", v, { shouldValidate: true })}
          onHover={setHoverRating}
          onLeave={() => setHoverRating(0)}
        />
        {errors.rating && (
          <p className="text-destructive mt-1 text-xs">{errors.rating.message}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <Textarea
          placeholder="Share your experience with this product…"
          rows={4}
          className="text-sm"
          {...register("comment")}
        />
        {errors.comment && (
          <p className="text-destructive mt-1 text-xs">{errors.comment.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          className="rounded-full px-5"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              {isUpdateMode ? "Updating…" : "Submitting…"}
            </>
          ) : isUpdateMode ? (
            "Update Review"
          ) : (
            "Submit Review"
          )}
        </Button>
      </div>
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyReviewsPage() {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [formDialog, setFormDialog] = useState<{
    productId: string;
    productName: string;
    existingReview?: any;
  } | null>(null);

  const { data: reviewsData, isLoading } = useGetMyReviewsQuery(undefined);
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();

  const myReviews: any[] = reviewsData?.data ?? [];

  // ── Flatten reviews with product info ──
  const rows = myReviews.map((review: any) => {
    const isPopulated = review.product && typeof review.product === "object";
    const product = isPopulated
      ? review.product
      : { id: review.productId ?? review.product, name: "Unknown Product" };
    return { review, product };
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteReview(deleteTarget).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <section className="container space-y-8 py-10">
      {/* Header */}
      <SectionTitle
        title="My Reviews"
        description="Manage all your product reviews in one place."
      />

      {/* Loading */}
      {isLoading && (
        <div className="text-muted-foreground flex items-center justify-center gap-2 py-20">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading your reviews…
        </div>
      )}

      {/* Empty state */}
      {!isLoading && myReviews.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-20 text-center">
          <PackageSearch className="text-muted-foreground/30 h-14 w-14" />
          <div>
            <p className="text-lg font-semibold">No reviews yet</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Go to a product page and share your experience!
            </p>
          </div>
        </div>
      )}

      {/* ── shadcn Table ── */}
      {!isLoading && rows.length > 0 && (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-15">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="w-32.5">Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className="w-25">Date</TableHead>
                <TableHead className="w-20 text-center">Status</TableHead>
                <TableHead className="w-25 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(({ review, product }) => {
                const imgSrc =
                  product?.images?.find((img: any) => img.isFeatured)?.imageUrl ||
                  product?.images?.[0]?.imageUrl ||
                  null;

                return (
                  <TableRow key={getId(review)} className="align-middle">
                    {/* Thumbnail */}
                    <TableCell>
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border bg-muted">
                        {imgSrc ? (
                          <Image
                            src={imgSrc}
                            alt={product?.name ?? "Product"}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm font-bold">
                            {(product?.name ?? "P")[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Product info */}
                    <TableCell>
                      <p className="font-medium leading-snug truncate max-w-40">
                        {product?.name ?? "Unknown Product"}
                      </p>
                      {product?.brand && (
                        <p className="text-muted-foreground text-xs">
                          {product.brand}
                        </p>
                      )}
                      {product?.price != null && (
                        <p className="text-primary text-xs font-medium">
                          ৳{product.price.toLocaleString()}
                        </p>
                      )}
                    </TableCell>

                    {/* Rating */}
                    <TableCell>
                      <StarRow rating={review.rating} size="sm" />
                      <span className="text-muted-foreground text-xs mt-0.5 block">
                        {review.rating}/5
                      </span>
                    </TableCell>

                    {/* Comment */}
                    <TableCell>
                      <p className="text-muted-foreground text-sm line-clamp-2 max-w-65">
                        {review.comment}
                      </p>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                      {review.createdAt?.slice(0, 10) ?? "—"}
                    </TableCell>

                    {/* Status badge */}
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="text-xs text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"
                      >
                        Published
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          onClick={() =>
                            setFormDialog({
                              productId: getId(product),
                              productName: product?.name ?? "Product",
                              existingReview: review,
                            })
                          }
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setDeleteTarget(getId(review))}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ── Edit / Add Review Dialog ── */}
      <Dialog
        open={!!formDialog}
        onOpenChange={(open) => {
          if (!open) setFormDialog(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              {formDialog?.existingReview ? (
                <>
                  <Pencil className="h-4 w-4 text-primary" />
                  Edit Review — {formDialog.productName}
                </>
              ) : (
                <>
                  <PenLine className="h-4 w-4 text-primary" />
                  Add Review — {formDialog?.productName}
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {formDialog && (
            <ReviewForm
              productId={formDialog.productId}
              existingReview={formDialog.existingReview}
              onClose={() => setFormDialog(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ── */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this review?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your review will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Yes, Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}