"use client";
import Image from "next/image";
import { Plus, Eye, Shuffle, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shoes } from "@/data/shoes-data";

export default function Hero_Section() {
  const letters = ["T", "r", "e", "n", "d", "m", "a", "r", "k"];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % shoes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const shoe = shoes[current];

  return (
    <section className="container">
      <div className="text-center lg:mt-4">
        <motion.h1
          className="merriweather-font mt-5 text-[40px] leading-none font-bold tracking-tight sm:text-[60px] md:text-[80px] lg:text-[120px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover="hover"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-foreground inline-block"
              variants={{
                hover: {
                  y: [0, -15, 0],
                  transition: {
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <p className="description-text merriweather-font text-muted-foreground mt-2">
          Sneakers 2026 Limited Edition
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center justify-between gap-10 sm:gap-16 lg:flex-row lg:px-12">
        {/* RIGHT SIDE IMAGE + TAGS */}
        <div className="relative z-10 mx-auto flex h-[30vh] w-full max-w-150 items-center justify-center lg:h-[60vh] lg:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={shoe?.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image src={shoe?.image} alt={shoe?.name} fill className="object-contain" priority />
            </motion.div>
          </AnimatePresence>

          {/* Shoe Parts */}
          {shoe?.parts.map((part, i) => (
            <motion.div
              key={part.title}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ delay: i * 0.1 }}
              className="absolute z-100 hidden flex-col items-center lg:flex"
              style={{
                top: part.top,
                bottom: part.bottom,
                left: part.left,
              }}
            >
              <div className="bg-card-primary rounded-full p-1.5 shadow-lg">
                <Plus size={14} className="" />
              </div>

              {/* Card with full-width hover button */}
              <div className="bg-card-primary group relative mt-2 w-32 overflow-hidden rounded-xl shadow-lg transition-all sm:w-35">
                {/* Content */}
                <div className="flex items-center justify-between p-2">
                  <Image
                    src={part.img}
                    alt={part.title}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-semibold">{shoe.name}</p>
                    <p className="text-xs">{part.title}</p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  {/* Blur Layer */}
                  <div className="bg-primary/30 absolute inset-0 backdrop-blur-sm" />

                  {/* Text Layer */}
                  <button className="relative z-10 flex h-full w-full cursor-pointer items-center justify-center text-xs font-semibold tracking-wide text-white uppercase sm:text-sm">
                    Shop Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LEFT SIDE TEXT */}
        <div className="relative z-10 w-full lg:w-1/2">
          <div className="bg-primary flex flex-col items-start justify-between gap-8 rounded-xl border px-6 py-4 shadow-lg">
            <div className="w-full space-y-2">
              <motion.div
                key={shoe?.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="text-primary-foreground mb-4 flex items-baseline gap-3">
                  <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">{shoe?.name}</h1>
                  <span className="bg-opacity-10 border-opacity-20 rounded-full border px-2 py-1 text-xs">
                    2023
                  </span>
                </div>
              </motion.div>

              <div className="text-primary-foreground space-y-4">
                <p className="text-primary-foreground text-xs font-semibold tracking-wider uppercase">
                  {shoe?.trademark}
                </p>
                <p className="border-opacity-30 border-l-2 pl-4 text-sm leading-relaxed">
                  {shoe?.description}
                </p>
                <button className="group flex cursor-pointer items-center gap-1 text-xs font-medium uppercase transition-colors duration-200">
                  Discover More
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                    ›
                  </span>
                </button>
              </div>
            </div>

            <div className="text-primary-foreground border-opacity-20 hidden w-full items-center justify-end gap-4 border-t pt-2 text-lg lg:flex">
              <div className="flex gap-2">
                <button className="group relative cursor-pointer rounded-xl p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,100,50,0.5)]">
                  <Heart className="h-5 w-5 transition-colors duration-300" />
                  <div className="absolute inset-0 -skew-x-12 rounded-xl to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
                <button className="group relative cursor-pointer rounded-xl p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,100,50,0.5)]">
                  <Shuffle className="h-5 w-5 transition-colors duration-300" />
                  <div className="absolute inset-0 -skew-x-12 rounded-xl to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
                <button className="group relative cursor-pointer rounded-xl p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,100,50,0.5)]">
                  <Eye className="h-5 w-5 transition-colors duration-300 hover:shadow-[0_0_20px_rgba(255,100,50,0.5)]" />
                  <div className="absolute inset-0 -skew-x-12 rounded-xl to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
