"use client";

import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HoverEffect = "rotate" | "float" | "pulse";

const ModernSneakerShowcase: FC = () => {
  const [hoverEffect, setHoverEffect] = useState<HoverEffect>("float");
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const [rotation, setRotation] = useState<number>(0);

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 md:p-8 rounded-r-full overflow-hidden bg-card-primary shadow-lg">
      {/* Header - Simplified style */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 group transition-all duration-300"
        >
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-button-secondary flex items-center justify-center shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white " />
          </motion.div>

          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl ">
              Xecom
            </span>
            <span className="text-xs md:text-sm text-muted-foreground">
              Premium Sneakers Collection
            </span>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="py-50 px-4  md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Info Section */}
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold  leading-tight">
                Quantum{" "}
                <span className="text-button-secondary">
                  Runner Pro
                </span>
              </h1>

              <p className="text-muted-foreground text-base md:text-lg">
                Experience next-level comfort with our revolutionary quantum
                foam technology. 
              </p>
            </div>
          </div>

          {/* Sneaker Display */}
          <div className="relative w-full aspect-square cursor-pointer">
            {/* Background Effects */}
            <div className="absolute inset-0">
              {/* Animated linear Background */}
              <motion.div
                animate={
                  isHovered
                    ? {
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }
                    : {}
                }
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{ backgroundSize: "200% 200%" }}
              />
            </div>

            {/* Main Sneaker Image */}
            <motion.div
              className="relative w-full h-full"
              animate={hoverEffect}
              style={{ rotate: `${rotation}deg` }}
            >
              {/* Sneaker Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/shoes7.png"
                  alt="s1.png"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Dynamic Shine Effect */}
              {isHovered && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 0.4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                />
              )}

              {/* Animated Icon */}
              <motion.div
                animate={
                  isHovered
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-6 right-6"
              >
                <div className="p-3 rounded-full backdrop-blur-sm">
                  <Zap className="w-6 h-6 text-button-secondary" />
                </div>
              </motion.div>
            </motion.div>

            {/* Progress Ring for Rotation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg className="w-48 h-48" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="transparent"
                  stroke="rgba(255,105,0,0.2)"
                  strokeWidth="2"
                  strokeDasharray="2,4"
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSneakerShowcase;
