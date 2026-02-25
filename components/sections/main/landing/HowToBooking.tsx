"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Truck, Ruler } from "lucide-react";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import StepCard from "@/components/sections/main/landing/sections/StepCard";

const MotionDiv = motion.div;
const MotionSection = motion.section;

type VariantType = "modern";

interface SneakerStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  linear: string;
}

interface HowtoBookingProps {
  variant?: VariantType;
}

const sneakerSteps: SneakerStep[] = [
  {
    number: "01",
    icon: <Search className="h-6 w-6" />,
    title: "Find Your Style",
    description:
      "Browse our curated collection of premium sneakers from top brands and limited editions.",
    features: [
      "Filter by brand, size & color",
      "View 360° product images",
      "Check real-time availability",
      "Read authentic reviews",
    ],
    linear: "from-success to-success-foreground",
  },
  {
    number: "02",
    icon: <Ruler className="h-6 w-6" />,
    title: "Perfect Fit",
    description:
      "Use our size guide and fit technology to ensure your sneakers feel just right Return if doesn't fit.",
    features: [
      "Interactive size guide",
      "Fit recommendations",
      "Width & arch support info",
      "Return if doesn't fit",
    ],
    linear: "from-success to-success-foreground",
  },
  {
    number: "03",
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Secure Checkout",
    description: "Complete your purchase with multiple payment options and buyer protection.",
    features: [
      "Multiple payment methods",
      "SSL encrypted checkout",
      "Price match guarantee",
      "Order confirmation",
    ],
    linear: "from-success to-success-foreground",
  },
  {
    number: "04",
    icon: <Truck className="h-6 w-6" />,
    title: "Fast Delivery",
    description:
      "Get your sneakers delivered quickly with real-time tracking and premium packaging.",
    features: [
      "Free shipping over $100",
      "Express delivery options",
      "Real-time order tracking",
      "Sneaker-safe packaging",
    ],
    linear: "from-success to-success-foreground",
  },
];

const HowtoBooking: React.FC<HowtoBookingProps> = ({ variant = "modern" }) => {
  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative container"
    >
      <div className="relative mb-16 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTitle
            description="From browsing to doorstep, getting your perfect pair has never been easier. Follow these simple steps to own your dream sneakers."
            title="How to Get Your Sneakers"
            className="mb-2"
          />
        </MotionDiv>
      </div>

      <div className="relative">
        <div
          className={`grid grid-cols-1 ${
            sneakerSteps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          } gap-4 lg:gap-8`}
        >
          {sneakerSteps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              totalSteps={sneakerSteps.length}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default HowtoBooking;
