"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type FeaturedShoe = {
  image: string;
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
      image: "/man3.png",
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
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
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
    <section className="container  ">
      <div className="bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 rounded-2xl min-h-screen relative overflow-hidden  text-white  poppins-font">
        <div className="relative z-10 max-w-7xl mx-auto  lg:py-16 p-5 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className=" space-y-6 sm:space-y-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl sm:text-5xl merriweather-font md:text-6xl font-extrabold leading-tight"
              >
                MEGA
                <span className="block text-orange-400  bg-clip-text">
                  Winter SALE
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-xl text-gray-300 leading-relaxed merriweather-font"
              >
                Up to{" "}
                <span className="font-bold text-tertiary-foreground">
                  50% OFF
                </span>{" "}
                on premium footwear collection. Limited time offer on all
                running, casual, and sports shoes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-tertiary-foreground" />
                  <span className="font-bold">Offer Ends In:</span>
                </div>

                <div className="flex gap-4 flex-wrap justify-center">
                  {(Object.entries(timeLeft) as [keyof TimeLeft, number][]).map(
                    ([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="bg-white/20 rounded-xl px-4 py-3 min-w-16">
                          <span className="text-2xl font-bold block">
                            {value.toString().padStart(2, "0")}
                          </span>
                        </div>
                        <span className="text-sm text-gray-300 mt-2 block uppercase">
                          {key}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex lg:flex-wrap  gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 lg:px-8 py-2 lg:py-4 rounded-full text-sm cursor-pointer bg-button-secondary font-bold shadow-2xl flex items-center gap-3 group"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/30 cursor-pointer text-sm  px-4 py-2 lg:px-8 lg:py-4 rounded-full font-bold backdrop-blur-sm hover:bg-white/10 transition-all"
                >
                  View Deals
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center"
            >
              <div className="relative w-80 md:w-96 h-80 md:h-[600px]">
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
                    <div className="relative w-full h-full">
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
                        className={`absolute top-4 right-4 bg-linear-to-r ${shoe.color}  px-4 py-2 rounded-full font-bold`}
                      >
                        {shoe.discount}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                        className="absolute bottom-4 left-0 right-0 text-center "
                      >
                        <h3 className="text-xl font-bold">{shoe.name}</h3>
                        <div className="flex justify-center gap-2">
                          <span className="text-2xl font-bold text-tertiary-foreground">
                            {shoe.price}
                          </span>
                          <span className="text-lg line-through discount-text-secondary">
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
