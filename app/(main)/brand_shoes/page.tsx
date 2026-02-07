"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import { shoesData, Sneaker } from "@/data/premium_shoes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, ShoppingBag, Plus, Minus } from "lucide-react";
import { NoSneakersCard } from "@/components/customComponents/NoSneakersCard";

export default function SneakerShoesPage() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Sneaker | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredShoes = activeBrand
    ? shoesData.filter((shoe) => shoe.brand === activeBrand)
    : [];
  const brands = [
    { name: "Nike", logo: "/Nike.png" },
    { name: "Adidas", logo: "/Adidas.png" },
    { name: "Puma", logo: "/Puma.png" },
    { name: "Fila", logo: "/FILA.png" },
    { name: "Lotto", logo: "/Lotto.png" },
    { name: "Bata", logo: "/Bata.png" },
    { name: "Reebok", logo: "/Reebok.png" },
    { name: "Jordan", logo: "/Jordan.png" },
  ];

  return (
    <section className="container py-12 px-4">
      <SectionTitle
        title="MOST POPULAR BRANDS"
        description="Choose a brand to explore available sneakers"
      />

      {/* BRAND LOGOS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
        {brands.map((brand) => (
          <button
            key={brand.name}
            onClick={() => setActiveBrand(brand.name)}
            className={`border rounded-2xl flex bg-card-primary items-center lg:h-50 cursor-pointer justify-center hover:shadow-md transition
              ${activeBrand === brand.name ? "ring-2 ring-primary" : ""}
            `}
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={120}
              height={120}
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      {activeBrand && (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            {activeBrand} Sneakers
          </h2>
          {filteredShoes.length === 0 && (
            <div className="col-span-full">
              <NoSneakersCard />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredShoes.map((shoe) => (
              <Card
                key={shoe.id}
                className="group overflow-hidden hover:shadow-md transition"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-muted rounded-xl">
                    <Image
                      src={shoe.image}
                      alt={shoe.name}
                      fill
                      className="object-contain"
                    />

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <Button size="sm" className="bg-white text-black">
                        <Link
                          href={`/productDetails/${shoe.id}`}
                          className="flex gap-2 items-center"
                        >
                          <Eye className="w-4 h-4" />
                          Quick View
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {shoe.category}
                    </p>

                    <h3 className="font-semibold line-clamp-1">{shoe.name}</h3>

                    <span className="font-bold">{shoe.price}</span>

                    <Button
                      className="w-full mt-3"
                      variant="outline"
                      onClick={() => {
                        setSelectedShoe(shoe);
                        setSelectedSize(null);
                        setSelectedColor(null);
                        setOpen(true);
                      }}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ADD TO CART MODAL (UNCHANGED) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          {selectedShoe && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedShoe.name}</DialogTitle>
              </DialogHeader>

              {/* Size */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Select Size</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedShoe.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded-md border
                        ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "hover:border-primary"
                        }
                      `}
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
                  {selectedShoe.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border-2
                        ${
                          selectedColor === color
                            ? "border-primary scale-110"
                            : ""
                        }
                      `}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mt-4">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={quantity === 1}
                  onClick={() => setQuantity((q) => q - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <span className="font-semibold">{quantity}</span>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button
                className="w-full mt-6"
                disabled={!selectedSize || !selectedColor}
                onClick={() => {
                  console.log("Added to cart", {
                    ...selectedShoe,
                    size: selectedSize,
                    color: selectedColor,
                    quantity,
                  });
                  setOpen(false);
                }}
              >
                Add to Cart
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
