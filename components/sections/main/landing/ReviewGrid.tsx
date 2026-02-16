"use client";

import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/review";
import SectionTitle from "../../shared/SectionTitle";
import Link from "next/link";
import ReviewCard from "./sections/Reviewcard";

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
  const scrollStyle: React.CSSProperties = {
    display: "flex",
    animation: "scroll 40s linear infinite",
  };

  const scrollReverseStyle: React.CSSProperties = {
    display: "flex",
    animation: "scroll-reverse 40s linear infinite",
  };

  return (
    <div className="container">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }

          100% {
            transform: translateX(0);
          }
        }
      `}</style>
      <div className="relative  overflow-hidden">
        <div className="text-center mb-12">
          <SectionTitle title="Real Reviews" description="From browsing to doorstep, getting your perfect pair has never been easier. Follow these simple steps to own your dream sneakers." className="mb-2" />

        </div>

        {/* Reviews Grid */}
        <div style={scrollStyle} className="gap-6 py-6">
          {testimonials.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="shrink-0 min-w-[320px] md:min-w-95"
            >
              <ReviewCard review={review} index={index} />
            </div>
          ))}
        </div>

        <div style={scrollReverseStyle} className="gap-6 py-6">
          {testimonials.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="shrink-0 min-w-[320px] md:min-w-95"
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
          className="text-center mt-4 md:mt-12"
        >
          <Link href={'/all-review'} className="group relative px-8 py-4 rounded-lg cursor-pointer tranding-secondry-text font-bold text-lg transition-all duration-300 hover:scale-105">
            <span className="relative z-10 border-b-2 pb-2">
              {"< Read All Reviews >"}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsGrid;
