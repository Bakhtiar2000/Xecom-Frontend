"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartData } from "@/data/cart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CartItem {
  id: string;
  store: string;
  name: string;
  description?: string;
  originalPrice: number;
  discountPercentage?: number;
  finalPrice: number;
  image: string;
  selected: boolean;
  quantity: number;
}

interface Voucher {
  id: string;
  name: string;
  description: string;
  discount: number;
  minPurchase: number;
}

export default function CartContent({
  isSheet = false,
  onClose,
}: {
  isSheet?: boolean;
  onClose?: () => void;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>(CartData);
  const [selectAll, setSelectAll] = useState(true);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);

  const vouchers: Voucher[] = [
    {
      id: "v1",
      name: "Free Shipping",
      description: "Gratis ongkir min. belanja Tk 500.000",
      discount: 45000,
      minPurchase: 500000,
    },
    {
      id: "v2",
      name: "Sneaker Discount",
      description: "Diskon 15% untuk semua sneakers",
      discount: 127000,
      minPurchase: 1000000,
    },
  ];

  const toggleSelectAll = () => {
    const next = !selectAll;
    setSelectAll(next);
    setCartItems(cartItems.map((i) => ({ ...i, selected: next })));
  };

  const toggleItemSelect = (id: string) => {
    setCartItems(
      cartItems.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)),
    );
  };

  const updateQuantity = (id: string, inc: boolean) => {
    setCartItems(
      cartItems.map((i) =>
        i.id === id
          ? {
              ...i,
              quantity: Math.max(1, inc ? i.quantity + 1 : i.quantity - 1),
            }
          : i,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((i) => i.id !== id));
  };

  const totals = (() => {
    const selected = cartItems.filter((i) => i.selected);
    const total = selected.reduce((s, i) => s + i.finalPrice * i.quantity, 0);
    const voucher = selectedVouchers.reduce((s, id) => {
      const v = vouchers.find((v) => v.id === id);
      return v && total >= v.minPurchase ? s + v.discount : s;
    }, 0);
    return { total, voucher, grand: Math.max(0, total - voucher) };
  })();

  const grouped = cartItems.reduce(
    (g, i) => {
      g[i.store] = g[i.store] || [];
      g[i.store].push(i);
      return g;
    },
    {} as Record<string, CartItem[]>,
  );

  const handleCheckout = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={isSheet ? "space-y-4" : "cart-bg py-8"}>
      {/* Select All */}
      <div className="bg-card-primary rounded-xl p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAll}
          />
          <span className="font-medium text-lg lg:text-xl">All cart items</span>
        </label>
      </div>

      {/* Items */}
      {Object.entries(grouped).map(([store, items]) => (
        <div key={store} className="bg-card-primary rounded-xl">
          <Accordion type="single" collapsible defaultValue={store}>
            <AccordionItem value={store}>
              <AccordionTrigger className="px-4 text-lg lg:text-xl">
                {store} ({items.length})
              </AccordionTrigger>

              <AccordionContent>
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border-t">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleItemSelect(item.id)}
                    />

                    <Image
                      src={item.image}
                      alt={item.name}
                      width={72}
                      height={72}
                    />

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm lg:text-lg">
                          {item.name}
                        </h4>
                        <button
                          className="hover:text-danger cursor-pointer"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between mt-2">
                        <span className="text-sm lg:text-lg">
                          Tk {item.finalPrice}
                        </span>
                        <div className="flex gap-4 items-center bg-muted px-2 rounded-2xl">
                          <button
                            className="cursor-pointer text-lg"
                            onClick={() => updateQuantity(item.id, false)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="cursor-pointer text-lg"
                            onClick={() => updateQuantity(item.id, true)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

      {/* Summary */}
      <div className="bg-card-primary rounded-xl p-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>Tk {totals.grand}</span>
        </div>

        <Link href="/checkOut" onClick={handleCheckout}>
          <button className="w-full mt-4 bg-primary cursor-pointer text-white py-3 rounded-lg">
            Checkout ({cartItems.filter((i) => i.selected).length})
          </button>
        </Link>
      </div>
    </div>
  );
}
