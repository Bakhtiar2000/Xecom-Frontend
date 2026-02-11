"use client";

import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import {  ChevronLeft} from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const ModernSneakerShowcase: FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(true);
 

 

  return (
    <div className="relative w-full max-w-4xl mx-auto p-8 rounded-r-full overflow-hidden bg-card-primary shadow-lg">
      
      {/* Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link 
          href="/" 
          className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
        >
          <motion.div
            whileHover={{ rotate: -10 }}
            className="w-12 h-12 rounded-xl bg-button-ternary flex items-center justify-center shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.div>
          
          <div className="flex flex-col">
            <span className="font-bold text-xl  tracking-tight">
             Xecom
            </span>
            <span className="text-sm text-muted-foreground">
              Premium Sneakers Collection
            </span>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="py-50 px-4  md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Info Section */}
          <div className="space-y-6">
            <div className="space-y-4">

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
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
            <div className="relative aspect-square rounded-3xl overflow-hidden ">
              
              {/* Dynamic Background Pattern */}
              <motion.div
                animate={
                  isHovered 
                    ? { backgroundPosition: ["0% 0%", "100% 100%"] } 
                    : {}
                }
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.5) 0%, transparent 50%), 
                                  radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.5) 0%, transparent 50%)`,
                  backgroundSize: "300% 300%",
                }}
              />

              {/* Sneaker Image */}
              <motion.div
                className="relative w-full h-full"
              >
                <Image
                  src="/shoes6.png"
                  alt="Quantum Runner Pro Sneaker"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </motion.div>
            </div>

            {/* Interactive Ring */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="transparent"
                  stroke="url(#gradient-ring)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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