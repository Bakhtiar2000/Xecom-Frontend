"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, ChevronDown, FastForward, Loader2 } from "lucide-react";
import { TReview } from "@/types";
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

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TReview | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [form, setForm] = useState<{
    userName: string;
    rating: number;
    comment: string;
    images: (string | StaticImageData)[];
  }>({
    userName: "",
    rating: 5,
    comment: "",
    images: [],
  });

  const { data, isLoading: reviewsLoading } = useGetAllReviewsOfProductQuery({ productId });
  const currentUser = useAppSelector(selectCurrentUser);
  const reviews: TReview[] = data?.data ?? [];

  const [addReview, { isLoading: adding }] = useAddReviewMutation();
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const openImageModal = (images: string[] = [], index: number) => {
    setActiveImages(images);
    setActiveIndex(index);
    setImageModalOpen(true);
  };

  const nextImage = () =>
    setActiveIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));

  const prevImage = () =>
    setActiveIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setForm({ userName: "", rating: 5, comment: "", images: [] });
    setEditing(null);
    setOpen(false);
  };

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
        // ── ADD ──
        await addReview({
          productId,
          rating: form.rating,
          comment: form.comment,
        }).unwrap();
        toast.success("Review added successfully");
      }
      resetForm();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (review: TReview) => {
    setEditing(review);
    setForm({
      userName: review.customer?.user?.name || "",
      rating: review.rating,
      comment: review.comment || "",
      images: [],
    });
    setOpen(true);
  };

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted");
    } catch (err) {
      toast.error("Failed to delete review");
      console.error(err);
    }
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
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
              <h2 className="mb-5 text-2xl font-bold">Guest Reviews</h2>
              <div className="flex justify-start gap-5">
                <div className="mt-2 gap-3 space-y-2">
                  <span className="text-3xl font-bold">{averageRating}</span>
                  <StarRating rating={Number(averageRating)} />
                  <span className="text-muted-foreground text-sm">({reviews.length} reviews)</span>
                </div>
                <div className="w-full min-w-50 flex-1 sm:w-auto">
                  {ratingDistribution.map(({ stars, count, percentage }) => (
                    <div key={stars} className="mb-1 flex items-center gap-2 text-sm">
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
              <Input
                placeholder="Your name (optional)"
                value={form.userName}
                onChange={(e) => setForm({ ...form, userName: e.target.value })}
              />

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

              <Input type="file" multiple accept="image/*" onChange={handleImageUpload} />

              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="group relative">
                      <Image
                        src={img}
                        alt={`Upload preview ${i}`}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-lg border object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="bg-destructive absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

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
            reviews.map((r) => (
              <div className="border-b" key={r.id}>
                <CardContent className="space-y-4 py-6">
                  <div className="gap-5 space-y-4 md:flex">
                    <div className="flex space-y-4 space-x-2">
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          {r.customer?.user?.profilePicture ? (
                            <Avatar>
                              <Image
                                src={r.customer.user.profilePicture}
                                alt={r.customer?.user?.name || "Reviewer"}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full"
                              />
                            </Avatar>
                          ) : (
                            <Avatar>
                              <AvatarFallback>
                                {(r.customer?.user?.name ?? "A")
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div>
                            <h4 className="flex gap-6 font-semibold">
                              {r.customer?.user?.name || "Anonymous"}
                              <span>
                                <StarRating rating={r.rating} />
                              </span>
                            </h4>
                            <p className="text-muted-foreground text-xs">
                              {formatDate(r.createdAt)}
                            </p>
                            <p>{r.comment}</p>
                          </div>
                        </div>
                      </div>

                      {/* Mobile dropdown */}
                      <div className="items-start gap-2 md:hidden">
                        {r.customer?.user?.email &&
                          r.customer.user.email === currentUser?.email && (
                            <ReviewActions
                              onEdit={() => handleEdit(r)}
                              onDelete={() => handleDelete(r.id)}
                            />
                          )}
                      </div>
                    </div>

                    {/* Desktop dropdown — only for current user's reviews */}
                    <div className="hidden items-start gap-2 md:flex">
                      {r.customer?.user?.email && r.customer.user.email === currentUser?.email && (
                        <ReviewActions
                          onEdit={() => handleEdit(r)}
                          onDelete={() => handleDelete(r.id)}
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </div>
            ))
          )}
        </div>
      </div>

      <button className="text-primary flex cursor-pointer items-center gap-1">
        Read all reviews
        <ChevronDown className="h-4 w-4" />
      </button>
    </section>
  );
}

// ─── Small helper component ────────────────────────────────────────────────
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
