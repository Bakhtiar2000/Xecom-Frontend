"use client";

import Image from "next/image";
import SectionTitle from "../../shared/SectionTitle";
import { products } from "@/data/best-collaction";
import Link from "next/link";

export default function BestCollection() {
  return (
    <section className="container lg:h-[89vh]">
      <SectionTitle subtitle="Featured Products" title="Our Best Collection" />

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  lg:gap-30 lg:mt-30 ">
        {products.map((item) => (
          <Link
            href={`/product-details/${item.id}`}
            key={item.id}
            className={`group relative bg-card-primary rounded-xl p-2 lg:h-50 max-w-90 border-2 ${item.border}  text-center  hover:shadow-xl ${item.shadowColor} cursor-pointer`}
          >
            {/* IMAGE */}
            <div className="relative h-40 lg:-mt-25 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain "
              />
            </div>

            {/* COLOR DOTS */}
            <div className="flex justify-center gap-1 mb-2">
              <span className="w-2 h-2 bg-danger rounded-full" />
              <span className="w-2 h-2 bg-success-foreground rounded-full" />
              <span className="w-2 h-2 bg-rating rounded-full" />
              <span className="w-2 h-2 bg-success-foreground rounded-full" />
            </div>

            {/* TEXT */}
            <h4 className="text-sm font-medium">{item.title}</h4>
            <p className="text-sm font-semibold text-danger mt-1">
              {item.price}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
