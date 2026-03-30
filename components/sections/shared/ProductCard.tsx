"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Loader2, ShoppingCart } from "lucide-react";
import { useAddToCartMutation } from "@/redux/features/order/cart.api";
import {
  useAddToWishlistMutation,
  useGetAllWishlistsQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/features/product/wishlist.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  status: string;
  featured: boolean;
  avgRating: number | null;
  reviewCount: number;
  totalSales: number;
  tags: string[];
  minOrderQty?: number;
  maxOrderQty?: number;
  _count: { images: number; variants: number };
  variants?: {
    id: string;
    price: number;
    comparePrice?: number;
    color?: string;
    size?: string;
    stockQuantity?: number;
    images?: { url: string }[];
  }[];
  images?: { imageUrl: string; isFeatured: boolean }[];
};

type Props = {
  product: ApiProduct;
  viewMode: "grid" | "list";
  getBadgeColor: (badge?: string) => string;
};

export default function ProductCard({ product, viewMode, getBadgeColor }: Props) {
  const router = useRouter();
  console.log("product", product);

  // ─── Mutations ───
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const { data: wishlistData } = useGetAllWishlistsQuery(undefined);
  const [addToWishlist, { isLoading: isWishlisting }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isUnwishlisting }] = useRemoveFromWishlistMutation();

  // ─── Wishlist state ───
  const wishlistItem = wishlistData?.data?.find(
    (item: any) => item.productId === product.id || item.product?.id === product.id
  );
  const isWishlisted = !!wishlistItem;

  // ─── Derived data ───
  const primaryImage =
    product.images?.find((img) => img.isFeatured)?.imageUrl ||
    product.images?.[0]?.imageUrl ||
    "/placeholder-product.png";

  const firstVariant = product?.variants?.length ? product.variants[0] : null;
  const variantId = firstVariant?.id ?? null;
  const basePrice = firstVariant?.price;
  const comparePrice = firstVariant?.comparePrice;

  const discount =
    basePrice && comparePrice && comparePrice > basePrice
      ? Math.round(((comparePrice - basePrice) / comparePrice) * 100)
      : null;

  const badge = product.featured
    ? "FEATURED"
    : product.tags?.includes("new")
      ? "NEW"
      : product.tags?.includes("trending")
        ? "TRENDING"
        : null;

  const rating = product.avgRating ?? 0;

  const handleAddToCart = async () => {
    if (!variantId) {
      router.push(`/product/${product.id}`);
      toast.info("Please select a variant first");
      return;
    }

    try {
      await addToCart({ variantId, quantity: 1 }).unwrap();
      toast.success("Added to cart successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    }
  };
  // const handleBuyNow = async () => {
  //   if (!variantId) {
  //     router.push(`/products/${product.id}`);
  //     return;
  //   }
  //   try {
  //     await addToCart({ variantId, quantity: 1 }).unwrap();
  //     router.push("/checkout");
  //   } catch (error: any) {
  //     toast.error(error?.data?.message ?? "Failed to proceed");
  //   }
  // };

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted && wishlistItem?.id) {
        await removeFromWishlist(wishlistItem.id).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ productId: product.id }).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Wishlist action failed");
    }
  };

  return (
    <div
      className={`group bg-card-primary relative transform overflow-hidden rounded-sm shadow-sm transition-all duration-500 hover:shadow-lg ${
        viewMode === "list" ? "flex flex-col md:flex-row" : ""
      }`}
    >
      {/* Badge */}
      <div
        className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-black ${getBadgeColor(badge)}`}
      >
        {product.tags?.[0] ?? "—"}
      </div>

      {/*  Wishlist button — top right */}
      <button
        onClick={handleWishlistToggle}
        disabled={isWishlisting || isUnwishlisting}
        className={`absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border shadow-sm transition-all hover:scale-110 disabled:opacity-60 ${
          isWishlisted
            ? "border-danger/20 bg-danger/50"
            : "border-border bg-white/80 backdrop-blur-sm"
        }`}
      >
        {isWishlisting || isUnwishlisting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-danger text-danger" : "text-gray-600"
            }`}
          />
        )}
      </button>

      {/* Image */}
      <Link
        href={`/product/${product.id}`}
        className={`relative block ${viewMode === "list" ? "md:w-64" : "h-64"} img-primary-bg overflow-hidden`}
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Info */}
      <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
        {/* Rating row */}
        <div className="mb-2 flex items-center justify-between">
          <span></span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className={`text-rating ${i < Math.floor(rating) ? "fill-current" : "fill-none"}`}
              />
            ))}
            <span className="ml-1 text-xs">({product.reviewCount})</span>
          </div>
        </div>

        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="tranding-secondry-text mb-1 line-clamp-2 font-semibold hover:underline">
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        <p className="text-muted-foreground mb-3 line-clamp-2 h-5 text-xs">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="mb-4 flex items-center gap-2">
          {basePrice !== undefined ? (
            <>
              <span className="tranding-secondry-text text-xl font-bold">
                TK. {basePrice.toFixed(2)}
              </span>
              {comparePrice && comparePrice > basePrice && (
                <span className="text-muted-foreground text-sm line-through">
                  TK. {comparePrice.toFixed(2)}
                </span>
              )}
              {discount && (
                <span className="bg-success/10 text-success rounded px-2 py-0.5 text-xs font-semibold">
                  -{discount}%
                </span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground text-sm">
              {product._count.variants} variant{product._count.variants !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* ✅ Add to Cart + Buy Now */}
        <div className="flex w-full gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-black text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAddingToCart ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>

          <button
            // onClick={handleBuyNow}
            disabled={isAddingToCart}
            className="hover:bg-muted h-10 cursor-pointer rounded-lg border-2 border-black px-4 text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
