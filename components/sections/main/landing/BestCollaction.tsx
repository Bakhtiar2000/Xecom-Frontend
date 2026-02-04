"use client";

import Image from "next/image";
import SectionTitle from "../../shared/SectionTitle";

const products = [
  {
    id: 1,
    title: "Sneakers Skate",
    price: "$125.00",
    image: "/man.png",
    border: "border-blue-500",
  },
  {
    id: 2,
    title: "Sneakers Skate",
    price: "$125.00",
    image: "/man2.png",
    border: "border-yellow-500",
  },
  {
    id: 3,
    title: "Sneakers Skate",
    price: "$125.00",
    image: "/man3.png",
    border: "border-black",
  },
  {
    id: 4,
    title: "Sneakers Skate",
    price: "$125.00",
    image: "/man4.png",
    border: "border-red-500",
  },
  {
    id: 5,
    title: "Sneakers Skate",
    price: "$125.00",
    image: "/man5.png",
    border: "border-orange-500",
  },
  {
    id: 6,
    title: "Sneakers Skate",
    price: "$125.00",
    image: "/man.png",
    border: "border-lime-500",
  },
  {
    id: 7,
    title: "Sneakers Skate",
    price: "$125.00",
    image: "/man2.png",
    border: "border-indigo-500",
  },
  {
    id: 8,
    title: "Sneakers Skate",
    price: "$125.00",
    image: "/man3.png",
    border: "border-emerald-500",
  },
];

export default function BestCollection() {
  return (
    <section className="container h-[80vh]">
        <SectionTitle  subtitle="Featured Products" title="Our Best Collection" />
    
      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-30 mt-30 ">
        {products.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-xl h-40 max-w-70  border ${item.border}  text-center transition hover:shadow-lg`}
          >
            {/* IMAGE */}
            <div className="relative h-40  -mt-25">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain "
              />
            </div>

            {/* COLOR DOTS */}
            <div className="flex justify-center gap-1 mb-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span className="w-2 h-2 bg-green-500 rounded-full" />
            </div>

            {/* TEXT */}
            <h4 className="text-sm font-medium">{item.title}</h4>
            <p className="text-sm font-semibold text-red-500 mt-1">
              {item.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
