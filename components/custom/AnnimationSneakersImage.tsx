"use client";

import React, { useState, FC } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HoverEffect = "float" | string;

const AnnimatedSneakerImage: FC = () => {
  const [hoverEffect, setHoverEffect] = useState<HoverEffect>("float");
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);

  return (
    <div className="relative w-full bg-gray-200 dark:bg-gray-900 pl-2 max-w-3xl mx-auto p-8 rounded-r-full overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Animated Icon */}
          <div className="relative w-10 h-10 rounded-lg bg-linear-to-r from-orange-500 to-red-500 group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ArrowBigLeft className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          <span className="font-bold text-lg text-gray-900 dark:text-gray-200">
            STEPS SNEAKERS
          </span>
        </Link>
      </div>

      {/* Sneaker Container */}
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

          {/* Floating Particles */}
          {isHovered && (
            <>
              {[...Array(15)].map((_, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.sin(i * 0.5) * 100,
                    y: Math.cos(i * 0.5) * 100,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="absolute w-4 h-5 rounded-full bg-linear-to-r from-orange-600 to-red-600"
                  style={{
                    left: `${50 + Math.sin(i) * 40}%`,
                    top: `${50 + Math.cos(i) * 40}%`,
                  }}
                />
              ))}
            </>
          )}
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
              src="/man3.png"
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
              <Zap className="w-6 h-6 text-orange-400" />
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
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnnimatedSneakerImage;
