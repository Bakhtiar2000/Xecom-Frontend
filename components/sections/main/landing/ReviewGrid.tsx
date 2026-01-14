"use client";

import React from "react";
import { motion } from "framer-motion";
import ReviewCard from "@/components/ui/reviewcard";
import { testimonials } from "@/data/review";

// Define the type for a single review
export interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  purchase: string;
  verified: boolean;
  likes: number;
  date: string;
}

const ReviewsGrid: React.FC = () => {
  return (
    <section className="relative max-w-11/12 overflow-hidden mx-auto px-4 py-16 poppins-font">
 \
    \
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light mb-5 Title-text-primary merriweather-font">
          Real Reviews <span className="font-medium">From Real Customers</span>
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2 merriweather-font">
          Don&apos;t just take our word for it. See what sneaker enthusiasts are <br /> saying about their purchases.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="flex animate-scroll gap-6 py-6">
        {testimonials.map((review: Review, index: number) => (
          <div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 min-w-[320px] md:min-w-[380px]"
          >
            <ReviewCard review={review} index={index} />
          </div>
        ))}
      </div>

      <div className="flex animate-scroll-reverse gap-6 py-6">
        {testimonials.map((review: Review, index: number) => (
          <div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 min-w-[320px] md:min-w-[380px]"
          >
            <ReviewCard review={review} index={index} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12"
      >
        <button className="group relative px-8 py-4 rounded-lg tranding-secondry-text font-bold text-lg transition-all duration-300 hover:scale-105">
          <span className="relative z-10 border-b-2 pb-2">{"< Read All Reviews >"}</span>
        </button>
      </motion.div>
    </section>
  );
};

export default ReviewsGrid;
