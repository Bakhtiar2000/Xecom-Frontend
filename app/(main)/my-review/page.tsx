"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Star, Trash2, PenLine, PackageSearch,
  Loader2, ChevronDown, ChevronUp, Pencil,
} from "lucide-react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
} from "@/redux/features/product/review.api";

// ── Zod Schema ────────────────────────────────────────────────────────────────
const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number("Rating is required").min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});
type ReviewFormData = z.infer<typeof reviewSchema>;

// ── helper: get review id safely (handles _id or id) ─────────────────────────
const getId = (item: any): string => item?._id ?? item?.id ?? "";

// ── Star Row ──────────────────────────────────────────────────────────────────
function StarRow({
  rating, interactive = false, onRate,
  hoverRating = 0, onHover, onLeave, size = "md",
}: {
  rating: number; interactive?: boolean; onRate?: (n: number) => void;
  hoverRating?: number; onHover?: (n: number) => void;
  onLeave?: () => void; size?: "sm" | "md";
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const val = i + 1;
        const filled = val <= (interactive ? hoverRating || rating : rating);
        return (
          <Star
            key={i}
            className={`transition-all ${size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5"} ${filled ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30"
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

// ── Add / Update Review Form ──────────────────────────────────────────────────
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
    register, handleSubmit, setValue, watch, reset,
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
        await updateReview({ id: getId(existingReview), data: { rating: data.rating, comment: data.comment } }).unwrap();
      } else {
        await addReview(data).unwrap();
      }
      reset();
      onClose();
    } catch (err) {
      console.log("Failed to submit review:", err);
    }
  };

  return (
    <div className="mt-4 rounded-xl border bg-muted/30 p-4 space-y-3">
      <h4 className="font-medium text-sm flex items-center gap-2">
        {isUpdateMode ? (
          <><Pencil className="h-4 w-4 text-primary" /> Update Your Review</>
        ) : (
          <><PenLine className="h-4 w-4 text-primary" /> Write a Review</>
        )}
      </h4>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input type="hidden" {...register("productId")} />

        {/* Star Rating */}
        <div>
          <p className="text-muted-foreground text-xs mb-1.5">Your rating</p>
          <StarRow
            rating={selectedRating}
            interactive
            hoverRating={hoverRating}
            onRate={(v) => setValue("rating", v, { shouldValidate: true })}
            onHover={setHoverRating}
            onLeave={() => setHoverRating(0)}
          />
          {errors.rating && <p className="text-destructive text-xs mt-1">{errors.rating.message}</p>}
        </div>

        {/* Comment */}
        <div>
          <Textarea
            placeholder="Share your experience with this product…"
            rows={3}
            className="text-sm"
            {...register("comment")}
          />
          {errors.comment && <p className="text-destructive text-xs mt-1">{errors.comment.message}</p>}
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" size="sm" className="rounded-full px-5" disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />{isUpdateMode ? "Updating…" : "Submitting…"}</>
            ) : (
              isUpdateMode ? "Update Review" : "Submit Review"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ── Single Review Row ─────────────────────────────────────────────────────────
function ReviewItem({
  review,
  onDelete,
  onEdit,
}: {
  review: any;
  onDelete: (id: string) => void;
  onEdit: (review: any) => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-background p-3">
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <StarRow rating={review.rating} size="sm" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-muted-foreground text-xs">
              {review.createdAt?.slice(0, 10)}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
      </div>

      {/* Edit + Delete buttons */}
      <div className="flex gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
          onClick={() => onEdit(review)}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete(getId(review))}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ── Product Card + reviews below ──────────────────────────────────────────────
function ProductReviewCard({
  product,
  reviews,
  onDeleteReview,
}: {
  product: any;
  reviews: any[];
  onDeleteReview: (id: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);

  // Only 1 review per product allowed → if reviews exist, show update form
  const existingReview = reviews[0] ?? null;

  const handleEditClick = (review: any) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  const handleToggleForm = () => {
    if (showForm) {
      handleFormClose();
    } else {
      // If a review exists, pre-fill with the first one for update
      setEditingReview(existingReview);
      setShowForm(true);
    }
  };

  const imgSrc =
    product?.images?.find((img: any) => img.isFeatured)?.imageUrl ||
    product?.images?.[0]?.imageUrl ||
    null;

  return (
    <div className="space-y-2">
      {/* ── Product Card ── */}
      <Card className="bg-card-primary p-4">
        <div className="flex items-start gap-4">

          {/* Thumbnail */}
          <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border bg-muted">
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={product?.name ?? "Product image"}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
                {(product?.name ?? "P")[0].toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate">{product?.name ?? "Product"}</h3>
            {product?.brand && <p className="text-muted-foreground text-sm">{product.brand}</p>}
            {product?.price != null && (
              <p className="text-primary font-medium text-sm">৳{product.price.toLocaleString()}</p>
            )}
            {product?.description && (
              <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge variant="outline" className="text-xs">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs gap-1.5"
              onClick={handleToggleForm}
            >
              {existingReview ? (
                <><Pencil className="h-3.5 w-3.5" />{showForm ? "Close" : "Edit Review"}</>
              ) : (
                <><PenLine className="h-3.5 w-3.5" />{showForm ? "Close" : "Add Review"}</>
              )}
              {showForm ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        {/* Inline Add/Update form */}
        {showForm && (
          <ReviewForm
            productId={getId(product)}
            existingReview={editingReview}
            onClose={handleFormClose}
          />
        )}
      </Card>

      {/* ── Reviews below the card ── */}
      {reviews.length > 0 && (
        <div className="pl-4 ml-2 border-l-2 border-primary/20 space-y-2">
          {reviews.map((review: any) => (
            <ReviewItem
              key={getId(review)}
              review={review}
              onDelete={onDeleteReview}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyReviewsPage() {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { data: reviewsData, isLoading } = useGetMyReviewsQuery(undefined);
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();

  const myReviews: any[] = reviewsData?.data ?? [];

  // ── Group reviews by product ──
  const grouped = myReviews.reduce(
    (acc: Record<string, { product: any; reviews: any[] }>, review: any) => {
      const isPopulated = review.product && typeof review.product === "object";
      const productObj = isPopulated
        ? review.product
        : { id: review.productId ?? review.product, name: "Unknown Product" };

      const key = getId(productObj) || "unknown";

      if (!acc[key]) acc[key] = { product: productObj, reviews: [] };
      acc[key].reviews.push(review);
      return acc;
    },
    {}
  );

  const productEntries = Object.values(grouped);

  // ── Delete handler ──
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
    <section className="container py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="merriweather-font text-3xl lg:text-4xl font-bold">My Reviews</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage all your product reviews in one place.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground py-20">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading your reviews…
        </div>
      )}

      {/* Empty state */}
      {!isLoading && myReviews.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-20 text-center">
          <PackageSearch className="h-14 w-14 text-muted-foreground/30" />
          <div>
            <p className="font-semibold text-lg">No reviews yet</p>
            <p className="text-muted-foreground text-sm mt-1">
              Go to a product page and share your experience!
            </p>
          </div>
        </div>
      )}

      {/* Product cards */}
      {!isLoading && productEntries.length > 0 && (
        <div className="space-y-6">
          {productEntries.map(({ product, reviews }) => (
            <ProductReviewCard
              key={getId(product)}
              product={product}
              reviews={reviews}
              onDeleteReview={(id) => setDeleteTarget(id)}
            />
          ))}
        </div>
      )}

      {/* ── Delete Confirmation Dialog ── */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this review?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your review will be permanently removed.
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
                <><Loader2 className="h-4 w-4 animate-spin mr-2" />Deleting…</>
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