"use client";

import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import shoes7 from "../../../../assets/shoes/shoes7.png";

type HoverEffect = "rotate" | "float" | "pulse";

const ModernSneakerShowcase: FC = () => {
  const [hoverEffect, setHoverEffect] = useState<HoverEffect>("float");
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const [rotation, setRotation] = useState<number>(0);

  return (
    <div className="bg-card-primary relative mx-auto w-full max-w-4xl overflow-hidden rounded-r-full p-4 shadow-lg md:p-8">
      {/* Header - Simplified style */}
      <div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between md:top-6 md:right-6 md:left-6">
        <Link
          href="/"
          className="group flex items-center gap-2 transition-all duration-300 md:gap-3"
        >
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-button-secondary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
          </motion.div>

          <div className="flex flex-col">
            <span className="text-lg font-bold md:text-xl">Xecom</span>
            <span className="text-muted-foreground text-xs md:text-sm">
              Premium Sneakers Collection
            </span>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="px-4 py-50 md:px-12">
        <div className="grid grid-cols-1 items-center gap-6 md:gap-8 lg:grid-cols-2">
          {/* Info Section */}
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                Quantum <span className="text-button-secondary">Runner Pro</span>
              </h1>

              <p className="text-muted-foreground text-base md:text-lg">
                Experience next-level comfort with our revolutionary quantum foam technology.
              </p>
            </div>
          </div>

          {/* Sneaker Display */}
          <div className="relative aspect-square w-full cursor-pointer">
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
              className="relative h-full w-full"
              animate={hoverEffect}
              style={{ rotate: `${rotation}deg` }}
            >
              {/* Sneaker Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={shoes7} alt="s1.png" fill className="object-contain" priority />
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
                <div className="rounded-full p-3 backdrop-blur-sm">
                  <Zap className="text-button-secondary h-6 w-6" />
                </div>
              </motion.div>
            </motion.div>

            {/* Progress Ring for Rotation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <svg className="h-48 w-48" viewBox="0 0 100 100">
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
