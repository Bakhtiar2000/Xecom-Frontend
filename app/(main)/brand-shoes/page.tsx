import type { Metadata } from "next";
import BrandShoesClient from "./BrandShoesClient";

export const metadata: Metadata = {
  title: "Brand Shoes | Explore Top Sneaker Brands",
  description:
    "Discover the latest sneakers from top brands like Nike, Adidas, Puma, and more. Shop your favorite styles and find the perfect pair for you.",
};

export default function BrandShoesPage() {
  return <BrandShoesClient />;
}
