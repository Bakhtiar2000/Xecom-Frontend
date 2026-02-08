"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { shoesData, Sneaker } from "@/data/premium_shoes";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function ProductSugation() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const loopedShoes: Sneaker[] = [...shoesData, ...shoesData, ...shoesData];

  useEffect(() => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / loopedShoes.length;
    scrollRef.current.scrollLeft = cardWidth * shoesData.length;
  },);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / loopedShoes.length;
    const center = container.scrollLeft + container.offsetWidth / 2;

    const index = Math.round(center / cardWidth) % shoesData.length;
    setActiveSlide(index);

    const min = cardWidth * shoesData.length;
    const max = cardWidth * shoesData.length * 2;

    if (container.scrollLeft >= max - 10) {
      container.scrollLeft = min;
    }
    if (container.scrollLeft <= min - 10) {
      container.scrollLeft = max - container.offsetWidth;
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const stopDrag = () => setIsDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;

    const cardWidth = scrollRef.current.scrollWidth / loopedShoes.length;
    const centerOffset = scrollRef.current.offsetWidth / 2 - cardWidth / 2;

    scrollRef.current.scrollTo({
      left: cardWidth * (shoesData.length + index) - centerOffset,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={stopDrag}
        className={`flex gap-6 overflow-x-scroll scrollbar-hide select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {loopedShoes.map((shoe, idx) => (
          <div
            key={`${shoe.id}-${idx}`}
            className="shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[22%] my-5 lg:my-10"
          >
            <Card
              className={`group overflow-hidden border-0 transition-all duration-300`}
            >
              <CardContent className="p-4">
                <div className="relative aspect-square rounded-xl bg-muted overflow-hidden">
                  <Image
                    src={shoe.image}
                    alt={shoe.name}
                    fill
                    className="object-contain p-4 transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white dark:bg-black dark:text-white text-black hover:bg-muted/90 gap-2">
                      <Link
                        className="flex justify-center gap-2"
                        href={`/product-details/${shoe.id}`}
                      >
                        {" "}
                        <Eye className="w-4 h-4" />
                        Quick View
                      </Link>
                    </Button>
                  </div>

                  <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                    {shoe.badge}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-xs uppercase text-muted-foreground">
                    {shoe.brand}
                  </p>

                  <h3 className="text-sm font-semibold line-clamp-1">
                    {shoe.name}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {shoe.category}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="font-bold">{shoe.price}</span>
                    {shoe.originalPrice !== shoe.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        {shoe.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {shoesData.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`h-2 rounded-full transition-all ${
              activeSlide === i ? "w-8 bg-primary" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
