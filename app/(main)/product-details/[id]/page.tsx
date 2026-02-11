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
    <div className="container ">
      {/* Main Product Section */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative md:flex flex-row gap-6">
      
      
              {/* Thumbnail Images */}
              <div className="flex md:flex-col py-5 md:-mt-5 flex-row gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-md cursor-pointer bg-card-primary overflow-hidden border-2 ${
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
               className="relative group cursor-crosshair w-full lg:w-[full h-120 bg-card-primary rounded-lg overflow-hidden"
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
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${zoomPosition.x}% ${zoomPosition.y}%, transparent 30%, rgba(0,0,0,0.1) 100%)`,
                    }}
                  />
                )}

                {/* Zoom Indicator Overlay */}
                <div className="absolute inset-0  transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 dark:bg-muted/90 backdrop-blur-sm text-gray-900 dark:text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                    <ZoomIn className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Hover to preview
                    </span>
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-danger text-danger-foreground px-3 py-1 rounded-full text-xs font-bold">
                    -38%
                  </span>
                </div>
              </div>

              {/* Hover Zoom Preview Box - Shows on the right side */}
              {isHovering && (
                <div
                  ref={zoomBoxRef}
                  className="absolute left-[calc(80%+2rem)] top-70 -translate-y-1/2 w-120 h-100 bg-white dark:bg-muted rounded-lg shadow-2xl overflow-hidden border-2 border-white dark:border-gray-700 z-30 hidden lg:block"
                  style={{
                    marginLeft: "1rem",
                  }}
                >
                  <div className="relative w-full h-full">
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
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                      2.5x Zoom
                    </div>

                    {/* Crosshair Center Indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-white rounded-full opacity-50" />
                  </div>
                </div>
              )}
          

            {/* Rest of your product details component... */}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="lg:text-3xl text-xl font-bold  mb-2">
                {product.name}
              </h1>
              <div className="flex items-center justify-between">
                <span className="detailsPage-text-primary text-sm">
                  SKU: {product.sku}
                </span>
                <div className="flex items-center">
                  <div className="flex text-rating mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.reviews.rating) ? "fill-current" : "text-rating"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews.count} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="lg:text-4xl text-2xl font-bold ">
                  TK. {product.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  TK. {product.originalPrice}
                </span>
                <span className="text-sm font-bold text-danger bg-danger-foreground px-2 py-1 rounded">
                  {product.discount} OFF
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className=" text-sm font-medium">{product.vat}</span>
                <span className="text-muted-foreground text-sm">•</span>
                <span className="detailsPage-text-primary text-sm">
                  Inclusive of all taxes
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold ">Size</h3>
                <button className="text-sm  flex items-center gap-1">
                  <span>Size Chart</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                    className={`w-14 lg:h-14 h-10 flex items-center cursor-pointer justify-center border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-border bg-white dark:bg-card-primary hover:border-border/80"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* Color Section Images */}
              <h3 className="font-semibold  mt-2">Color</h3>
              <div className="flex  my-2 flex-row gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-15 h-15 cursor-pointer bg-card-primary rounded-full overflow-hidden border-2 ${
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
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex w-full md:w-auto items-center  justify-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 cursor-pointer flex items-center justify-center hover:bg-muted"
                  >
                    <span className="text-xl">-</span>
                  </button>

                  <span className="w-12 h-12 flex items-center justify-center font-medium">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 cursor-pointer h-12 flex items-center justify-center hover:bg-muted"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>

                <button className="w-full cursor-pointer md:flex-1 bg-black text-white rounded-lg font-semibold  transition-colors flex items-center justify-center gap-2 h-12">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>

                <button className="w-full md:w-auto px-6 h-12 border-2 border-black rounded-lg font-semibold hover:bg-muted cursor-pointer transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="mb-8 p-4 bg-button-ternary/5  rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="w-5 h-5 text-button-ternary" />
                <span className="font-medium text-button-ternary">
                  {product.deliveryInfo}
                </span>
              </div>
              <div className="text-sm text-button-ternary">
                <p className="mb-1">✓ Free shipping across Bangladesh</p>
                <p>✓ Estimated delivery: 3-5 business days</p>
              </div>
            </div>

            <div className="mb-8">
              <button className="w-full cursor-pointer py-3 border border-border bg-muted rounded-lg  transition-colors flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
              <h3 className="font-semibold  mb-3">Product Info</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="detailsPage-text-primary text-sm">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium  mb-2">Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm detailsPage-text-primary"
                      >
                        <svg
                          className="w-4 h-4  mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
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

            <div className="text-xs detailsPage-text-primary text-center">
              <p>
                Product color may slightly vary, depending on your screen
                resolution
              </p>
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
