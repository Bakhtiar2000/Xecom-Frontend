"use client";

import { useState, useRef, useEffect } from "react";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import CategoryCard from "@/components/sections/main/landing/sections/CategoryCard";
import { useGetAllCategoriesQuery } from "@/redux/features/product/category.api";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategorySection() {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false); // Track if user dragged
  const dragThreshold = 5; // Minimum pixels to consider as drag

  const { data: apiResponse, isLoading } = useGetAllCategoriesQuery([]);
  const categories = apiResponse?.data || [];

  // Transform API data to match CategoryCard expectations
  const transformedCategories = categories.map((cat: any) => ({
    id: cat.id,
    title: cat.name,
    imageUrl: cat.imageUrl,
  }));

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isScrollable = isMobile || transformedCategories.length > 5;

  const loopedCategories = isScrollable
    ? [...transformedCategories, ...transformedCategories, ...transformedCategories]
    : transformedCategories;

  const totalSlides = transformedCategories.length;

  // Initialize scroll position to middle set
  useEffect(() => {
    if (scrollRef.current && isScrollable) {
      const cardWidth = scrollRef.current.scrollWidth / loopedCategories.length;
      scrollRef.current.scrollLeft = cardWidth * transformedCategories.length;
    }
  }, [isScrollable, loopedCategories.length, transformedCategories.length]);

  // Handle infinite scroll loop and calculate center card
  const handleScroll = () => {
    if (!scrollRef.current || !isScrollable) return;

    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / loopedCategories.length;
    const currentScroll = container.scrollLeft;
    const containerCenter = container.offsetWidth / 2;
    const scrollCenter = currentScroll + containerCenter;
    const centerCardIndex = Math.round(scrollCenter / cardWidth);
    const relativeCenterIndex = centerCardIndex % transformedCategories.length;

    setActiveSlide(relativeCenterIndex);

    const maxScroll = cardWidth * transformedCategories.length * 2;
    const minScroll = cardWidth * transformedCategories.length;

    if (currentScroll >= maxScroll - 10) {
      scrollRef.current.scrollLeft = minScroll;
    } else if (currentScroll <= cardWidth * (transformedCategories.length - 1) + 10) {
      scrollRef.current.scrollLeft =
        minScroll + (currentScroll - cardWidth * (transformedCategories.length - 1));
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false); // Reset drag flag
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;

    // Check if drag distance exceeds threshold
    if (Math.abs(walk) > dragThreshold) {
      setHasDragged(true);
    }

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
    setHasDragged(false); // Reset drag flag
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;

    // Check if drag distance exceeds threshold
    if (Math.abs(walk) > dragThreshold) {
      setHasDragged(true);
    }

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
        cardWidth * (transformedCategories.length + slideIndex) + cardCenter - containerCenter;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // Handle card click - prevent navigation if dragged
  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <SectionTitle subtitle="Loading Categories..." title="Our Product Category" />
      ) : (
        <SectionTitle subtitle="All Category Shoes Available." title="Our Product Category" />
      )}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="relative my-5 flex h-55 max-w-65 flex-col items-center justify-center rounded-full shadow-md lg:my-10 lg:h-85"
            >
              {/* Circle Image Skeleton */}
              <Skeleton className="h-full w-full rounded-full" />

              {/* Text Skeleton */}
              <div className="absolute bottom-5 lg:bottom-10">
                <Skeleton className="mx-auto h-5 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : isScrollable ? (
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
            className={`scrollbar-hide flex gap-6 overflow-x-scroll pb-4 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {loopedCategories.map((cat, idx) => (
              <div
                key={`${cat.id}-${idx}`}
                className="pointer-events-auto w-[calc((100%-1.5rem)/2)] shrink-0 sm:w-[calc((100%-3rem)/3)] md:w-[calc((100%-4.5rem)/4)] lg:w-[calc((100%-6rem)/5)]"
                onClick={handleCardClick}
              >
                <CategoryCard
                  category={cat}
                  active={idx % transformedCategories.length === activeSlide}
                />
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === index ? "bg-primary w-8" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Normal grid for lg devices with 5 or fewer items
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {transformedCategories.map((cat, idx) => (
            <div key={cat.id} className="w-full">
              <CategoryCard category={cat} active={idx === 2} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
