"use client";

import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Truck,
  Tag,
  Check,
  ShoppingBag,
  Gift,
} from "lucide-react";
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
  comboOffer?: boolean;
}

interface Voucher {
  id: string;
  name: string;
  description: string;
  discount: number;
  type: "freeShipping" | "discount" | "coins";
  minPurchase: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(CartData);

  const [selectAll, setSelectAll] = useState(true);
  const [expandedStores, setExpandedStores] = useState<string[]>([
    "SneakerHub Store",
    "Adidas Official Store",
  ]);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);

  const vouchers: Voucher[] = [
    {
      id: "v1",
      name: "Free Shipping",
      description: "Gratis ongkir min. belanja Tk 500.000",
      discount: 45000,
      type: "freeShipping",
      minPurchase: 500000,
    },
    {
      id: "v2",
      name: "Sneaker Discount",
      description: "Diskon 15% untuk semua sneakers",
      discount: 127000,
      type: "discount",
      minPurchase: 1000000,
    },
  ];

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(
      cartItems.map((item) => ({ ...item, selected: newSelectAll })),
    );
  };

  const toggleItemSelect = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const updateQuantity = (id: string, increment: boolean) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = increment
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const toggleVoucher = (voucherId: string) => {
    if (selectedVouchers.includes(voucherId)) {
      setSelectedVouchers(selectedVouchers.filter((id) => id !== voucherId));
    } else {
      setSelectedVouchers([...selectedVouchers, voucherId]);
    }
  };

  const calculateTotals = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    const totalPrice = selectedItems.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0,
    );
    const totalDiscount = selectedItems.reduce(
      (sum, item) =>
        sum + (item.originalPrice - item.finalPrice) * item.quantity,
      0,
    );

    const voucherDiscount = selectedVouchers.reduce((sum, voucherId) => {
      const voucher = vouchers.find((v) => v.id === voucherId);
      return voucher && totalPrice >= voucher.minPurchase
        ? sum + voucher.discount
        : sum;
    }, 0);

    return {
      totalPrice,
      totalDiscount,
      voucherDiscount,
      grandTotal: Math.max(0, totalPrice - voucherDiscount),
    };
  };

  const totals = calculateTotals();
  const groupedItems = cartItems.reduce(
    (groups, item) => {
      if (!groups[item.store]) {
        groups[item.store] = [];
      }
      groups[item.store].push(item);
      return groups;
    },
    {} as Record<string, CartItem[]>,
  );

  return (
    <div className="min-h-screen cart-bg py-8 px-4">
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="lg:w-2/3">
            <div className="bg-card-primary rounded-xl shadow-sm p-4 mb-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center 
                    ${
                      selectAll
                        ? "bg-button-secondary"
                        : "cart-border-sec"
                    }`}
                  >
                    {selectAll && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="ml-3 cart-text-primary font-medium">
                  All available cart items
                </span>
              </label>
            </div>

            {/* Cart Items by Store */}
            {Object.entries(groupedItems).map(([store, items]) => (
              <div
                key={store}
                className="bg-card-primary rounded-xl shadow-sm mb-4 px-2 overflow-hidden"
              >
                <Accordion type="single" collapsible defaultValue={store}>
                  <AccordionItem value={store}>
                    <AccordionTrigger>
                      <div className=" p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={items.every((item) => item.selected)}
                              onChange={() => {
                                const allSelected = items.every(
                                  (item) => item.selected,
                                );
                                setCartItems(
                                  cartItems.map((item) =>
                                    items.some((i) => i.id === item.id)
                                      ? { ...item, selected: !allSelected }
                                      : item,
                                  ),
                                );
                              }}
                              className="w-4 h-4 cart-focus "
                            />
                            <div className="ml-3">
                              <h3 className="font-semibold cart-text-primary">
                                {store}
                              </h3>
                              <p className="text-sm cart-text-base">
                                {items.length} product
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="divide-y border-t cart-border-primary border-border">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 cart-bg-hover-primary"
                          >
                            <div className="flex gap-4">
                              <div className="flex items-start pt-1">
                                <input
                                  type="checkbox"
                                  checked={item.selected}
                                  onChange={() => toggleItemSelect(item.id)}
                                  className="w-4 h-4 cart-focus "
                                />
                              </div>

                              <div className="w-24 h-24 rounded-lg overflow-hidden cart-img-bg-primary">
                                <div className="w-full h-full flex items-center justify-center">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={96}
                                    height={96}
                                  />
                                </div>
                              </div>

                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-medium cart-text-primary">
                                      {item.name}
                                    </h4>
                                    {item.description && (
                                      <p className="text-sm cart-text-base mt-1">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 cart-bg-hover-primary rounded-lg"
                                  >
                                    < Trash2 className="w-5 h-5 text-muted-foreground hover:text-danger" />
                                  </button>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                  <div className="space-y-1">
                                    {item.discountPercentage && (
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-danger-foreground text-danger text-sm font-medium rounded">
                                          {item.discountPercentage}%
                                        </span>
                                        <span className="text-sm cart-text-base line-through">
                                          Tk{" "}
                                          {item.originalPrice.toLocaleString(
                                            "en-BD",
                                          )}
                                        </span>
                                      </div>
                                    )}
                                    <div className="text-xl font-bold cart-text-primary">
                                      Tk{" "}
                                      {item.finalPrice.toLocaleString("en-BD")}
                                    </div>
                                  </div>

                                  <div className="flex items-center border cart-border-sec rounded-lg">
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, false)
                                      }
                                      className="px-3 py-1 cart-bg-hover-primary"
                                    >
                                      -
                                    </button>
                                    <span className="px-4 py-1 cart-text-primary">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, true)
                                      }
                                      className="px-3 py-1 cart-bg-hover-primary"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>

          {/* Right Column - Summary & Checkout */}
          <div className="lg:w-1/3">
            <div className="bg-primary rounded-xl p-4 mb-4">
              <div className="flex items-center text-white">
                <Truck className="w-6 h-6 mr-3" />
                <div>
                  <p className="font-semibold">Order Details</p>
                </div>
              </div>
            </div>

            <div className="bg-card-primary rounded-xl shadow-sm p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold cart-text-primary">
                  Vouchers & Promotions
                </h3>
                <Tag className="w-5 h-5 text-button-secondary" />
              </div>

              <p className="text-sm cart-dark-text mb-4">
                You can get a free shipping voucher with a minimum purchase of
                Tk 500.000
              </p>

              <div className="space-y-3">
                <p className="text-sm font-medium cart-text-primary">
                  There are {vouchers.length} Vouchers for you
                </p>

                {vouchers.map((voucher) => {
                  const isSelected = selectedVouchers.includes(voucher.id);
                  const canApply = totals.totalPrice >= voucher.minPurchase;

                  return (
                    <div
                      key={voucher.id}
                      onClick={() => canApply && toggleVoucher(voucher.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all
                    
                        ${!canApply ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium ${isSelected ? "cart-light-text" : "cart-text-primary"}`}
                            >
                              {voucher.name}
                            </span>
                          </div>
                          <p className="text-sm cart-dark-text mt-1">
                            {voucher.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold cart-light-text">
                            Tk {voucher.discount.toLocaleString("en-BD")}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card-primary rounded-xl shadow-sm p-5">
              <h3 className="font-semibold cart-text-primary mb-4">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="cart-dark-text">
                    Total Price ({cartItems.length} products)
                  </span>
                  <span className="font-medium cart-text-primary">
                    Tk {totals.totalPrice.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="cart-dark-text">Total Discount</span>
                  <span className="font-medium">
                    - Tk {totals.totalDiscount.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="cart-dark-text">Discount Voucher</span>
                  <span className="font-medium">
                    - Tk {totals.voucherDiscount.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="border-t cart-border-primary pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold cart-text-primary">
                      Total
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold cart-light-text">
                        Tk {totals.grandTotal.toLocaleString("en-BD")}
                      </div>
                      <p className="text-sm cart-text-base mt-1">
                        Total amount to be paid
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/checkOut">
                  <button
                    className="w-full bg-button-primary
                                 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6"
                  >
                    Checkout ({cartItems.filter((item) => item.selected).length}
                    )
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
