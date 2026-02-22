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
        <div className="relative hover:shadow-lg bg-card-primary rounded-lg p-4 md:p-6 shadow-sm border ">
          {/* Header */}
          <div className="flex items-start justify-between mb-2 md:mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-rating text-rating"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-sm font-medium ">
                  {review.rating}.0
                </span>
              </div>

              <h4 className="font-semibold md:font-bold">
                {review.name}
              </h4>
              <p className="text-sm ">
                {review.role}
              </p>
            </div>

            {review.verified && (
              <div className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-success text-success-foreground text-sm">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm md:text-base">Verified</span>
              </div>
            )}
          </div>

          {/* Comment */}
          <p className="text-muted-foreground text-sm md:text-base mb-2 md:mb-4">
            {review.comment}
          </p>

          {/* Purchase Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="font-medium">Purchased:</span>
            <span className="">
              {review.purchase}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 md:pt-4 border-t ">
            <span className="text-sm ">
              {review.date}
            </span>

            <button
              onClick={() => setLiked((prev) => !prev)}
              className="flex items-center gap-1 cursor-pointer text-muted-foreground hover:text-danger transition-colors"
            >
              <Heart
                className={`w-4 md:w-5 h-4 md:h-5 ${
                  liked ? "fill-danger text-danger" : ""
                }`}
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
