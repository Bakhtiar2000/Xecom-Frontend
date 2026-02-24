"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reviews } from "@/data/review";
import { reviewSchema } from "@/lib/review.Schema";

// 🔹 TypeScript type inferred from Zod schema
type ReviewFormData = z.infer<typeof reviewSchema>;

export default function ReviewsSection() {
  const [hoverRating, setHoverRating] = useState(0);

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
      rating: 0,
    },
  });

  const selectedRating = watch("rating");

  const onSubmit = (data: ReviewFormData) => {
    console.log("Review Submitted:", data);
    reset();
  };

  return (
    <section className="container">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* LEFT: Reviews */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="merriweather-font mb-2 text-2xl font-bold lg:text-4xl">Reviews</h2>
            <p className="text-muted-foreground mx-auto">for Sneakers Collection</p>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="fill-rating text-rating h-6 w-6" />
                <span className="text-4xl font-semibold">4.8</span>
                <span className="text-muted-foreground">/5.0</span>
              </div>

              <div className="rounded-lg px-4 py-2 text-sm">
                <span className="font-medium">Recommended</span>
                <div className="text-muted-foreground">(98%) buyers recommend this product</div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div>
            {reviews.map((review, i) => (
              <div key={i} className="flex gap-2 rounded-2xl border-b p-4">
                <Avatar className="bg-card-primary h-15 w-15 rounded-full p-2">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>

                <div className="bg-card-primary flex-1 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{review.name}</h4>
                    <span className="text-muted-foreground text-sm">{review.time}</span>
                  </div>

                  <div className="my-1 flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < review.rating ? "fill-rating text-rating" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Review Form */}
        <Card className="bg-card-primary h-fit p-6 lg:mt-[20vh]">
          <h3 className="mb-6 text-xl font-semibold">Write your review</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Your name" {...register("name")} />
            {errors.name && <p className="text-danger text-sm">{errors.name.message}</p>}

            <Input placeholder="Your email" {...register("email")} />
            {errors.email && <p className="text-danger text-sm">{errors.email.message}</p>}

            {/* Star Rating */}
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Choose star</p>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <Star
                      key={i}
                      onClick={() => setValue("rating", starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`h-6 w-6 cursor-pointer ${
                        starValue <= (hoverRating || selectedRating)
                          ? "fill-rating text-rating"
                          : "text-muted fill-muted"
                      }`}
                    />
                  );
                })}
              </div>
              {errors.rating && <p className="text-danger text-sm">{errors.rating.message}</p>}
            </div>

            <Textarea placeholder="This product is..." rows={4} {...register("review")} />
            {errors.review && <p className="text-danger text-sm">{errors.review.message}</p>}

            <Button type="submit" className="w-full rounded-full">
              Submit Review
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
