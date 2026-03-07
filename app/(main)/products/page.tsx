"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductContent from "./sections/ProductContent";

function ProductsWrapper() {
  const searchParams = useSearchParams();
  const key = searchParams.get("categories") ?? "all";
  return <ProductContent key={key} />;
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsWrapper />
    </Suspense>
  );
}