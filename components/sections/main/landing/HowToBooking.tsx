"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Truck,
  CreditCard,
  ShieldCheck,
  RefreshCw,
  Ruler,
} from "lucide-react";
import StepCard from "@/components/custom/StepCard";
import SectionTitle from "../../shared/SectionTitle";



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
  illustration: React.ReactNode;
}

interface HowtoBookingProps {
  variant?: VariantType;
}


const sneakerSteps: SneakerStep[] = [
  {
    number: "01",
    icon: <Search className="w-6 h-6" />,
    title: "Find Your Style",
    description:
      "Browse our curated collection of premium sneakers from top brands and limited editions.",
    features: [
      "Filter by brand, size & color",
      "View 360° product images",
      "Check real-time availability",
      "Read authentic reviews",
    ],
    linear: "from-blue-500 to-cyan-500",
    illustration: (
      <div className="flex items-center justify-center space-x-2 mt-4">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-cyan-300" />
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-400" />
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-cyan-500" />
      </div>
    ),
  },
  {
    number: "02",
    icon: <Ruler className="w-6 h-6" />,
    title: "Perfect Fit",
    description:
      "Use our size guide and fit technology to ensure your sneakers feel just right Return if doesn't fit.",
    features: [
      "Interactive size guide",
      "Fit recommendations",
      "Width & arch support info",
      "Return if doesn't fit",
    ],
    linear: "from-emerald-500 to-green-500",
    illustration: (
      <div className="flex items-center justify-center mt-4">
        <div className="relative w-16 h-8">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-green-400 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-secondary rounded-full -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-secondary rounded-full -translate-y-1/2" />
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-secondary rounded-full -translate-y-1/2" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Secure Checkout",
    description:
      "Complete your purchase with multiple payment options and buyer protection.Order confirmation",
    features: [
      "Multiple payment methods",
      "SSL encrypted checkout",
      "Price match guarantee",
      "Order confirmation",
    ],
    linear: "from-amber-500 to-orange-500",
    illustration: (
      <div className="flex items-center justify-center space-x-2 mt-4">
        <CreditCard className="w-6 h-6 ilustaration-text-primary" />
        <ShieldCheck className="w-6 h-6 ilustaration-text-primary" />
        <RefreshCw className="w-6 h-6 ilustaration-text-primary" />
      </div>
    ),
  },
  {
    number: "04",
    icon: <Truck className="w-6 h-6" />,
    title: "Fast Delivery",
    description:
      "Get your sneakers delivered quickly with real-time tracking and premium packaging.",
    features: [
      "Free shipping over $100",
      "Express delivery options",
      "Real-time order tracking",
      "Sneaker-safe packaging",
    ],
    linear: "from-purple-500 to-pink-500",
    illustration: (
      <div className="flex items-center justify-center mt-4">
        <div className="relative w-20 h-8">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-purple-400 to-pink-400" />
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-full -translate-y-1/2 animate-pulse" />
        </div>
      </div>
    ),
  },
];


const HowtoBooking: React.FC<HowtoBookingProps> = ({ variant = "modern" }) => {

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative container poppins-font"
    >
      <div className="relative text-center mb-16">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTitle description="From browsing to doorstep, getting your perfect pair has never been easier. Follow these simple steps to own your dream sneakers." title="How to Get Your Sneakers"  className="mb-2"/>
         
         
        </MotionDiv>
      </div>

      <div className="relative">
        <div
          className={`grid grid-cols-1 ${
            sneakerSteps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          } gap-8 lg:gap-8`}
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
