"use client";
import Image from "next/image";
import { Plus, Eye, Shuffle, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shoes } from "@/data/shoes-data";

export default function Hero_Section() {
  const letters = ["T", "r", "e", "n", "d", "m", "a", "r", "k"];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % shoes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const shoe = shoes[current];

  return (
    <div className="poppins-font">
      <section className="relative lg:min-h-screen max-w-11/12  py-5 mx-auto overflow-hidden ">
        <div className="text-center lg:mt-5">
          <motion.h1
            className="text-[40px] merriweather-font  mt-5 sm:text-[60px] md:text-[80px] lg:text-[120px] font-bold leading-none tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover="hover"
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block text-foreground"
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

          <p className="description-text mt-2 merriweather-font text-muted-foreground">
            Sneakers 2026 Limited Edition
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col  lg:flex-row justify-between  items-end  lg:px-12   gap-10 sm:gap-16 overflow-hidden">
          {/* RIGHT SIDE IMAGE + TAGS */}
          <div className="relative  z-10  w-full lg:w-1/2 h-[30vh] lg:h-[60vh] mx-auto flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={shoe?.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0  "
              >
                <Image
                  src={shoe?.image}
                  alt={shoe?.name}
                  fill
                  className="object-contain"
                  priority
                />
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
                className="absolute  z-100 hidden lg:flex flex-col items-center"
                style={{
                  top: part.top,
                  bottom: part.bottom,
                  left: part.left,
                }}
              >
                <div className="rounded-full bg-card-primary shadow-lg p-1.5">
                  <Plus size={14} className="" />
                </div>

                {/* Card with full-width hover button */}
                <div className="relative bg-card-primary group shadow-lg rounded-xl mt-2 w-32 sm:w-35 overflow-hidden transition-all">
                  {/* Content */}
                  <div className="p-2 flex items-center justify-between">
                    <Image
                      src={part.img}
                      alt={part.title}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">
                        {shoe.name}
                      </p>
                      <p className="text-[10px] sm:text-xs Hero-text-primary">
                        {part.title}
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Blur Layer */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

                    {/* Text Layer */}
                    <button
                      className=" relative z-10 w-full h-full flex items-center justify-center text-xs sm:text-sm font-semibold uppercase cursor-pointer  text-white  tracking-wide
      "
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* LEFT SIDE TEXT */}
          <div className="w-full  lg:w-1/2 relative  z-10  ">
            <div className="bg-primary rounded-xl border  px-6 sm:px-8 py-5 flex flex-col justify-between items-start gap-8 lg:-mr-12  shadow-lg">
              <div className="w-full space-y-2">
                <motion.div
                  key={shoe?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="flex text-primary-foreground items-baseline gap-3">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                      {shoe?.name}
                    </h1>
                    <span className="text-xs  bg-opacity-10 px-2 py-1 rounded-full border border-opacity-20">
                      2023
                    </span>
                  </div>
                </motion.div>

                <div className="space-y-4 text-primary-foreground">
                  <p className="uppercase text-primary-foreground text-xs  tracking-wider font-semibold">
                    {shoe?.trademark}
                  </p>
                  <p className="text-sm  leading-relaxed border-l-2 border-opacity-30 pl-4">
                    {shoe?.description}
                  </p>
                  <button className="uppercase text-xs font-medium  transition-colors duration-200 flex items-center gap-1 group">
                    Discover More
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                      ›
                    </span>
                  </button>
                </div>
              </div>

              <div className="hidden lg:flex  text-primary-foreground  items-center gap-3  text-lg w-full justify-between border-t border-opacity-20 pt-4">
                <span className="text-sm font-medium">Actions</span>

                <div className="flex gap-2">
                  <button className="group relative p-3 cursor-pointer rounded-xl  backdrop-blur-sm   transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,100,50,0.5)] hover:scale-105 shadow-lg ">
                    <Heart className="w-5 h-5   transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-xl to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                  </button>
                  <button className="group relative p-3 cursor-pointer rounded-xl  backdrop-blur-sm  hover:shadow-[0_0_20px_rgba(255,100,50,0.5)] transition-all duration-300  hover:scale-105 shadow-lg ">
                    <Shuffle className="w-5 h-5   transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-xl  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                  </button>
                  <button className="group relative p-3 cursor-pointer rounded-xl  backdrop-blur-sm   transition-all duration-300  hover:scale-105 shadow-lg ">
                    <Eye className="w-5 h-5  hover:shadow-[0_0_20px_rgba(255,100,50,0.5)]  transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-xl bg--to-r from-transparent hover:shadow-[0_0_20px_rgba(255,100,50,0.5)]  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
