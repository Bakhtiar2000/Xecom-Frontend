"use client";

import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import shoes6 from "../../../../assets/shoes/shoes6.png";

const ModernSneakerShowcase: FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(true);

  return (
    <div className="bg-card-primary relative mx-auto w-full max-w-4xl overflow-hidden rounded-r-full p-8 shadow-lg">
      {/* Header */}
      <div className="absolute top-6 right-6 left-6 z-20 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <motion.div
            whileHover={{ rotate: -10 }}
            className="bg-button-ternary flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </motion.div>

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">Xecom</span>
            <span className="text-muted-foreground text-sm">Premium Sneakers Collection</span>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="px-4 py-50 md:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Info Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl leading-tight font-bold md:text-5xl">
                Quantum <span className="text-button-ternary">Runner Pro</span>
              </h1>

              <p className="text-muted-foreground text-lg">
                Experience next-level comfort with our revolutionary quantum foam technology.
                Designed for peak performance and style.
              </p>
            </div>
          </div>

          {/* Sneaker Display */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(true)}
          >
            {/* Main Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              {/* Dynamic Background Pattern */}
              <motion.div
                animate={isHovered ? { backgroundPosition: ["0% 0%", "100% 100%"] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.5) 0%, transparent 50%), 
                                  radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.5) 0%, transparent 50%)`,
                  backgroundSize: "300% 300%",
                }}
              />

              {/* Sneaker Image */}
              <motion.div className="relative h-full w-full">
                <Image
                  src={shoes6}
                  alt="Quantum Runner Pro Sneaker"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </motion.div>
            </div>

            {/* Interactive Ring */}
            <div className="pointer-events-none absolute inset-0">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="transparent"
                  stroke="url(#gradient-ring)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <defs>
                  <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSneakerShowcase;
