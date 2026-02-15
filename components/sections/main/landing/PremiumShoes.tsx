"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { Sparkles, TrendingUp, Trophy } from "lucide-react";
import { shoesData, Sneaker } from "@/data/premium-shoes";
import SectionTitle from "../../shared/SectionTitle";
import ProductCard from "@/components/custom/ProductCard";
import { motion } from "framer-motion";

type TabType = "trending" | "bestsellers" | "new";

const PremiumShoes = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabType>("trending");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const MAX_VISIBLE = 8;
  const [showAll, setShowAll] = useState(false);

  const bestSellers = shoesData.filter(
    (item) => item.badge === "BEST SELLER" || item.rating >= 4.8,
  );

  const newArrivals = shoesData.filter(
    (item) => item.badge === "NEW" || item.id >= 5,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const productsMap: Record<TabType, Sneaker[]> = {
    trending: shoesData,
    bestsellers: bestSellers,
    new: newArrivals,
  };

  const activeProducts = productsMap[activeTab];
  const visibleProducts = showAll
    ? activeProducts
    : activeProducts.slice(0, MAX_VISIBLE);

  return (
    <section
      ref={sectionRef}
      className="container"
    >
      <div className="  relative z-10">
        {/* Header */}
        <div className="text-center">
          <SectionTitle
            subtitle="Sneaker"
            title=" Premium Sneaker Collection"
            className="mb-2"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-4 md:mb-12">
          <div className="flex flex-row">
            {[
              {
                id: "trending",
                label: "Trending Now",
                count: shoesData.length,
                icon: <TrendingUp className="lg:w-5 lg:h-5 w-3 h-3" />,
              },
              {
                id: "bestsellers",
                label: "Best Sellers",
                count: bestSellers.length,
                icon: <Trophy className="lg:w-5 lg:h-5 w-3 h-3" />,
              },
              {
                id: "new",
                label: "New Arrivals",
                count: newArrivals.length,
                icon: <Sparkles className="lg:w-5 lg:h-5 w-3 h-3" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`lg:px-6 px-3 cursor-pointer lg:py-4 py-2 text-sm font-semibold flex items-center space-x-1 md:space-x-2 ${activeTab === tab.id
                  ? "border-b-2 border-black dark:border-white"
                  : ""
                  }`}
              >
                {tab.icon}
                <span className="md:text-sm text-xs">{tab.label}</span>
                <span className="px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
        {activeProducts.length > MAX_VISIBLE && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="group relative px-8 py-2 rounded-lg cursor-pointer tranding-secondry-text font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 pb-2">
                {showAll ? "< View Less >" : "< View More >"}
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PremiumShoes;
