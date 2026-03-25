"use client"

import SectionTitle from "@/components/sections/shared/SectionTitle";
import { useGetAllBrandsQuery } from "@/redux/features/product/brand.api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SneakerShoesPage() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const { data: brandsData, isLoading: isBrandsLoading } = useGetAllBrandsQuery([]);

  return (
    <section className="container px-4 py-12">
      <SectionTitle
        title="Most Popular Brands"
        description="Choose a brand to explore available sneakers"
      />

      <div className="mb-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {isBrandsLoading ? (
          <p>Loading brands...</p>
        ) : (
          brandsData?.data?.map((brand) => (
            <Link
              key={brand.id}
              href={`/products?brandIds=${brand.id ?? brand.id}`}
              className={`bg-card-primary relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border transition hover:shadow-md lg:h-70 ${activeBrand === brand.name ? "ring-primary ring-2" : ""
                }`}
            >
              <Image
                src={brand.logoUrl}
                alt={brand.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </Link>
          ))
        )}
      </div>
    </section>
  );
}