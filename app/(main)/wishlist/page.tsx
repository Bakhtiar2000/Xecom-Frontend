"use client";

import {
  useGetAllWishlistsQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/features/product/wishlist.api";
import Image from "next/image";
import Link from "next/link";
import { Heart, PackageOpen, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Wishlist = () => {
  const { data, isLoading } = useGetAllWishlistsQuery([]);
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  console.log("data", data);
  const wishlists = data?.data ?? [];

  const handleRemove = async (id: string) => {
    try {
      await removeFromWishlist(id).unwrap();
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to remove from wishlist");
    }
  };

  if (isLoading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent" />
          <p className="text-muted-foreground text-sm">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlists.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <PackageOpen className="text-muted-foreground h-16 w-16" />
        <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
        <p className="text-muted-foreground text-sm">
          Save items you love and come back to them anytime.
        </p>
        <Link
          href="/"
          className="bg-button-primary mt-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 fill-red-500 text-red-500" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <span className="bg-muted text-muted-foreground rounded-full px-3 py-0.5 text-sm font-medium">
            {wishlists.length} {wishlists.length === 1 ? "item" : "items"}
          </span>
        </div>
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-2 transition"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {wishlists.map((item: any) => {
          const product = item.product;
          const primaryImage = product?.images?.[0]?.imageUrl ?? "";
          const rating = product?.avgRating ?? 0;

          return (
            <div
              key={item.id}
              className="group bg-card-primary relative transform overflow-hidden rounded-sm shadow-sm transition-all duration-500 hover:shadow-lg"
            >
              {/* Remove Wishlist Button */}
              <button
                onClick={() => handleRemove(item.id)}
                disabled={isRemoving}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow backdrop-blur-sm transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="img-primary-bg relative h-64 overflow-hidden">
                {primaryImage ? (
                  <Image
                    src={primaryImage}
                    alt={product?.name ?? "Product"}
                    fill
                    className="object-contain transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-gray-300">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Tag + Rating */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase">
                    {product?.tags?.[0] ?? "—"}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={`text-rating ${i < Math.floor(rating) ? "fill-current" : "fill-none"}`}
                      />
                    ))}
                    <span className="ml-1 text-xs">({product?.reviewCount ?? 0})</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="tranding-secondry-text mb-1 line-clamp-2 font-semibold">
                  {product?.name}
                </h3>

                {/* Short description */}
                <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
                  {product?.shortDescription}
                </p>

                {/* CTA */}
                <Link
                  href={`/product/${product?.id}`}
                  className="bg-button-primary flex w-full justify-center rounded-lg px-4 py-3 font-semibold text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
