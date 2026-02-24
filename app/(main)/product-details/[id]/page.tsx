"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Truck, X, ZoomIn } from "lucide-react";
import ProductSugation from "./component/ProductSugation";
import ProductReviews from "./component/ProductReview";
import shoes5 from "@/assets/shoes/shoes5.png";
import shoes6 from "@/assets/shoes/shoes6.png";
import shoes7 from "@/assets/shoes/shoes7.png";
import shoes8 from "@/assets/shoes/shoes8.png";

interface Review {
  rating: number;
  count: number;
}

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  sku: string;
  vat: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  images: any;
  deliveryInfo: string;
  returnPolicy: string;
  reviews: Review;
}

interface ProductImage {
  id: number;
  src: any;
  alt: string;
}

export default function ProductDetails({ id }: { id: string }) {
  const [selectedSize, setSelectedSize] = useState("38");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const imageRef = useRef<HTMLDivElement>(null);
  const zoomBoxRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for zoom preview
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  const product: Product = {
    id,
    name: "White Viscose Straight Salwar Kameez",
    price: "3,691",
    originalPrice: "5,999",
    discount: "-38%",
    sku: "SKD77586",
    vat: "VAT included",
    description:
      "Elegant white viscose straight salwar kameez with intricate embroidery work. Perfect for festive occasions and weddings.",
    features: [
      "100% Pure Viscose",
      "Hand Embroidered",
      "Machine Washable",
      "Premium Quality Stitching",
    ],
    sizes: ["34", "36", "38", "40", "42"],
    colors: ["#FFFFFF", "#F5F5F5", "#E8E8E8"],
    images: [shoes8, shoes7, shoes6, shoes5],
    deliveryInfo: "FREE DELIVERY on orders above TK. 8000",
    returnPolicy: "15 Days Return Policy",
    reviews: {
      rating: 4.5,
      count: 128,
    },
  };

  const productImages: ProductImage[] = [
    { id: 1, src: shoes8, alt: "Front View" },
    { id: 2, src: shoes7, alt: "Side View" },
    { id: 3, src: shoes6, alt: "Back View" },
    { id: 4, src: shoes5, alt: "Detail View" },
  ];

  return (
    <div className="container">
      {/* Main Product Section */}
      <div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative flex-row gap-6 md:flex">
            {/* Thumbnail Images */}
            <div className="flex flex-row gap-3 py-5 md:-mt-5 md:flex-col">
              {productImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-card-primary relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border-2 ${
                    selectedImage === index ? "border-black" : "border-border"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>

            {/* Main Image with Hover Zoom Preview */}
            <div
              ref={imageRef}
              className="group lg:w-[full bg-card-primary relative h-120 w-full cursor-crosshair overflow-hidden rounded-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Main Product Image */}
              <Image
                src={productImages[selectedImage].src}
                alt={productImages[selectedImage].alt}
                fill
                className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw"
              />

              {/* Hover Zoom Lens Effect */}
              {isHovering && (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at ${zoomPosition.x}% ${zoomPosition.y}%, transparent 30%, rgba(0,0,0,0.1) 100%)`,
                  }}
                />
              )}

              {/* Zoom Indicator Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-colors group-hover:opacity-100">
                <div className="dark:bg-muted/90 flex scale-90 transform items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-gray-900 shadow-lg backdrop-blur-sm transition-all group-hover:scale-100 dark:text-white">
                  <ZoomIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Hover to preview</span>
                </div>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-danger text-danger-foreground rounded-full px-3 py-1 text-xs font-bold">
                  -38%
                </span>
              </div>
            </div>

            {/* Hover Zoom Preview Box - Shows on the right side */}
            {isHovering && (
              <div
                ref={zoomBoxRef}
                className="dark:bg-muted absolute top-70 left-[calc(80%+2rem)] z-30 hidden h-100 w-120 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-white bg-white shadow-2xl lg:block dark:border-gray-700"
                style={{
                  marginLeft: "1rem",
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={productImages[selectedImage].src}
                    alt={productImages[selectedImage].alt}
                    fill
                    className="object-cover"
                    sizes="320px"
                    style={{
                      transform: `scale(2.5) translate(${50 - zoomPosition.x}%, ${50 - zoomPosition.y}%)`,
                      transition: "transform 0.05s ease-out",
                    }}
                  />

                  {/* Zoom Level Indicator */}
                  <div className="absolute top-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    2.5x Zoom
                  </div>

                  {/* Crosshair Center Indicator */}
                  <div className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white opacity-50" />
                </div>
              </div>
            )}

            {/* Rest of your product details component... */}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="mb-2 text-xl font-bold lg:text-3xl">{product.name}</h1>
              <div className="flex items-center justify-between">
                <span className="detailsPage-text-primary text-sm">SKU: {product.sku}</span>
                <div className="flex items-center">
                  <div className="text-rating mr-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.reviews.rating) ? "fill-current" : "text-rating"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({product.reviews.count} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-2xl font-bold lg:text-4xl">TK. {product.price}</span>
                <span className="text-muted-foreground text-lg line-through">
                  TK. {product.originalPrice}
                </span>
                <span className="text-danger bg-danger-foreground rounded px-2 py-1 text-sm font-bold">
                  {product.discount} OFF
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{product.vat}</span>
                <span className="text-muted-foreground text-sm">•</span>
                <span className="detailsPage-text-primary text-sm">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Size</h3>
                <button className="flex items-center gap-1 text-sm">
                  <span>Size Chart</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-10 w-14 cursor-pointer items-center justify-center rounded-lg border-2 font-medium transition-all lg:h-14 ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-border dark:bg-card-primary hover:border-border/80 bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* Color Section Images */}
              <h3 className="mt-2 font-semibold">Color</h3>
              <div className="my-2 flex flex-row gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-card-primary relative h-15 w-15 cursor-pointer overflow-hidden rounded-full border-2 ${
                      selectedImage === index ? "border-black" : "border-border"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mb-8">
              <div className="flex w-full flex-col gap-4 md:flex-row">
                <div className="border-border flex w-full items-center justify-center rounded-lg border md:w-auto">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:bg-muted flex h-12 w-12 cursor-pointer items-center justify-center"
                  >
                    <span className="text-xl">-</span>
                  </button>

                  <span className="flex h-12 w-12 items-center justify-center font-medium">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:bg-muted flex h-12 w-12 cursor-pointer items-center justify-center"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>

                <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black font-semibold text-white transition-colors md:flex-1">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>

                <button className="hover:bg-muted h-12 w-full cursor-pointer rounded-lg border-2 border-black px-6 font-semibold transition-colors md:w-auto">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="bg-button-ternary/5 mb-8 rounded-lg p-4">
              <div className="mb-2 flex items-center gap-3">
                <Truck className="text-button-ternary h-5 w-5" />
                <span className="text-button-ternary font-medium">{product.deliveryInfo}</span>
              </div>
              <div className="text-button-ternary text-sm">
                <p className="mb-1">✓ Free shipping across Bangladesh</p>
                <p>✓ Estimated delivery: 3-5 business days</p>
              </div>
            </div>

            <div className="mb-8">
              <button className="border-border bg-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-3 transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Check Store availability
              </button>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 font-semibold">Product Info</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="detailsPage-text-primary text-sm">{product.description}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="detailsPage-text-primary flex items-center text-sm"
                      >
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="detailsPage-text-primary text-center text-xs">
              <p>Product color may slightly vary, depending on your screen resolution</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProductSugation></ProductSugation>
        <ProductReviews></ProductReviews>
      </div>
    </div>
  );
}
