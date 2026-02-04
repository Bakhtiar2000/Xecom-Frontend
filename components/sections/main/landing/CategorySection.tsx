"use client";

import { useState, useRef, useEffect } from "react";
import CategoryCard from "@/components/customComponents/CategoryCard";
import { categories } from "@/data/category_shoes";
import SectionTitle from "../../shared/SectionTitle";

export default function CategorySection() {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isScrollable = isMobile || categories.length > 5;

  const loopedCategories = isScrollable
    ? [...categories, ...categories, ...categories]
    : categories;

  const totalSlides = categories.length;

  // Initialize scroll position to middle set
  useEffect(() => {
    if (scrollRef.current && isScrollable) {
      const cardWidth = scrollRef.current.scrollWidth / loopedCategories.length;
      scrollRef.current.scrollLeft = cardWidth * categories.length;
    }
  }, [isScrollable, loopedCategories.length]);

  // Handle infinite scroll loop and calculate center card
  const handleScroll = () => {
    if (!scrollRef.current || !isScrollable) return;

    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / loopedCategories.length;
    const currentScroll = container.scrollLeft;
    const containerCenter = container.offsetWidth / 2;
    const scrollCenter = currentScroll + containerCenter;
    const centerCardIndex = Math.round(scrollCenter / cardWidth);
    const relativeCenterIndex = centerCardIndex % categories.length;

    setActiveSlide(relativeCenterIndex);

    const maxScroll = cardWidth * categories.length * 2;
    const minScroll = cardWidth * categories.length;

    if (currentScroll >= maxScroll - 10) {
      scrollRef.current.scrollLeft = minScroll;
    } else if (currentScroll <= cardWidth * (categories.length - 1) + 10) {
      scrollRef.current.scrollLeft =
        minScroll + (currentScroll - cardWidth * (categories.length - 1));
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Dot click navigation
  const scrollToSlide = (slideIndex: number) => {
    if (scrollRef.current && isScrollable) {
      const cardWidth = scrollRef.current.scrollWidth / loopedCategories.length;
      const containerCenter = scrollRef.current.offsetWidth / 2;
      const cardCenter = cardWidth / 2;
      const targetScroll =
        cardWidth * (categories.length + slideIndex) +
        cardCenter -
        containerCenter;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container  mb-5  lg:mb-30">
      <SectionTitle
        subtitle="All Category Shoes Available."
        title="OUR PRODUCT CATEGORY"
      />

      {isScrollable ? (
        <div className="relative">
          {/* Carousel Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex gap-6 overflow-x-scroll scrollbar-hide pb-4 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {loopedCategories.map((cat, idx) => (
              <div
                key={`${cat.id}-${idx}`}
                className="shrink-0 pointer-events-none"
                style={{
                  width: isMobile
                    ? "calc((100% - 1.5rem) / 2)"
                    : "calc((100% - 4 * 1.5rem) / 5)",
                }}
              >
                <CategoryCard
                  category={cat}
                  active={idx % categories.length === activeSlide}
                />
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 ">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Normal grid for lg devices with 5 or fewer items
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.id} category={cat} active={idx === 2} />
          ))}
        </div>
      )}
    </div>
  );
}
