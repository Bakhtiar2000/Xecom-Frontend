"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/faq-data";
import SectionTitle from "@/components/sections/shared/SectionTitle";

type Category = keyof typeof faqData;

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("General");

  const sectionRefs = useRef<Record<Category, HTMLDivElement | null>>(
    {} as Record<Category, HTMLDivElement | null>
  );
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- SCROLL SPY ---------------- */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const entries = Object.entries(sectionRefs.current) as [Category, HTMLDivElement][];

      const scrollBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 10;

      // ✅ If at bottom → activate last category
      if (scrollBottom) {
        const lastCategory = entries[entries.length - 1][0];
        setActiveCategory(lastCategory);
        return;
      }

      // Normal scroll-spy logic
      for (const [category, el] of entries) {
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (rect.top <= containerRect.top + 120) {
          setActiveCategory(category);
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (category: Category) => {
    const container = scrollContainerRef.current;
    const targetSection = sectionRefs.current[category];

    if (container && targetSection) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetSection.getBoundingClientRect();

      const offset = targetRect.top - containerRect.top - 20;
      container.scrollTo({
        top: container.scrollTop + offset,
        behavior: "smooth",
      });
    }

    setActiveCategory(category);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="bg-background pb-6">
        <div className="text-center">
          <SectionTitle
            title=" Frequently Asked Questions"
            description=" Find quick answers about sneakers, shipping, and payments."
          ></SectionTitle>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Sidebar */}
        <aside className="bg-card-primary top-32 hidden h-fit space-y-1 rounded-lg p-4 md:block lg:sticky">
          {(Object.keys(faqData) as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              onMouseDown={(e) => e.preventDefault()}
              className={`w-full rounded-lg px-4 py-2 text-left text-sm transition ${
                activeCategory === category
                  ? `ml-4 font-bold`
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </aside>

        {/* FAQ Content (ALL categories rendered) */}
        <div
          ref={scrollContainerRef}
          className="bg-card-primary max-h-[calc(100vh-200px)] space-y-14 overflow-y-auto scroll-smooth rounded-lg p-8 pr-2 md:col-span-3"
        >
          {(Object.keys(faqData) as Category[]).map((category) => (
            <div
              key={category}
              ref={(el) => {
                sectionRefs.current[category] = el;
              }}
              id={category}
            >
              <h2 className="mb-6 text-2xl font-semibold">{category}</h2>

              <Accordion type="single" collapsible className="space-y-2">
                {faqData[category].map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category}-${index}`}
                    className="rounded-lg border border-b! px-4 py-1"
                  >
                    <AccordionTrigger className="text-left md:text-[15px]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-[15px]">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
