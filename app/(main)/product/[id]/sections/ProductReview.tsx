"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, FastForward, Loader2 } from "lucide-react";
import { TQueryParam, TReview } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { StarRating } from "@/components/custom/StarRating";
import { toast } from "sonner";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsOfProductQuery,
  useUpdateReviewMutation,
} from "@/redux/features/product/review.api";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useTablePagination } from "@/hooks/useTablePagination";
import { TablePagination } from "@/components/custom/TablePagination";

interface ProductReviewsProps {
  productId: string;
}

// Form state type
type ReviewForm = {
  rating: number;
  comment: string;
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TReview | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const [form, setForm] = useState<ReviewForm>({
    rating: 5,
    comment: "",
  });

  const { handlePageChange, handlePageSizeChange, getPaginationParams, resetPage } =
    useTablePagination({
      initialPageNumber: 1,
      initialPageSize: 5,
    });

  const buildQueryParams = () => {
    const queryParams: TQueryParam[] = [...getPaginationParams()];
    if (selectedRating) {
      queryParams.push({ name: "ratingValue", value: String(selectedRating) });
    }
    return { productId, queryParams };
  };

  // Paginated/filtered query (for the list)
  const { data, isLoading: reviewsLoading } = useGetAllReviewsOfProductQuery(buildQueryParams());

  // All reviews query (for header stats)
  const { data: allReviewsData } = useGetAllReviewsOfProductQuery({
    productId,
    queryParams: [],
  });

  const allReviews: TReview[] = allReviewsData?.data ?? [];
  const reviews: TReview[] = data?.data ?? [];

  const currentUser = useAppSelector(selectCurrentUser);
  console.log("curUs", currentUser);
  console.log("r if", reviews);

  const [addReview, { isLoading: adding }] = useAddReviewMutation();
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  // ADD
  const averageRating =
    allReviews.length > 0
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
      : "0.0";

  const resetForm = () => {
    setForm({ rating: 5, comment: "" });
    setEditing(null);
    setOpen(false);
  };

  function timeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  const handleSubmit = async () => {
    if (!form.comment.trim()) return;

    try {
      if (editing) {
        await updateReview({
          id: editing.id,
          data: {
            id: editing.id,
            rating: form.rating,
            comment: form.comment,
          },
        }).unwrap();
        toast.success("Review updated successfully");
      } else {
        await addReview({
          productId,
          rating: form.rating,
          comment: form.comment,
        }).unwrap();
        toast.success("Review added successfully");
      }
      resetForm();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (review: TReview) => {
    setEditing(review);
    setForm({
      rating: review.rating,
      comment: review.comment ?? "",
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    }
  };

  // ADD
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = allReviews.filter((r) => r.rating === stars).length;
    const percentage = allReviews.length > 0 ? (count / allReviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  const isSubmitting = adding || updating;

  return (
    <section>
      <div className="bg-card-primary mt-10 mb-2 rounded-2xl">
        {/* Header */}
        <div className="border-b py-10">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div>
              <h2 className="mb-5 text-2xl font-bold">Reviews</h2>
              <div className="flex justify-start gap-5">
                <div className="mt-2 gap-3 space-y-2">
                  <span className="text-3xl font-bold">{averageRating}</span>
                  <StarRating rating={Number(averageRating)} />
                  <span className="text-muted-foreground text-sm">
                    ({allReviewsData?.meta?.totalCount ?? 0} reviews)
                  </span>
                </div>
                <div className="w-full min-w-50 flex-1 sm:w-auto">
                  {ratingDistribution.map(({ stars, count, percentage }) => (
                    <div
                      key={stars}
                      onClick={() => {
                        setSelectedRating(stars);
                        resetPage();
                      }}
                      className={`mb-1 flex cursor-pointer items-center gap-2 text-sm hover:opacity-80 ${
                        selectedRating === null || selectedRating === stars
                          ? "font-semibold"
                          : "opacity-50"
                      }`}
                    >
                      <span className="text-muted-foreground w-8">{stars}</span>
                      <FastForward className="text-rating h-3 w-3" />
                      <div className="bg-card-primary h-2 flex-1 rounded-full">
                        <div
                          className="from-rating to-rating/90 h-2 rounded-full bg-linear-to-r"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground w-8 text-right">{count}</span>
                    </div>
                  ))}
                </div>
                {selectedRating && (
                  <button
                    onClick={() => {
                      setSelectedRating(null);
                      resetPage();
                    }}
                    className="text-primary text-xs underline"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>

            <Button
              className="bg-button-primary hover:bg-button-primary/85 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Review
            </Button>
          </CardHeader>
        </div>

        {/* Add / Edit Modal */}
        <Dialog
          open={open}
          onOpenChange={(val) => {
            if (!val) resetForm();
            setOpen(val);
          }}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Update Review" : "Add Review"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <StarRating
                rating={form.rating}
                editable
                onChange={(rating) => setForm({ ...form, rating })}
              />
              <Textarea
                placeholder="Write your review..."
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
              <Button
                className="bg-button-primary hover:bg-button-primary/80 w-full cursor-pointer"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editing ? "Update Review" : "Submit Review"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reviews List */}
        <div>
          {reviewsLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-muted-foreground py-10 text-center text-sm">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((r) => {
              const name = r.customer?.user?.name ?? "Anonymous";
              const reviewCustomerId = r.customer?.user?.id;
              const profilePicture = r.customer?.user?.profilePicture ?? "";
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <div className="border-b" key={r.id}>
                  <div className="flex justify-between space-y-4 px-6 py-4">
                    <div className="gap-5 space-y-4 md:flex">
                      <div className="flex space-x-2">
                        <div className="flex gap-3">
                          <Avatar>
                            {profilePicture ? (
                              <AvatarImage src={profilePicture} alt={name} />
                            ) : (
                              <AvatarFallback>{initials}</AvatarFallback>
                            )}
                          </Avatar>

                          <div>
                            <h4 className="flex gap-6 font-semibold">
                              {name}
                              <span>
                                <StarRating rating={r.rating} />
                              </span>
                            </h4>
                            <p>{r.comment}</p>
                          </div>
                        </div>

                        {/* Mobile dropdown */}
                        <div className="items-start gap-2 md:hidden">
                          {reviewCustomerId === currentUser?.id && (
                            <ReviewActions
                              onEdit={() => handleEdit(r)}
                              onDelete={() => handleDelete(r.id)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{timeAgo(r.createdAt)}</p>
                      {/* Desktop dropdown */}
                      <div className="hidden items-start gap-2 md:flex">
                        {reviewCustomerId === currentUser?.id && (
                          <ReviewActions
                            onEdit={() => handleEdit(r)}
                            onDelete={() => handleDelete(r.id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

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
    </section>
  );
}

function ReviewActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-muted rounded p-1">
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
