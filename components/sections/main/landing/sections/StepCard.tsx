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
    card: "bg-white dark:bg-black/20 backdrop-blur-sm border border-border",
  },
  modern: {
    card: "bg-card-primary shadow-xl",
  },
  card: {
    card: "bg-white dark:bg-card-primary shadow-lg hover:shadow-2xl border-0",
  },
  interactive: {
    card: "bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-border hover:border-transparent",
  },
};

const StepCard: React.FC<StepCardProps> = ({ step, index, totalSteps, variant = "modern" }) => {
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
        <div className="from-muted to-muted/90 absolute top-20 left-1/2 hidden h-0.5 w-full bg-linear-to-r lg:block">
          <MotionDiv
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
            className={`h-full bg-linear-to-r ${step.linear} origin-left`}
          />
        </div>
      )}

      {/* Step Number */}
      <div className="relative z-10 mb-4 flex justify-center">
        <MotionDiv
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            type: "spring",
          }}
          className={`bg-secondary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl md:h-14 md:w-14 ${
            variant === "interactive" ? "group-hover:scale-110" : ""
          }`}
        >
          <span className="text-base font-bold md:text-xl">{step.number}</span>
        </MotionDiv>
      </div>

      {/* Card */}
      <div
        className={`relative mt-8 overflow-hidden rounded-xl p-4 shadow-sm transition-all duration-300 md:p-6 ${
          styles.card
        } ${variant === "interactive" ? "hover:shadow-2xl" : "hover:shadow-lg"}`}
      >
        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${step.linear} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
        />

        {/* Title */}
        <h3 className="mb-1 text-lg font-bold md:mb-3">{step.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground mb-2 text-sm md:mb-4 md:leading-relaxed">
          {step.description}
        </p>

        {/* Features */}
        <ul className="mb-2 space-y-2 md:mb-4">
          {step.features.map((feature, featureIndex) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15 + featureIndex * 0.1,
              }}
              className="flex items-center gap-2 text-xs"
            >
              <CheckCircle className="text-success-foreground h-3 w-3 shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Bottom Progress Bar */}
        <MotionDiv
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
          className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r ${step.linear} origin-left`}
        />
      </div>

      {/* Mobile Arrow */}
      {index < totalSteps - 1 && (
        <div className="my-4 flex cursor-pointer justify-center md:my-6 lg:hidden">
          <MotionDiv
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="from-muted flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br to-white shadow-sm"
          >
            <ArrowRight className="h-4 w-4" />
          </MotionDiv>
        </div>
      )}
    </MotionDiv>
  );
};

export default StepCard;
