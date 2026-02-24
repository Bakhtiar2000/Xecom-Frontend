"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import shoes7 from "@/assets/shoes/shoes7.png";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type FeaturedShoe = {
  image: any;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  color: string;
};

export default function MegaWinterSell() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 1,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const featuredShoes: FeaturedShoe[] = [
    {
      image: shoes7,
      name: "Nike Air Max",
      price: "$129.99",
      originalPrice: "$199.99",
      discount: "35% OFF",
      color: "from-blue-500 to-cyan-400",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 text-white lg:min-h-screen">
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 text-center lg:py-16 lg:text-left">
          <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="merriweather-font text-3xl leading-tight font-extrabold sm:text-5xl md:text-6xl"
              >
                MEGA
                <span className="block bg-clip-text text-orange-400">Winter SALE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="merriweather-font text-base leading-relaxed text-gray-300 sm:text-xl"
              >
                Up to <span className="text-tertiary-foreground font-bold">50% OFF</span> on premium
                footwear collection. Limited time offer on all running, casual, and sports shoes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Clock className="text-tertiary-foreground h-5 w-5" />
                  <span className="font-bold">Offer Ends In:</span>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {(Object.entries(timeLeft) as [keyof TimeLeft, number][]).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="min-w-16 rounded-xl bg-white/20 px-4 py-3">
                        <span className="block text-2xl font-bold">
                          {value.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-2 block text-sm text-gray-300 uppercase">{key}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center gap-4 lg:flex-wrap lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-button-secondary group flex cursor-pointer items-center gap-3 rounded-full px-4 py-2 text-sm font-bold shadow-2xl lg:px-8 lg:py-4"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Shop Collection
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer rounded-full border-2 border-white/30 px-4 py-2 text-sm font-bold backdrop-blur-sm transition-all hover:bg-white/10 lg:px-8 lg:py-4"
                >
                  View Deals
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative h-80 w-80 md:h-150 md:w-96">
                {featuredShoes.map((shoe, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1 + index * 0.3,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={shoe.image}
                        alt={shoe.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                        className={`absolute top-4 right-4 bg-linear-to-r ${shoe.color} rounded-full px-4 py-2 font-bold`}
                      >
                        {shoe.discount}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                        className="absolute right-0 bottom-4 left-0 text-center"
                      >
                        <h3 className="text-xl font-bold">{shoe.name}</h3>
                        <div className="flex justify-center gap-2">
                          <span className="text-tertiary-foreground text-2xl font-bold">
                            {shoe.price}
                          </span>
                          <span className="discount-text-secondary text-lg line-through">
                            {shoe.originalPrice}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
