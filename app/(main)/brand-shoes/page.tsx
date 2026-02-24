"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import { shoesData, Sneaker } from "@/data/premium-shoes";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, ShoppingBag, Plus, Minus } from "lucide-react";
import { NoSneakersCard } from "@/components/custom/NoSneakersCard";

export default function SneakerShoesPage() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Sneaker | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredShoes = activeBrand ? shoesData.filter((shoe) => shoe.brand === activeBrand) : [];
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
    <section className="container px-4 py-12">
      <SectionTitle
        title="Most Popular Brands"
        description="Choose a brand to explore available sneakers"
      />

      {/* BRAND LOGOS */}
      <div className="mb-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {brands.map((brand) => (
          <button
            key={brand.name}
            onClick={() => setActiveBrand(brand.name)}
            className={`bg-card-primary relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border transition hover:shadow-md lg:h-70 ${activeBrand === brand.name ? "ring-primary ring-2" : ""} `}
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      {activeBrand && (
        <>
          <h2 className="mb-6 text-2xl font-semibold">{activeBrand} Sneakers</h2>
          {filteredShoes.length === 0 && (
            <div className="col-span-full">
              <NoSneakersCard />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredShoes.map((shoe) => (
              <Card key={shoe.id} className="group overflow-hidden transition hover:shadow-md">
                <CardContent className="p-0">
                  <div className="bg-muted relative aspect-square rounded-xl">
                    <Image src={shoe.image} alt={shoe.name} fill className="object-contain" />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
                      <Button size="sm" className="bg-white text-black">
                        <Link
                          href={`/product-details/${shoe.id}`}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Quick View
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1 p-4">
                    <p className="text-muted-foreground text-xs">{shoe.category}</p>

                    <h3 className="line-clamp-1 font-semibold">{shoe.name}</h3>

                    <span className="font-bold">{shoe.price}</span>

                    <Button
                      className="mt-3 w-full"
                      variant="outline"
                      onClick={() => {
                        setSelectedShoe(shoe);
                        setSelectedSize(null);
                        setSelectedColor(null);
                        setOpen(true);
                      }}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
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
                <div className="flex flex-wrap gap-2">
                  {selectedShoe.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-md border px-3 py-1 ${
                        selectedSize === size ? "bg-black text-white" : "hover:border-primary"
                      } `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Select Color</p>
                <div className="flex gap-3">
                  {selectedShoe.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-9 w-9 rounded-full border-2 ${
                        selectedColor === color ? "border-primary scale-110" : ""
                      } `}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={quantity === 1}
                  onClick={() => setQuantity((q) => q - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="font-semibold">{quantity}</span>

                <Button size="icon" variant="outline" onClick={() => setQuantity((q) => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                className="mt-6 w-full"
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
