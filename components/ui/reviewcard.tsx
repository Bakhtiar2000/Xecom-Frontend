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
        <div className="relative hover:shadow-lg bg-secondary rounded-lg p-6 shadow-sm border ">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-sm font-medium ">
                  {review.rating}.0
                </span>
              </div>

              <h4 className="font-bold">
                {review.name}
              </h4>
              <p className="text-sm ">
                {review.role}
              </p>
            </div>

            {review.verified && (
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                Verified
              </div>
            )}
          </div>

          {/* Comment */}
          <p className="text-muted-foreground mb-4">
            {review.comment}
          </p>

          {/* Purchase Info */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="font-medium">Purchased:</span>
            <span className="">
              {review.purchase}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t ">
            <span className="text-sm ">
              {review.date}
            </span>

            <button
              onClick={() => setLiked((prev) => !prev)}
              className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>{review.likes + (liked ? 1 : 0)}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewCard;
