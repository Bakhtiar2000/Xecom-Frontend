"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, TrendingUp, Trophy } from "lucide-react";
import { trendingSneakers, Sneaker } from "@/data/premium_shoes";

type TabType = "trending" | "bestsellers" | "new";

type ProductCardProps = {
  product: Sneaker;
  index: number;
};

const PremiumShoes = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabType>("trending");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const bestSellers = trendingSneakers.filter(
    (item: Sneaker) => item.badge === "BEST SELLER" || item.rating >= 4.8
  );

  const newArrivals = trendingSneakers.filter(
    (item: Sneaker) => item.badge === "NEW" || item.id >= 5
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const getProductsByTab = (): Sneaker[] => {
    switch (activeTab) {
      case "bestsellers":
        return bestSellers;
      case "new":
        return newArrivals;
      default:
        return trendingSneakers;
    }
  };

  const ProductCard = ({
    product,
    index,
  }: ProductCardProps): React.JSX.Element => (
    <div
      className="group relative bg-card-primary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: isVisible
          ? `fadeInUp 0.6s ease-out ${index * 100}ms both`
          : "none",
      }}
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
            product.badge === "BEST SELLER"
              ? "bg-red-200 text-primary"
              : product.badge === "TRENDING"
              ? "bg-yellow-500 text-primary"
              : product.badge === "HOT"
              ? "bg-green-200 text-primary"
              : product.badge === "NEW"
              ? " text-primary"
              : "bg-blue-300 text-primary"
          }`}
        >
          {product.badge}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-64 img-primary-bg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold treanding-base-text uppercase tracking-wide">
            {product.brand}
          </span>

          <div className="flex items-center">
            <div className="flex ">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 text-rating ${
                    i < Math.floor(product.rating) ? "fill-current" : ""
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs treanding-base-text ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>

        <h3 className="font-semibold tranding-secondry-text mb-2 line-clamp-2 leading-tight  transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold tranding-secondry-text">
            {product.price}
          </span>
          <span className="text-sm treanding-base-text line-through">
            {product.originalPrice}
          </span>
          <span className="text-xs font-semibold  px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1">
            {product.colors.map((color: string, idx: number) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full border  shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-xs treanding-base-text">
            {product.sizes.length} sizes
          </span>
        </div>

        <Link
          href={`/Product/${product.id}`}
          className="flex-1 button-base-bg text-secondary bg-button-primary  py-3 px-4 rounded-lg font-semibold  transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
        >
          <span>Add to Cart</span>
        </Link>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="container overflow-hidden   poppins-font"
    >
      <div className="  relative z-10">
        {/* Header */}
        <div className="text-center">
          <p className="description-text  text-muted-foreground merriweather-font">
            Sneaker
          </p>
          <h1 className="title-text merriweather-font mb-2">
            Premium Sneaker <span className="font-medium">Collection</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col sm:flex-row">
            {[
              {
                id: "trending",
                label: "Trending Now",
                count: trendingSneakers.length,
                icon: <TrendingUp className="w-5 h-5" />,
              },
              {
                id: "bestsellers",
                label: "Best Sellers",
                count: bestSellers.length,
                icon: <Trophy className="w-5 h-5" />,
              },
              {
                id: "new",
                label: "New Arrivals",
                count: newArrivals.length,
                icon: <Sparkles className="w-5 h-5" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-6 cursor-pointer py-4 font-semibold flex items-center space-x-2 ${
                  activeTab === tab.id ? "border-b-2 border-primary" : ""
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="px-2 py-1 rounded-full text-xs ">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {getProductsByTab().map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumShoes;
