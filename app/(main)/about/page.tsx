"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Target } from "lucide-react";
import { useEffect, useRef } from "react";
import { team, trust, values } from "@/data/about";
import AnimatedCounter from "@/components/custom/AnnimationCounter";
import shoes4 from "@/assets/shoes/shoes4.jpg";

export default function AboutCompanyPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const loopedShoes = [...team, ...team, ...team];

  // Initialize scroll position
  useEffect(() => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / loopedShoes.length;
    scrollRef.current.scrollLeft = cardWidth * team.length;
  }, []);

  return (
    <section className="container space-y-14 md:space-y-14 lg:space-y-24">
      {/* COMPANY INTRO */}
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-2xl font-bold md:text-5xl">About STEPS</h1>
          <p className="text-muted-foreground text-lg">
            STEPS is a premium sneaker brand and online destination, delivering authentic footwear
            that blends performance, culture, and lifestyle. We work with globally trusted
            manufacturers to bring you the best in sneakers.
          </p>
          <p className="text-muted-foreground">
            Founded by sneaker enthusiasts, our goal is to make premium sneakers accessible to
            everyone — without compromise.
          </p>
        </div>
        <div className="h-full w-full overflow-hidden rounded-2xl">
          <Image
            width={600}
            height={600}
            src={shoes4.src}
            alt="Our sneaker company"
            className="h-full w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>

      {/* MISSION & VISION */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Mission */}
        <Card className="border-border bg-card-primary rounded-3xl border transition-all duration-300 hover:shadow-lg">
          <CardContent className="space-y-6 p-8 md:p-12">
            <div className="flex items-center gap-4">
              <div className="border-border flex h-12 w-12 items-center justify-center rounded-xl border">
                <Target className="text-foreground h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">Our Mission</h3>
            </div>

            <p className="text-muted-foreground max-w-prose text-base leading-relaxed">
              To provide authentic, high-quality sneakers that inspire confidence, comfort, and
              self-expression for every step.
            </p>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="border-border bg-card-primary rounded-3xl border transition-all duration-300 hover:shadow-lg">
          <CardContent className="space-y-6 p-8 md:p-12">
            <div className="flex items-center gap-4">
              <div className="border-border flex h-12 w-12 items-center justify-center rounded-xl border">
                <Globe className="text-foreground h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">Our Vision</h3>
            </div>

            <p className="text-muted-foreground max-w-prose text-base leading-relaxed">
              To become a globally trusted sneaker brand known for authenticity, innovation, and
              community-driven culture.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CORE VALUES */}
      <div className="space-y-12">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          Our Core Values
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item) => (
            <Card
              key={item.title}
              className="group border-border bg-card-primary rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <CardContent className="space-y-5 px-6 py-10 text-center">
                {/* Icon */}
                <div className="border-border mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105">
                  <item.icon className="text-foreground h-7 w-7" />
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold tracking-tight">{item.title}</h4>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* WHY TRUST US */}
      <div className="p-10">
        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {trust.map((item) => (
            <div key={item.label} className="space-y-3">
              <div className="border-border mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border">
                <item.icon className="text-foreground h-8 w-8" />
              </div>

              <h4 className="text-lg font-bold md:text-xl lg:text-2xl">
                <AnimatedCounter target={item.targetNumber} suffix={item.suffix} duration={2000} />
              </h4>

              <p className="text-muted-foreground text-sm md:text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
