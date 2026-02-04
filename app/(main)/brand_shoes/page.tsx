"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Eye, ShoppingBag, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { shoesData, Sneaker } from "@/data/premium_shoes";
import { useTypewriter } from "react-simple-typewriter";
import Link from "next/link";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SneakerShoesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [open, setOpen] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Sneaker | null>(null);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const categories = ["All", ...new Set(shoesData.map((s) => s.category))];

  // 🔹 Filter first
  const filteredShoes = shoesData.filter((shoe) => {
    const matchSearch =
      shoe.name.toLowerCase().includes(search.toLowerCase()) ||
      shoe.brand.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || shoe.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const [text] = useTypewriter({
    words: [
      "Search by brand (Nike, Adidas)",
      "Search by model (Air Jordan, Ultraboost)",
      "Search by category (Running, Lifestyle)",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  // 🔹 Sort shoes
  filteredShoes.sort((a, b) => {
    switch (sortBy) {
      case "featured": {
        const priority = [
          "BEST SELLER",
          "TRENDING",
          "HOT",
          "POPULAR",
          "NEW",
          "LIMITED",
        ];
        return priority.indexOf(a.badge) - priority.indexOf(b.badge);
      }

      case "price-low":
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));

      case "price-high":
        return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));

      case "rating":
        return b.rating - a.rating;

      case "newest":
        return a.badge === "NEW" ? -1 : 1;

      default:
        return 0;
    }
  });

  // 🔹 Group by brand
  const groupedByBrand = filteredShoes.reduce(
    (acc, shoe) => {
      acc[shoe.brand] = acc[shoe.brand] || [];
      acc[shoe.brand].push(shoe);
      return acc;
    },
    {} as Record<string, typeof shoesData>,
  );

  return (
    <section className="container py-12 px-4">
      {/* Page Header */}
      <SectionTitle
        title="Premium Sneaker Collection"
        description="Discover the finest selection of authentic sneakers from top brands."
      />
      {/* Search & Filter Section */}
      <div className="md:mb-5 mb-0 space-y-6">
        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto relative ">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-card-primary-foreground w-5 h-5" />
            <Input
              placeholder={text}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
    h-14 pl-12 pr-12 text-base rounded-2xl
    border-2 border-border bg-card-primary
    focus:outline-none
    focus:ring-0
    focus:border-primary
    focus-visible:outline-none
    focus-visible:ring-0
    transition-colors
  "
            />

            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-card-primary-foreground w-5 h-5" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col md:flex-row items-center md:justify-center lg:justify-between gap-4">
          <div className="hidden lg:flex  items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Category:</span>
          </div>

          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full hidden md:block md:w-auto"
          >
            <TabsList className="flex flex-wrap  h-auto p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-md cursor-pointer px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:dark:bg-gray-900"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Sort Options */}
          <div className="items-center gap-2 hidden lg:flex">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-transparent text-sm"
            >
              <option value="featured">Featured</option>
              <option value="newest">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="mb-8">
        <p className="text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredShoes.length}
          </span>{" "}
          products
          {search && ` for "${search}"`}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Shoes Grid */}
      {filteredShoes.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👟</div>
          <h3 className="text-xl font-semibold mb-2">No sneakers found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="lg:space-y-16 space-y-8">
          {Object.entries(groupedByBrand).map(([brand, shoes]) => (
            <div key={brand}>
              <h2 className="text-2xl font-semibold mb-6">{brand}</h2>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {shoes.map((shoe) => (
                  <Card
                    key={shoe.id}
                    className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="md:p-4  p-0">
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-card-primary rounded-2xl aspect-square">
                        <Image
                          src={shoe.image}
                          alt={shoe.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button className="bg-white text-black hover:bg-gray-100 gap-2">
                            <Link
                              className="flex justify-center gap-2"
                              href={`/productDetails/${shoe.id}`}
                            >
                              {" "}
                              <Eye className="w-4 h-4" />
                              Quick View
                            </Link>
                          </Button>
                        </div>

                        {/* Discount Badge */}
                        {shoe.discount && (
                          <div className="absolute top-3 left-3 bg-danger text-danger-foreground text-xs font-semibold px-2 py-1 rounded">
                            -{shoe.discount}%
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 md:space-y-1">
                        {/* Brand */}
                        <p className="md:text-xs text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                          {shoe.brand}
                        </p>

                        {/* Name */}
                        <h3 className="md:text-lg text-sm font-semibold line-clamp-1  transition-colors">
                          {shoe.name}
                        </h3>

                        {/* Category */}
                        <p className="md:text-sm text-[10px] text-muted-foreground">
                          {shoe.category}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-2 pt-1 md:pt-2">
                          <span className="md:text-lg text-sm font-bold">
                            {shoe.price}
                          </span>
                          {shoe.originalPrice &&
                            shoe.originalPrice > shoe.price && (
                              <span className="text-sm text-gray-400 line-through">
                                ${shoe.originalPrice}
                              </span>
                            )}
                        </div>

                        <Button
                          className="w-full mt-2 md:mt-4 gap-2"
                          variant="outline"
                          onClick={() => {
                            setSelectedShoe(shoe);
                            setSelectedSize(null);
                            setSelectedColor(null);
                            setOpen(true);
                          }}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          {selectedShoe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">
                  {selectedShoe.name}
                </DialogTitle>
              </DialogHeader>

              {/* Size */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {selectedShoe.sizes?.map((size: number) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1  cursor-pointer rounded-md border text-sm transition
                  ${
                    selectedSize === size
                      ? "bg-white text-black  border-primary"
                      : "border-border hover:border-primary"
                  }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium">Select Color</p>
                <div className="flex gap-3">
                  {selectedShoe.colors?.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 cursor-pointer rounded-full border-2 transition
                  ${
                    selectedColor === color
                      ? "border-primary scale-110"
                      : "border-border"
                  }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium">Quantity</p>
                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    className={`cursor-pointer border-border ${quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    variant="outline"
                    onClick={() => setQuantity((q) => q - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>

                  <span className="text-lg font-semibold">{quantity}</span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Confirm */}
              <Button
                variant="outline"
                className={`w-full mt-6 ${
                  !selectedSize || !selectedColor
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  const cartItem = {
                    ...selectedShoe,
                    size: selectedSize,
                    color: selectedColor,
                    quantity,
                  };

                  console.log("Added to cart:", cartItem);
                  setOpen(false);
                }}
              >
                Add {quantity} to Cart
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
