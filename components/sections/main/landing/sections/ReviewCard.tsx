"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Star } from "lucide-react";

interface Review {
  rating: number;
  name: string;
  role: string;
  verified: boolean;
  comment: string;
  purchase: string;
  date: string;
  likes: number;
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative"
      >
        <div className="bg-card-primary relative rounded-lg border p-4 shadow-sm hover:shadow-lg md:p-6">
          {/* Header */}
          <div className="mb-2 flex items-start justify-between md:mb-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-rating text-rating" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-sm font-medium">{review.rating}.0</span>
              </div>

              <h4 className="font-semibold md:font-bold">{review.name}</h4>
              <p className="text-sm">{review.role}</p>
            </div>

            {review.verified && (
              <div className="bg-success text-success-foreground flex items-center gap-1 rounded-full px-2 py-1 text-sm md:px-3">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm md:text-base">Verified</span>
              </div>
            )}
          </div>

          {/* Comment */}
          <p className="text-muted-foreground mb-2 text-sm md:mb-4 md:text-base">
            {review.comment}
          </p>

          {/* Purchase Info */}
          <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
            <span className="font-medium">Purchased:</span>
            <span className="">{review.purchase}</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-2 md:pt-4">
            <span className="text-sm">{review.date}</span>

            <button
              onClick={() => setLiked((prev) => !prev)}
              className="text-muted-foreground hover:text-danger flex cursor-pointer items-center gap-1 transition-colors"
            >
              <Heart
                className={`h-4 w-4 md:h-5 md:w-5 ${liked ? "fill-danger text-danger" : ""}`}
              />
              <span className="text-sm md:text-base">{review.likes + (liked ? 1 : 0)}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewCard;
