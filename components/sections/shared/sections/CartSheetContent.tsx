"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useGetMyCartQuery,
  useUpdateCartQuantityMutation,
  useDeleteCartItemMutation,
} from "@/redux/features/order/cart.api";
import { CartSkeleton } from "./CartSkeleton";
import { EmptyCart } from "./EmptyCart";

export default function CartContent({
  isSheet = false,
  onClose,
}: {
  isSheet?: boolean;
  onClose?: () => void;
}) {
  const { data, isLoading } = useGetMyCartQuery([]);
  const [updateCartQuantity] = useUpdateCartQuantityMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const cart = data?.data as unknown as CartApi;
  const cartItems: CartItemApi[] = cart?.items ?? [];

  const [selection, setSelection] = useState<LocalSelection>({});
  const [localQuantity, setLocalQuantity] = useState<LocalQuantity>({});

  // Tracks which items have an in-flight API request
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const getQty = (item: CartItemApi): number => localQuantity[item.id] ?? item.quantity;

  // ---------- Selection ----------
  const isSelected = (id: string) => selection[id] !== false;

  const allSelected = cartItems.length > 0 && cartItems.every((i) => isSelected(i.id));

  const toggleSelectAll = () => {
    const next: LocalSelection = {};
    cartItems.forEach((i) => (next[i.id] = !allSelected));
    setSelection(next);
  };

  const toggleItemSelect = (id: string) => {
    setSelection((prev) => ({ ...prev, [id]: !isSelected(id) }));
  };

  // ---------- Quantity update (optimistic) ----------
  const updateQuantity = async (item: CartItemApi, inc: boolean) => {
    const current = getQty(item);
    const newQty = inc ? current + 1 : Math.max(1, current - 1);
    if (newQty === current) return;

    // 1. Update UI immediately
    setLocalQuantity((prev) => ({ ...prev, [item.id]: newQty }));
    // 2. Disable buttons while request is in-flight
    setUpdatingItems((prev) => new Set(prev).add(item.id));

    try {
      await updateCartQuantity({ id: item.id, data: { quantity: newQty } }).unwrap();
    } catch {
      // 3. Revert on API failure
      setLocalQuantity((prev) => ({ ...prev, [item.id]: current }));
    } finally {
      // 4. Re-enable buttons
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  };

  // ---------- Delete ----------
  const removeItem = async (cartItemId: string) => {
    await deleteCartItem(cartItemId);
    setSelection((prev) => {
      const next = { ...prev };
      delete next[cartItemId];
      return next;
    });
    setLocalQuantity((prev) => {
      const next = { ...prev };
      delete next[cartItemId];
      return next;
    });
  };

  // ---------- Totals (uses optimistic quantity) ----------
  const totals = (() => {
    const selected = cartItems.filter((i) => isSelected(i.id));
    const total = selected.reduce(
      (s, i) => s + (i.variant.discountPrice ?? i.variant.price) * getQty(i),
      0
    );
    return { total, grand: Math.max(0, total) };
  })();

  // ---------- Group by store ----------
  const grouped = cartItems.reduce(
    (g, i) => {
      const storeName = i.variant?.product?.store?.name ?? "Store";
      g[storeName] = g[storeName] || [];
      g[storeName].push(i);
      return g;
    },
    {} as Record<string, CartItemApi[]>
  );

  const selectedCount = cartItems.filter((i) => isSelected(i.id)).length;

  if (isLoading) return <CartSkeleton />;
  if (!cartItems.length) return <EmptyCart onClose={onClose} />;

  return (
    <div className={isSheet ? "space-y-4" : "cart-bg py-8"}>
      {/* Select All */}
      <div className="bg-card-primary rounded-xl px-4 py-2">
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} />
          <span className="font-medium">All cart items</span>
        </label>
      </div>

      {/* Items grouped by store */}
      {Object.entries(grouped).map(([store, items]) => (
        <div key={store} className="bg-card-primary rounded-xl">
          <Accordion type="single" collapsible defaultValue={store}>
            <AccordionItem value={store}>
              <AccordionTrigger className="px-4">
                {store} ({items.length})
              </AccordionTrigger>

              <AccordionContent>
                {items.map((item) => {
                  const product = item.variant?.product;
                  const imageUrl = product?.images?.[0]?.imageUrl ?? "/placeholder.png";
                  const finalPrice = Number(item.variant.discountPrice ?? item.variant.price);
                  const qty = getQty(item);
                  const isUpdating = updatingItems.has(item.id);

                  return (
                    <div key={item.id} className="flex gap-4 border-t p-4">
                      <Checkbox
                        checked={isSelected(item.id)}
                        onCheckedChange={() => toggleItemSelect(item.id)}
                      />

                      <Image
                        src={imageUrl}
                        alt={product?.name ?? "Product"}
                        width={72}
                        height={72}
                        className="rounded object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium lg:text-base">
                            {product?.name ?? "Unknown Product"}
                          </h4>
                          <button
                            className="hover:text-danger cursor-pointer"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-2 flex justify-between">
                          <span className="text-sm">Tk {finalPrice}</span>

                          <div className="bg-muted flex items-center gap-4 rounded-2xl px-2">
                            {/* Decrement */}
                            <button
                              className="cursor-pointer text-lg disabled:cursor-not-allowed disabled:opacity-40"
                              onClick={() => updateQuantity(item, false)}
                              disabled={isUpdating || qty <= 1}
                            >
                              -
                            </button>

                            {/* Quantity display */}
                            <span
                              className={`w-4 text-center transition-opacity ${isUpdating ? "opacity-40" : "opacity-100"}`}
                            >
                              {qty}
                            </span>

                            {/* Increment */}
                            <button
                              className="cursor-pointer text-lg disabled:cursor-not-allowed disabled:opacity-40"
                              onClick={() => updateQuantity(item, true)}
                              disabled={isUpdating || qty >= item.variant.stockQuantity}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

      {/* Summary */}
      <div className="bg-card-primary rounded-xl p-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>Tk {totals.grand.toFixed(2)}</span>
        </div>

        <Link href="/checkout" onClick={onClose}>
          <button className="bg-button-primary mt-4 w-full cursor-pointer rounded-lg py-3 text-white">
            Checkout ({selectedCount})
          </button>
        </Link>
      </div>
    </div>
  );
}
