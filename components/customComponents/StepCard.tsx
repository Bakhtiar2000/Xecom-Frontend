"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";


const MotionDiv = motion.div;


type VariantType = "minimal" | "modern" | "card" | "interactive";

interface StyleVariant {
  card: string;
}

interface StepData {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  linear: string;
  illustration: React.ReactNode;
}

interface StepCardProps {
  step: StepData;
  index: number;
  totalSteps: number;
  variant?: VariantType;
}

/* ---------------- Style Variants ---------------- */
const styleVariants: Record<VariantType, StyleVariant> = {
  minimal: {
    card: "bg-white dark:bg-gray-900/20 backdrop-blur-sm border border-gray-200 dark:border-gray-800",
  },
  modern: {
    card: "bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-xl",
  },
  card: {
    card: "bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl border-0",
  },
  interactive: {
    card: "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-100 dark:border-gray-700 hover:border-transparent",
  },
};


const StepCard: React.FC<StepCardProps> = ({
  step,
  index,
  totalSteps,
  variant = "modern",
}) => {
  const styles = styleVariants[variant];

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: variant === "interactive" ? -10 : -5 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Horizontal Connector */}
      {index < totalSteps - 1 && (
        <div className="hidden lg:block absolute top-20 left-1/2 w-full h-0.5 bg-linear-to-r from-gray-200 to-gray-200">
          <MotionDiv
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
            className={`h-full bg-linear-to-r ${step.linear} origin-left`}
          />
        </div>
      )}

      {/* Step Number */}
      <div className="relative z-10 flex justify-center mb-6">
        <MotionDiv
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            type: "spring",
          }}
          className={`w-14 h-14 rounded-xl bg-secondary  shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 ${
            variant === "interactive" ? "group-hover:scale-110" : ""
          }`}
        >
          <span className="text-xl font-bold ">
            {step.number}
          </span>
        </MotionDiv>
      </div>

      {/* Card */}
      <div
        className={`relative rounded-2xl p-6 shadow-sm mt-8 transition-all duration-300 overflow-hidden ${
          styles.card
        } ${variant === "interactive" ? "hover:shadow-2xl" : "hover:shadow-lg"}`}
      >
        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${step.linear} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        {/* Title */}
        <h3 className="text-lg font-bold mb-3 ">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {step.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-4">
          {step.features.map((feature, featureIndex) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15 + featureIndex * 0.1,
              }}
              className="flex items-center gap-2 text-xs "
            >
              <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Illustration */}
        <div className="mt-4">{step.illustration}</div>

        {/* Bottom Progress Bar */}
        <MotionDiv
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
          className={`absolute bottom-0 left-0 w-full h-1 bg-linear-to-r ${step.linear} origin-left`}
        />
      </div>

      {/* Mobile Arrow */}
      {index < totalSteps - 1 && (
        <div className="lg:hidden flex justify-center my-6">
          <MotionDiv
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-8 rounded-full bg-linear-to-br from-gray-100 to-white flex items-center justify-center shadow-sm"
          >
            <ArrowRight className="w-4 h-4 " />
          </MotionDiv>
        </div>
      )}
    </MotionDiv>
  );
};

export default StepCard;
