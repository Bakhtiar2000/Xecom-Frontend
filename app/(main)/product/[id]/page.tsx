"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Truck, ZoomIn, Heart, Share2, ShieldCheck, RotateCcw, ChevronDown, ChevronUp, Star, Package, Eye, Loader2 } from "lucide-react";
import ProductSugation from "./section/ProductSugation";
import ProductReviews from "./section/ProductReview";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/features/product/product.api";
import { useAddToCartMutation, useGetMyCartQuery } from "@/redux/features/order/cart.api";
import { toast } from "sonner";

export default function ProductDetails() {
  const params = useParams();
  const id = params.id as string;

  const { data: apiResponse, isLoading } = useGetSingleProductQuery(id);
  const product = apiResponse?.data;

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "shipping">("description");

  const imageRef = useRef<HTMLDivElement>(null);
  const zoomBoxRef = useRef<HTMLDivElement>(null);

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

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent" />
          <p className="text-muted-foreground text-sm">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container flex items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">Product not found.</p>
      </div>
    );
  }



  const handleAddToCart = async () => {
    if (!selectedVariant?.id) {
      toast.error("Please select a variant");
      return;
    }

    const payload = {
      variantId: selectedVariant.id,
      quantity,
    };

    try {
      const result = await addToCart(payload).unwrap();
      console.log("Cart result:", result);
      toast.success(`${product.name} added to cart!`);
    } catch (error: any) {
      // console.error("Cart error full:", error);    
    }
  };
  // const handleBuyNow = async () => {
  //   if (!selectedVariant?.id) {
  //     toast.error("Please select a variant");
  //     return;
  //   }
  //   if (stockQty === 0) {
  //     toast.error("This item is out of stock");
  //     return;
  //   }
  //   try {
  //     await addToCart({
  //       variantId: selectedVariant.id,
  //       quantity,
  //     }).unwrap();
  //     window.location.href = "/checkout";
  //   } catch (error: any) {
  //     toast.error(error?.data?.message ?? "Failed to proceed to checkout");
  //   }
  // };

  // Derived data from API response
  const productImages = product.images ?? [];
  const currentImage = productImages[selectedImage]?.imageUrl ?? "";
  const variants = product.variants ?? [];
  const selectedVariant = variants[selectedVariantIndex] ?? variants[0];
  const price = selectedVariant?.price ?? "N/A";
  const cost = selectedVariant?.cost ?? null;
  const sku = selectedVariant?.sku ?? "N/A";
  const stockQty = selectedVariant?.stockQuantity ?? 0;
  const stockAlert = selectedVariant?.stockAlertThreshold ?? 10;

  // Build unique sizes and colors from all variants
  const allSizes: string[] = [];
  const allColors: { value: string; hex: string | null }[] = [];

  variants.forEach((variant: any) => {
    variant.attributes?.forEach((attr: any) => {
      const attrName = attr.attributeValue?.attribute?.name?.toLowerCase();
      const value = attr.attributeValue?.value;
      const hex = attr.attributeValue?.hexCode ?? null;

      if (attrName === "size" && value && !allSizes.includes(value)) {
        allSizes.push(value);
      }
      if (attrName === "color" && value && !allColors.find((c) => c.value === value)) {
        allColors.push({ value, hex });
      }
    });
  });

  const selectedSize =
    selectedVariant?.attributes?.find(
      (a: any) => a.attributeValue?.attribute?.name?.toLowerCase() === "size"
    )?.attributeValue?.value ?? "";

  const selectedColor =
    selectedVariant?.attributes?.find(
      (a: any) => a.attributeValue?.attribute?.name?.toLowerCase() === "color"
    )?.attributeValue?.value ?? "";

  // Find variant by size selection
  const handleSizeSelect = (size: string) => {
    const idx = variants.findIndex((v: any) =>
      v.attributes?.some(
        (a: any) =>
          a.attributeValue?.attribute?.name?.toLowerCase() === "size" &&
          a.attributeValue?.value === size
      )
    );
    if (idx !== -1) setSelectedVariantIndex(idx);
  };

  // Find variant by color selection — updates SKU + price + stock
  const handleColorSelect = (colorValue: string) => {
    const idx = variants.findIndex((v: any) =>
      v.attributes?.some(
        (a: any) =>
          a.attributeValue?.attribute?.name?.toLowerCase() === "color" &&
          a.attributeValue?.value === colorValue
      )
    );
    if (idx !== -1) setSelectedVariantIndex(idx);
  };

  const specs = product.specifications ?? {};
  const faqs = product.faqs ?? [];

  // Stock status helper
  const getStockStatus = () => {
    if (stockQty === 0)
      return { label: "Out of Stock", color: "text-red-500 bg-red-50 border-red-200" };
    if (stockQty <= stockAlert)
      return { label: `Only ${stockQty} left`, color: "text-orange-500 bg-orange-50 border-orange-200" };
    return { label: "In Stock", color: "text-green-600 bg-green-50 border-green-200" };
  };
  const stockStatus = getStockStatus();

  // Discount calculation
  const discountPercent =
    cost && price !== "N/A" && parseFloat(cost) > parseFloat(price)
      ? Math.round(((parseFloat(cost) - parseFloat(price)) / parseFloat(cost)) * 100)
      : null;

  const formattedPrice = price !== "N/A" ? Number(price).toFixed(2) : "N/A";
  const formattedCost = cost ? Number(cost).toFixed(2) : null;

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <nav className="text-muted-foreground mb-6 flex items-center gap-2 text-xs">
        <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
        <span>/</span>
        {product.category?.name && (
          <>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              {product.category.name}
            </span>
            <span>/</span>
          </>
        )}
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

        {/* ─── LEFT: Images + Tabs below ─── */}
        <div>
          {/* Image area */}
          <div className="relative flex-row gap-6 md:flex">
            {/* Thumbnail Images */}
            <div className="flex flex-row gap-3 py-5 md:-mt-5 md:flex-col">
              {productImages.map((image: any, index: number) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-card-primary relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border-2 transition-all ${selectedImage === index
                    ? "border-black shadow-md"
                    : "border-border hover:border-gray-400"
                    }`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={`Product image ${index + 1}`}
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
              className="group bg-card-primary relative h-120 w-full cursor-crosshair overflow-hidden rounded-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
            >
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}

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
                <div className="flex scale-90 transform items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-gray-900 shadow-lg backdrop-blur-sm transition-all group-hover:scale-100 ">
                  <ZoomIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Hover to preview</span>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white shadow">
                    Featured
                  </span>
                )}
                {discountPercent && (
                  <span className="bg-danger text-danger-foreground rounded-full px-3 py-1 text-xs font-bold shadow">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              {/* View Count */}
              {product.viewCount > 0 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  <Eye className="h-3 w-3" />
                  <span>{product.viewCount} views</span>
                </div>
              )}
            </div>

            {/* Hover Zoom Preview Box */}
            {isHovering && currentImage && (
              <div
                ref={zoomBoxRef}
                className=" absolute top-70 left-[calc(80%+2rem)] z-30 hidden h-100 w-120 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-white bg-white shadow-2xl lg:block "
                style={{ marginLeft: "1rem" }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                    style={{
                      transform: `scale(2.5) translate(${50 - zoomPosition.x}%, ${50 - zoomPosition.y}%)`,
                      transition: "transform 0.05s ease-out",
                    }}
                  />
                  <div className="absolute top-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    2.5x Zoom
                  </div>
                  <div className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white opacity-50" />
                </div>
              </div>
            )}
          </div>

          {/* ─── Tabbed Product Info — UNDER the image ─── */}
          <div className="mt-8">
            <div className="border-border mb-4 flex border-b">
              {(["description", "specs", "shipping"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab
                    ? "border-b-2 border-black dark:border-white "
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {tab === "specs"
                    ? "Specifications"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="detailsPage-text-primary text-sm leading-relaxed">
                  {product.fullDescription || product.shortDescription}
                </p>
                {product.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="border-border bg-card-primary rounded-full border px-3 py-1 text-xs capitalize"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                {(product.weight || product.dimension) && (
                  <div className="border-border bg-card-primary grid grid-cols-2 gap-3 rounded-lg border p-3">
                    {product.weight && (
                      <div>
                        <p className="text-muted-foreground mb-0.5 text-xs">Weight</p>
                        <p className="text-sm font-medium">
                          {product.weight} {product.weightUnit}
                        </p>
                      </div>
                    )}
                    {product.dimension && (
                      <div>
                        <p className="text-muted-foreground mb-0.5 text-xs">Dimensions</p>
                        <p className="text-sm font-medium">
                          {product.dimension.length} × {product.dimension.width} ×{" "}
                          {product.dimension.height} {product.dimension.unit}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === "specs" && (
              <div className="overflow-hidden bg-card-primary rounded-lg border">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(specs).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? "bg-muted/40" : "bg-background"}>
                        <td className="border-border w-2/5 border-r px-4 py-3 font-medium capitalize  ">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </td>
                        <td className="px-4 py-3 font-medium">{value as string}</td>
                      </tr>
                    ))}
                    {selectedVariant?.attributes?.map((attr: any, idx: number) => {
                      const name = attr.attributeValue?.attribute?.name;
                      const val = attr.attributeValue?.value;
                      const alreadyInSpecs = Object.keys(specs).some(
                        (k) => k.toLowerCase() === name?.toLowerCase()
                      );
                      if (alreadyInSpecs) return null;
                      return (
                        <tr
                          key={attr.id}
                          className={
                            (Object.keys(specs).length + idx) % 2 === 0
                              ? "bg-muted/40"
                              : "bg-background"
                          }
                        >
                          <td className="border-border w-2/5 border-r px-4 py-3 font-medium capitalize  ">
                            {name}
                          </td>
                          <td className="px-4 py-3 font-medium">{val}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === "shipping" && (
              <div className="space-y-3 text-sm">
                <div className="border-border bg-card-primary flex items-start gap-3 rounded-lg border p-3">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 " />
                  <div>
                    <p className="font-medium">Standard Delivery</p>
                    <p className="text-muted-foreground text-xs">
                      3-5 business days · Free above TK. 8000
                    </p>
                  </div>
                </div>
                <div className="border-border bg-card-primary flex items-start gap-3 rounded-lg border p-3">
                  <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 " />
                  <div>
                    <p className="font-medium">Return Policy</p>
                    <p className="text-muted-foreground text-xs">
                      15-day hassle-free returns on unused items
                    </p>
                  </div>
                </div>
                {product.warranty && (
                  <div className="border-border bg-card-primary flex items-start gap-3 rounded-lg border p-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 " />
                    <div>
                      <p className="font-medium">Warranty</p>
                      <p className="text-muted-foreground text-xs">{product.warranty}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─── RIGHT: Product Details ─── */}
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="mb-2 flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Brand + Category chips */}
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {product.brand?.name && (
                    <span className="detailsPage-text-primary rounded border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider">
                      {product.brand.name}
                    </span>
                  )}
                  {product.category?.name && (
                    <span className="text-muted-foreground text-xs">{product.category.name}</span>
                  )}
                </div>
                <h1 className="mb-2 text-xl font-bold leading-tight lg:text-3xl">{product.name}</h1>
                <p className="text-muted-foreground text-sm">{product.shortDescription}</p>
              </div>
              {/* Wishlist + Share */}
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border-border flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:scale-110 ${isWishlisted ? "border-danger/20 bg-danger/50" : "hover:bg-muted"
                    }`}
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-danger text-danger" : ""
                      }`}
                  />
                </button>
                <button className="border-border hover:bg-muted flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:scale-110">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* SKU + Rating row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-muted-foreground flex items-center gap-3 text-sm">
                <span>
                  SKU: <span className="font-mono font-medium">{sku}</span>
                </span>
                {product.totalSales > 0 && (
                  <>
                    <span>•</span>
                    <span>{product.totalSales} sold</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${product.avgRating && i < Math.floor(product.avgRating)
                        ? "fill-rating text-rating"
                        : "fill-muted text-muted-foreground"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  {product.avgRating ? product.avgRating.toFixed(1) : "No rating"}{" "}
                  <span className="text-xs">({product.reviewCount ?? 0} reviews)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="border-border mb-6 rounded-xl p-4 bg-card-primary border">
            <div className="mb-2 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-bold lg:text-4xl">TK. {formattedPrice}</span>
              {cost && parseFloat(cost) > parseFloat(price) && (
                <span className="text-muted-foreground text-lg line-through">
                  TK. {parseFloat(formattedCost).toFixed(2)}
                </span>
              )}
              {discountPercent && (
                <span className="rounded bg-button-ternary px-2 py-0.5 text-sm font-bold text-green-700">
                  Save {discountPercent}%
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-semibold ${stockStatus.color}`}
              >
                <Package className="h-3 w-3" />
                {stockStatus.label}
              </span>
              {product.warranty && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  {product.warranty}
                </span>
              )}
            </div>
          </div>

          {/* Size Selection */}
          {allSizes.length > 0 && (
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">
                  Size:{" "}
                  <span className="text-muted-foreground font-normal">{selectedSize}</span>
                </h3>
                <button className="flex items-center gap-1 text-xs underline underline-offset-2">
                  Size Chart
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`flex h-10 w-14 cursor-pointer items-center justify-center rounded-lg border-2 font-medium transition-all lg:h-14 ${selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-border  hover:border-border/80 bg-white text-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection — clicking updates variant (SKU / price / stock) */}
          {allColors.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 font-semibold">
                Color:{" "}
                <span className="text-muted-foreground font-normal">{selectedColor}</span>
              </h3>
              <div className="flex flex-row flex-wrap gap-3">
                {allColors.map((color) => (
                  <button
                    key={color.value}
                    title={color.value}
                    onClick={() => handleColorSelect(color.value)}
                    className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 transition-all hover:scale-110 ${selectedColor === color.value
                      ? "scale-110 border-black  shadow-md"
                      : "border-border "
                      }`}
                    style={
                      color.hex ? { backgroundColor: color.hex } : { backgroundColor: "#e5e7eb" }
                    }
                  >
                    {selectedColor === color.value && (
                      <span
                        className={`absolute inset-0 flex items-center justify-center rounded-full text-xs font-bold ${color.hex === "#ffffff" || color.hex === "#fff"
                          ? "text-black"
                          : "text-white"
                          }`}
                      >
                        ✓
                      </span>
                    )}
                    {!color.hex && (
                      <span className="text-xs font-medium">{color.value.charAt(0)}</span>
                    )}
                  </button>
                ))}
              </div>
              {/* Live SKU update indicator */}
              <p className="text-muted-foreground mt-2 text-xs">
                SKU: <span className="font-mono font-semibold">{sku}</span>
              </p>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="mb-6">
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <div className="border-border flex w-full items-center justify-center rounded-lg border md:w-auto">
                <button
                  onClick={() =>
                    setQuantity(Math.max(product.minOrderQty ?? 1, quantity - 1))
                  }
                  className="hover:bg-muted bg-card-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-l-lg"
                >
                  <span className="text-xl">-</span>
                </button>
                <span className="flex h-12 w-12 items-center justify-center border-x font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.maxOrderQty ?? 99, quantity + 1))
                  }
                  className="hover:bg-muted bg-card-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-r-lg"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || stockQty === 0}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 md:flex-1"
              >
                {isAddingToCart ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                )}
                {isAddingToCart ? "Adding..." : stockQty === 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              <button
                // onClick={handleBuyNow}
                disabled={isAddingToCart || stockQty === 0}
                className="hover:bg-muted h-12 w-full cursor-pointer rounded-lg border-2 border-black px-6 font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
              >
                Buy Now
              </button>
            </div>
            <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
              {product.minOrderQty && <span>Min order: {product.minOrderQty}</span>}
              {product.maxOrderQty && <span>Max order: {product.maxOrderQty}</span>}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-border  bg-card-primary mb-6 grid grid-cols-3 gap-3 rounded-xl border p-4">
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck className="text-button-ternary h-5 w-5" />
              <span className="text-xs font-medium">Free Delivery</span>
              <span className="text-muted-foreground text-xs">Above TK. 8000</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <RotateCcw className="h-5 w-5 text-button-ternary" />
              <span className="text-xs font-medium">Easy Returns</span>
              <span className="text-muted-foreground text-xs">15 day policy</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span className="text-xs font-medium">Secure Pay</span>
              <span className="text-muted-foreground text-xs">100% protected</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-button-ternary/5 mb-6 rounded-lg p-4">
            <div className="mb-2 flex items-center gap-3">
              <Truck className="text-button-ternary h-5 w-5" />
              <span className="text-button-ternary font-medium">
                FREE DELIVERY on orders above TK. 8000
              </span>
            </div>
            <div className="text-button-ternary text-sm">
              <p className="mb-1">✓ Free shipping across Bangladesh</p>
              <p>✓ Estimated delivery: 3-5 business days</p>
            </div>
          </div>

          {/* Store Availability */}
          <div className="mb-8">
            <button className="border-border bg-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-3 transition-colors hover:bg-muted ">
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

          {/* ─── FAQs Accordion ─── */}
          {faqs.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 font-semibold">Frequently Asked Questions</h3>
              <div className="divide-border divide-y overflow-hidden rounded-xl border">
                {faqs.map((faq: any, index: number) => (
                  <div key={faq.id}>
                    <button
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === index ? null : index)
                      }
                      className="hover:bg-muted/50 bg-card-primary flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left transition-colors"
                    >
                      <span className="text-sm font-medium">{faq.question}</span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="h-4 w-4 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === index && (
                      <div className="bg-muted/30 border-border border-t px-4 py-3">
                        <p className="detailsPage-text-primary text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="detailsPage-text-primary text-center text-xs">
            <p>Product color may slightly vary, depending on your screen resolution</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ProductSugation />
        <ProductReviews />
      </div>
    </div>
  );
}