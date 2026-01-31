"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/faq_data";
import SectionTitle from "@/components/sections/shared/SectionTitle";

type Category = keyof typeof faqData;

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("General");

  const sectionRefs = useRef<Record<Category, HTMLDivElement | null>>(
    {} as Record<Category, HTMLDivElement | null>,
  );
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- SCROLL SPY ---------------- */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const entries = Object.entries(sectionRefs.current) as [
        Category,
        HTMLDivElement,
      ][];

      const scrollBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10;

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
      // Get the target section's position relative to the container
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetSection.getBoundingClientRect();

      // Calculate the offset from container top
      const offset = targetRect.top - containerRect.top;

      // Scroll so the section appears at the top of the container
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
      <div className=" bg-background pb-6">
        <div className="text-center ">
          <SectionTitle title=" Frequently Asked Questions" description=" Find quick answers about sneakers, shipping, and payments."></SectionTitle>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <aside className="space-y-2 hidden md:block lg:sticky top-32 h-fit bg-card-primary p-4 rounded-lg">
          {(Object.keys(faqData) as Category[]).map((category, index) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              onMouseDown={(e) => e.preventDefault()}
              className={`w-full text-left px-4 py-2 rounded-lg text-sx transition
    ${
      activeCategory === category
        ? `font-bold  ${index !== 0 ? "ml-4" : ""}`
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
          className="md:col-span-3 space-y-14 bg-card-primary p-8 rounded-lg overflow-y-auto max-h-[calc(100vh-200px)] pr-2 scroll-smooth"
        >
          {(Object.keys(faqData) as Category[]).map((category) => (
            <div
              key={category}
              ref={(el) => {
                sectionRefs.current[category] = el;
              }}
              id={category}
            >
              <h2 className="text-2xl font-semibold mb-6">{category}</h2>

              <Accordion type="single" collapsible className="space-y-2">
                {faqData[category].map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category}-${index}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
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
