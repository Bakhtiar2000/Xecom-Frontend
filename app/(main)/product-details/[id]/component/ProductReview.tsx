"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, ChevronDown, FastForward } from "lucide-react";
import { Review } from "@/types";
import { productReviews } from "@/data/product-reivew";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { StarRating } from "@/components/custom/StarRating";

const CURRENT_USER_EMAIL = "john@gmail.com";

export default function ProductReviews() {
  const [reviews, setReviews] = useState<Review[]>(productReviews);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  // image modal
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const openImageModal = (images: string[] = [], index: number) => {
    setActiveImages(images);
    setActiveIndex(index);
    setImageModalOpen(true);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
  };

  const [form, setForm] = useState<{
    userName: string;
    rating: number;
    comment: string;
    images: string[];
  }>({
    userName: "",
    rating: 5,
    comment: "",
    images: [],
  });

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...urls],
    }));
  };

  const handleSubmit = () => {
    if (!form.comment.trim()) return;

    if (editing) {
      setReviews((prev) =>
        prev.map((r) => (r.id === editing.id ? { ...r, ...form } : r)),
      );
    } else {
      setReviews((prev) => [
        {
          id: crypto.randomUUID(),
          userName: form.userName || "Anonymous",
          userEmail: CURRENT_USER_EMAIL,
          rating: form.rating,
          comment: form.comment,
          images: form.images,
          date: new Date().toISOString().split("T")[0],
        },
        ...prev,
      ]);
    }

    setForm({ userName: "", rating: 5, comment: "", images: [] });
    setEditing(null);
    setOpen(false);
  };

  const handleEdit = (review: Review) => {
    setEditing(review);
    setForm({
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      images: review.images || [],
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  return (
    <section>
      <div className="mt-10 mb-2 bg-card-primary rounded-2xl">
        {/* Header */}
        <div className="py-10 border-b">
          <CardHeader className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-5">Guest Reviews</h2>
              <div className="flex justify-start gap-5">
                <div className=" space-y-2 gap-3 mt-2">
                  <span className="text-3xl font-bold">{averageRating}</span>
                  <StarRating rating={Number(averageRating)} />
                  <span className="text-sm text-muted-foreground">
                    ({reviews.length} reviews)
                  </span>
                </div>
                <div className="flex-1 min-w-50 w-full sm:w-auto">
                  {ratingDistribution.map(({ stars, count, percentage }) => (
                    <div
                      key={stars}
                      className="flex items-center gap-2 text-sm mb-1"
                    >
                      <span className="w-8 te4xt-muted-foreground">
                        {stars}
                      </span>
                      <FastForward className="w-3 h-3 text-rating" />
                      <div className="flex-1 bg-card-primary rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-rating to-rating/90 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-muted-foreground text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="bg-button-primary hover:bg-button-primary/85 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Review
            </Button>
          </CardHeader>
        </div>

        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Update Review" : "Add Review"}
              </DialogTitle>
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

              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />

              {/* Image Preview + Delete */}
              {form.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <Image
                        src={img}
                        alt={`Upload preview ${i}`}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-0 right-0 bg-destructive text-whit  font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                className="w-full bg-button-primary hover:bg-button-primary/80 cursor-pointer"
                onClick={handleSubmit}
              >
                {editing ? "Update Review" : "Submit Review"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reviews List */}
        <div>
          {reviews.map((r) => (
            <div className="border-b" key={r.id}>
              <CardContent className="py-6 space-y-4">
                <div className="md:flex space-y-4 gap-5">
                  <div className="flex space-x-2 space-y-4">
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        {r.userImage ? (
                          <Avatar>
                            <Image
                              src={r.userImage}
                              alt={r.userName}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full"
                            />
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarFallback>
                              {r.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div>
                          <h4 className="font-semibold flex gap-6">
                            {r.userName}{" "}
                            <span>
                              {" "}
                              <StarRating rating={r.rating} />
                            </span>
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {r.date}
                          </p>

                          <p>{r.comment}</p>
                        </div>
                      </div>
                    </div>
                     <div className=" md:hidden items-start gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded hover:bg-muted">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(r)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDelete(r.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  </div>
                 
                  <div>
                    {r.images && r.images.length > 0 && (
                      <div className="flex gap-2">
                        {r.images.map((img, i) => (
                          <Image
                            key={i}
                            src={img}
                            alt={`Review image ${i}`}
                            width={80}
                            height={80}
                            onClick={() => openImageModal(r.images!, i)}
                            className="w-20 h-20 bg-muted object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                          />
                        ))}
                      </div>
                    )}

                    {/* image modal  */}
                    <Dialog
                      open={imageModalOpen}
                      onOpenChange={setImageModalOpen}
                    >
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>

                      <DialogContent className="max-w-7xl bg-card-primary border-none p-0">
                        <div className="relative flex items-center justify-center h-[80vh]">
                          {/* Image */}
                          <Image
                            src={activeImages[activeIndex]}
                            alt="Review preview"
                            fill
                            className="object-contain"
                          />

                          {/* Left Arrow */}
                          {activeImages.length > 1 && (
                            <button
                              onClick={prevImage}
                              className="absolute left-4 cursor-pointer text-xl  text-white bg-black/50 hover:bg-black/70 p-2 rounded-full"
                            >
                              ‹
                            </button>
                          )}

                          {/* Right Arrow */}
                          {activeImages.length > 1 && (
                            <button
                              onClick={nextImage}
                              className="absolute right-4 cursor-pointer text-xl text-white bg-black/50 hover:bg-black/70 p-2 rounded-full"
                            >
                              ›
                            </button>
                          )}

                          {/* Counter */}
                          {activeImages.length > 1 && (
                            <div className="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                              {activeIndex + 1} / {activeImages.length}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="md:flex hidden items-start gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded hover:bg-muted">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(r)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDelete(r.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
              </CardContent>
            </div>
          ))}
        </div>
      </div>

      <button className="flex cursor-pointer items-center gap-1 text-primary">
        Read all reviews
        <ChevronDown className="w-4 h-4" />
      </button>
    </section>
  );
}
