"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Target } from "lucide-react";
import AnimatedCursorImage from "@/components/custom/AnnimatedCursorImage";
import { useEffect, useRef, useState } from "react";
import { team, trust, values } from "@/data/about";
import AnimatedCounter from "@/components/custom/AnnimationCounter";
import shoes4 from "@/assets/shoes/shoes4.jpg";

export default function AboutCompanyPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const loopedShoes = [...team, ...team, ...team];

  // Initialize scroll position
  useEffect(() => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / loopedShoes.length;
    scrollRef.current.scrollLeft = cardWidth * team.length;
  }, []);

  // Auto-scroll every 2 second
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (!isDragging && scrollRef.current) {
          const container = scrollRef.current;
          const cardWidth = container.scrollWidth / loopedShoes.length;

          container.scrollTo({
            left: container.scrollLeft + cardWidth,
            behavior: "smooth",
          });
        }
      }, 1500); 
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isDragging, loopedShoes.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / loopedShoes.length;
    const center = container.scrollLeft + container.offsetWidth / 2;

    const index = Math.round(center / cardWidth) % team.length;
    setActiveSlide(index);

    const min = cardWidth * team.length;
    const max = cardWidth * team.length * 2;

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
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
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
      left: cardWidth * (team.length + index) - centerOffset,
      behavior: "smooth",
    });
  };

  return (
    <section className="container space-y-14  md:space-y-14 lg:space-y-24">
      {/* COMPANY INTRO */}
    <div className="grid md:grid-cols-2 gap-12 items-center">
  <div className="space-y-6 text-center md:text-left">
    <h1 className="text-2xl md:text-5xl font-bold">About STEPS</h1>
    <p className="text-lg  text-muted-foreground">
      STEPS is a premium sneaker brand and online destination, delivering
      authentic footwear that blends performance, culture, and lifestyle.
      We work with globally trusted manufacturers to bring you the best in
      sneakers.
    </p>
    <p className="text-muted-foreground">
      Founded by sneaker enthusiasts, our goal is to make premium sneakers
      accessible to everyone — without compromise.
    </p>
  </div>
  <div className="w-full h-full overflow-hidden rounded-2xl">
    <Image
      width={600}
      height={600}
      src={shoes4.src}
      alt="Our sneaker company"
      className="rounded-2xl w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>
</div>

      {/* MISSION & VISION */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mission */}
        <Card
          className="
      rounded-3xl
      border border-border
      bg-card-primary
      transition-all duration-300
      hover:shadow-lg
    "
        >
          <CardContent className="p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center">
                <Target className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Our Mission
              </h3>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground max-w-prose">
              To provide authentic, high-quality sneakers that inspire
              confidence, comfort, and self-expression for every step.
            </p>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card
          className="
      rounded-3xl
      border border-border
      bg-card-primary
      transition-all duration-300
      hover:shadow-lg
    "
        >
          <CardContent className="p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center">
                <Globe className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Our Vision
              </h3>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground max-w-prose">
              To become a globally trusted sneaker brand known for authenticity,
              innovation, and community-driven culture.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CORE VALUES */}
      <div className="space-y-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center tracking-tight">
          Our Core Values
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item) => (
            <Card
              key={item.title}
              className="
          group rounded-3xl
          border border-border
          bg-card-primary
          transition-all duration-300
          hover:-translate-y-2
          hover:shadow-xl
        "
            >
              <CardContent className="py-10 px-6 space-y-5 text-center">
                {/* Icon */}
                <div
                  className="
              mx-auto w-14 h-14 rounded-2xl
              border border-border
              flex items-center justify-center
              transition-transform duration-300
              group-hover:scale-105
            "
                >
                  <item.icon className="w-7 h-7 text-foreground" />
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold tracking-tight">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* TEAM MEMBERS */}
      <div className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>

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
          className={`flex gap-6 overflow-x-auto scrollbar-hide select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
        >
          {loopedShoes.map((member, index) => (
            <Card
              key={`${member.id}-${index}`}
              className="text-center  shrink-0 w-70 sm:w-75 lg:w-[calc(25%-18px)]"
            >
              <CardContent className="p-6 space-y-4">
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>

                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {team.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* WHY TRUST US */}
      <div className=" p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {trust.map((item) => (
            <div key={item.label} className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl border border-border flex items-center justify-center mb-4">
                <item.icon className="w-8 h-8 text-foreground" />
              </div>

              <h4 className="text-lg md:text-xl lg:text-2xl font-bold">
                <AnimatedCounter
                  target={item.targetNumber}
                  suffix={item.suffix}
                  duration={2000}
                />
              </h4>

              <p className="text-sm md:text-lg text-muted-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
