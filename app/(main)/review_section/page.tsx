"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reviews } from "@/data/review";

type ReviewFormData = {
  name: string;
  email: string;
  rating: number;
  review: string;
};



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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: Reviews */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="font-bold merriweather-font lg:text-4xl text-2xl mb-2">Reviews</h2>
            <p className="mx-auto text-muted-foreground">
              for Sneakers Collection
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-rating text-rating" />
                <span className="text-4xl font-semibold">4.8</span>
                <span className="text-muted-foreground">/5.0</span>
              </div>

              <div className=" text-sm px-4 py-2 rounded-lg">
                <span className="font-medium">Recommended</span>
                <div className="text-muted-foreground">(98%) buyers recommend this product</div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-8 ">
            {reviews.map((review, i) => (
              <div key={i} className="flex gap-2 border-b p-4 rounded-2xl pb-6">
                <Avatar className="w-15 h-15 rounded-full bg-card-primary p-2">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1  bg-card-primary rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{review.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {review.time}
                    </span>
                  </div>

                  <div className="flex gap-1 my-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < review.rating
                            ? "fill-rating text-rating"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Review Form */}
        <Card className="p-6 h-fit lg:mt-[20vh] bg-card-primary">
          <h3 className="text-xl font-semibold mb-6">Write your review</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-sm text-danger">Name is required</p>
            )}

            <Input
              placeholder="Your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-danger">Email is required</p>
            )}

            {/* Star Rating */}
            <div>
              <p className="text-sm mb-2 text-muted-foreground">Choose star</p>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <Star
                      key={i}
                      onClick={() => setValue("rating", starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`w-6 h-6 cursor-pointer ${
                        starValue <= (hoverRating || selectedRating)
                          ? "fill-rating text-rating"
                          : "text-muted fill-muted"
                      }`}
                    />
                  );
                })}
              </div>
              {errors.rating && (
                <p className="text-sm text-danger">Rating is required</p>
              )}
            </div>

            <Textarea
              placeholder="This product is..."
              rows={4}
              {...register("review", { required: true })}
            />
            {errors.review && (
              <p className="text-sm text-danger">Review is required</p>
            )}

            <Button type="submit" className="w-full rounded-full">
              Submit Review
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
