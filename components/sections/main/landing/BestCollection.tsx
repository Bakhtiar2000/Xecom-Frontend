"use client";

import Image from "next/image";
import SectionTitle from "../../shared/SectionTitle";
import { products } from "@/data/best-collaction";
import Link from "next/link";

export default function BestCollection() {
  return (
    <section className="container">
      <SectionTitle subtitle="Featured Products" title="Our Best Collection" />

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-30 lg:grid-cols-4 lg:gap-30">
        {products.map((item) => (
          <Link
            href={`/product-details/${item.id}`}
            key={item.id}
            className={`group bg-card-primary relative max-w-90 rounded-xl border-2 p-2 lg:h-50 ${item.border} text-center hover:shadow-xl ${item.shadowColor} cursor-pointer`}
          >
            {/* IMAGE */}
            <div className="relative h-40 transition-transform duration-300 group-hover:scale-110 lg:-mt-25">
              <Image src={item.image} alt={item.title} fill className="object-contain" />
            </div>

            {/* COLOR DOTS */}
            <div className="mb-2 flex justify-center gap-1">
              <span className="bg-danger h-2 w-2 rounded-full" />
              <span className="bg-success-foreground h-2 w-2 rounded-full" />
              <span className="bg-rating h-2 w-2 rounded-full" />
              <span className="bg-success-foreground h-2 w-2 rounded-full" />
            </div>

            {/* TEXT */}
            <h4 className="text-sm font-medium">{item.title}</h4>
            <p className="text-danger mt-1 text-sm font-semibold">{item.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
