"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { Sparkles, TrendingUp, Trophy } from "lucide-react";
import { trendingSneakers, Sneaker } from "@/data/premium_shoes";
import SectionTitle from "../../shared/SectionTitle";
import ProductCard from "@/components/customComponents/ProductCard";

type TabType = "trending" | "bestsellers" | "new";

const PremiumShoes = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabType>("trending");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const bestSellers = trendingSneakers.filter(
    (item) => item.badge === "BEST SELLER" || item.rating >= 4.8
  );

  const newArrivals = trendingSneakers.filter(
    (item) => item.badge === "NEW" || item.id >= 5
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const productsMap: Record<TabType, Sneaker[]> = {
    trending: trendingSneakers,
    bestsellers: bestSellers,
    new: newArrivals,
  };

  return (
    <section
      ref={sectionRef}
      className="container overflow-hidden   poppins-font"
    >
      <div className="  relative z-10">
        {/* Header */}
        <div className="text-center">
          <SectionTitle subtitle="Sneaker"  title=" Premium Sneaker Collection" className="mb-2" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-row">
            {[
              {
                id: "trending",
                label: "Trending Now",
                count: trendingSneakers.length,
                icon: <TrendingUp className="lg:w-5 lg:h-5 w-2 h-2" />,
              },
              {
                id: "bestsellers",
                label: "Best Sellers",
                count: bestSellers.length,
                icon: <Trophy className="lg:w-5 lg:h-5 w-2 h-2" />,
              },
              {
                id: "new",
                label: "New Arrivals",
                count: newArrivals.length,
                icon: <Sparkles className="lg:w-5 lg:h-5 w-2 h-2" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`lg:px-6 px-2 cursor-pointer lg:py-4 py-2 text-sm  font-semibold flex items-center space-x-2 ${
                  activeTab === tab.id ? "border-b-2 border-primary" : ""
                }`}
              >
                {tab.icon}
                <span className="text-sm ">{tab.label}</span>
                <span className="px-2 py-1 rounded-full text-xs lg:text-lg ">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsMap[activeTab].map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumShoes;
