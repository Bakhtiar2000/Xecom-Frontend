"use client";

import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/review";
import SectionTitle from "@/components/sections/shared/SectionTitle";
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
      <div className="relative overflow-hidden">
        <div className="mb-12 text-center">
          <SectionTitle
            title="Real Reviews"
            description="From browsing to doorstep, getting your perfect pair has never been easier. Follow these simple steps to own your dream sneakers."
            className="mb-2"
          />
        </div>

        {/* Reviews Grid */}
        <div style={scrollStyle} className="gap-6 py-6">
          {testimonials.map((review, index) => (
            <div key={`${review.id}-${index}`} className="min-w-[320px] shrink-0 md:min-w-95">
              <ReviewCard review={review} index={index} />
            </div>
          ))}
        </div>

        <div style={scrollReverseStyle} className="gap-6 py-6">
          {testimonials.map((review, index) => (
            <div key={`${review.id}-${index}`} className="min-w-[320px] shrink-0 md:min-w-95">
              <ReviewCard review={review} index={index} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 text-center md:mt-12"
        >
          <Link
            href={"/all-review"}
            className="group tranding-secondry-text relative cursor-pointer rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 border-b-2 pb-2">{"< Read All Reviews >"}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsGrid;
