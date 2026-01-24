"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Truck,
  Shield,
  CreditCard,
  Wallet,
  ArrowRight,
  Check,
  User,
  MapPin,
  Phone,
  Mail,
  Tag,
  Trash2,
  Lock,
} from "lucide-react";
import Image from "next/image";

import { useRef } from "react";
import { PaymentMethod, UserInfo } from "@/types";
import { CartData } from "@/data/cart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Voucher {
  id: string;
  name: string;
  description: string;
  discount: number;
  type: "freeShipping" | "discount" | "coins";
  minPurchase: number;
}

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
  sheppingFee?: number;
}

const CheckoutPage = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const [activeStep, setActiveStep] = useState<"items" | "info" | "payment">(
    "items",
  );
  const [selectedMethod, setSelectedMethod] = useState<string>("cod");

  // Add state to track form validity
  const [formValid, setFormValid] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(CartData);
  const [selectAll, setSelectAll] = useState(true);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>("");
  const [promoError, setPromoError] = useState<string>("");

  const validPromoCodes = ["SAVE10", "DISCOUNT10", "PROMO10"];

  const applyPromoCode = (): void => {
    const trimmedCode = promoCode.trim().toUpperCase();

    if (!trimmedCode) {
      setPromoError("Please enter a promo code");
      return;
    }

    if (validPromoCodes.includes(trimmedCode)) {
      setAppliedPromoCode(trimmedCode);
      setPromoError("");
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromoCode("");
    }
  };

  const removePromoCode = (): void => {
    setAppliedPromoCode("");
    setPromoError("");
  };

  const vouchers: Voucher[] = [
    {
      id: "v1",
      name: "Free Shipping",
      description: "Minimum spend  Tk 500",
      discount: 145,
      type: "freeShipping",
      minPurchase: 500,
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

  const calculateTotals = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    const totalPrice = selectedItems.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0,
    );

    // Calculate shipping fee based on total price AND number of items
    let shippingFee = 0;
    const totalShippingFee = selectedItems.reduce(
      (sum, item) => sum + (item.sheppingFee || 0),
      0,
    );

    if (totalPrice < 1000) {
      // Less than 1000: charge full shipping for all items
      shippingFee = totalShippingFee;
    } else {
      // 1000 or more: First product shipping FREE, rest pay full
      if (selectedItems.length === 1) {
        // Single product: completely free
        shippingFee = 0;
      } else {
        // Multiple products: subtract one product shipping (145 tk)
        shippingFee = totalShippingFee - 145;
      }
    }

    const voucherDiscount = selectedVouchers.reduce((sum, voucherId) => {
      const voucher = vouchers.find((v) => v.id === voucherId);
      return voucher && totalPrice >= voucher.minPurchase
        ? sum + voucher.discount
        : sum;
    }, 0);

    // If free shipping voucher is applied, shipping fee becomes 0
    const finalShippingFee = selectedVouchers.length > 0 ? 0 : shippingFee;

    // Calculate promo code discount (10% of total price)
    const promoDiscount = appliedPromoCode ? totalPrice * 0.1 : 0;

    // Calculate saved shipping amount
    const savedShippingFee =
      totalPrice >= 1000 && selectedVouchers.length === 0 ? 145 : 0;

    const totalDiscount = (promoDiscount + savedShippingFee) | 0;

    return {
      totalPrice,
      totalDiscount,
      shippingFee: finalShippingFee,
      originalShippingFee: shippingFee,
      fullShippingFee: totalShippingFee,
      savedShippingFee,
      voucherDiscount,
      promoDiscount,
      grandTotal: Math.max(
        0,
        totalPrice + finalShippingFee - voucherDiscount - promoDiscount,
      ),
    };
  };

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

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: "Wallet",
      description: "Pay when you receive the item",
    },
    {
      id: "card",
      name: "Online Payment",
      icon: "CreditCard",
      description: "Credit/Debit Card (Visa, MasterCard, Amex)",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "Bank",
      description: "Direct bank transfer payment",
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "CreditCard":
        return <CreditCard size={24} />;
      case "Wallet":
        return <Wallet size={24} />;
      case "Truck":
        return <Truck size={24} />;
      default:
        return <Wallet size={24} />;
    }
  };

  const userInfo = {
    firstName: "Mohammad",
    lastName: "Abdullah",
    address: "AI, Heial 36, Noyasark, Sylhet ~3100",
    email: "mohammad@example.com",
    phone: "+8801XXXXXXXXX",
  };

  const [formData, setFormData] = useState<UserInfo>(userInfo);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Check form validity whenever form changes
  const checkFormValidity = () => {
    const isValid = !!(
      firstNameRef.current?.value.trim() &&
      lastNameRef.current?.value.trim() &&
      emailRef.current?.value.trim() &&
      phoneRef.current?.value.trim() &&
      addressRef.current?.value.trim()
    );
    setFormValid(isValid);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Check validity after each change
    setTimeout(checkFormValidity, 0);
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen cart-bg py-8">
      <div className="mx-auto">
        <div className="lg:flex justify-center mx-auto w-11/12 lg:max-w-9/12  gap-3">
          {/* Left Column - Checkout Process */}
          <div className="lg:w-2/3">
            <div className="mb-3">
              {/* Checkout Steps */}
              <div className="flex bg-card-primary px-4 py-2 rounded-lg shadow-sm items-center justify-between  flex-wrap gap-2">
                <button
                  onClick={() => setActiveStep("items")}
                  className={`flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeStep === "items"
                      ? "text-button-secondary"
                      : "text-muted-foreground"
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span className="font-medium">Items</span>
                </button>
                <ArrowRight className="hidden sm:block" />
                <button
                  onClick={() => {
                    if (completedSteps.has("items")) {
                      setActiveStep("info");
                    }
                  }}
                  disabled={!completedSteps.has("items")}
                  className={`flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    !completedSteps.has("items")
                      ? "text-muted-foreground cursor-not-allowed opacity-50"
                      : activeStep === "info"
                        ? "text-button-secondary"
                        : "text-muted-foreground"
                  }`}
                >
                  <Truck size={20} />
                  <span className="font-medium">Shipping</span>
                </button>
                <ArrowRight className="hidden sm:block" />
                <button
                  onClick={() => {
                    if (formValid) {
                      setActiveStep("payment");
                    }
                  }}
                  disabled={!formValid}
                  className={`flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    !formValid
                      ? "text-muted-foreground cursor-not-allowed opacity-50"
                      : activeStep === "payment"
                        ? "text-button-secondary"
                        : "text-muted-foreground"
                  }`}
                >
                  <CreditCard size={20} />
                  <span className="font-medium">Payment</span>
                </button>
              </div>

              {/* Active Step Content */}
              <div className="mt-3">
                {activeStep === "items" && (
                  <div>
                    <div className="bg-card-primary rounded-xl shadow-sm p-4 mb-3">
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
                    ${selectAll ? "bg-button-secondary" : "cart-border-sec"}`}
                          >
                            {selectAll && (
                              <Check className="w-3 h-3 text-white" />
                            )}
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
                        className="bg-card-primary rounded-xl shadow-sm mb-3 px-2 overflow-hidden"
                      >
                        <Accordion
                          type="single"
                          collapsible
                          defaultValue={store}
                        >
                          <AccordionItem value={store}>
                            <AccordionTrigger>
                              <div className=" p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={items.every(
                                        (item) => item.selected,
                                      )}
                                      onChange={() => {
                                        const allSelected = items.every(
                                          (item) => item.selected,
                                        );
                                        setCartItems(
                                          cartItems.map((item) =>
                                            items.some((i) => i.id === item.id)
                                              ? {
                                                  ...item,
                                                  selected: !allSelected,
                                                }
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
                                          onChange={() =>
                                            toggleItemSelect(item.id)
                                          }
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
                                            <Trash2 className="w-5 h-5 text-muted-foreground hover:text-danger" />
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
                                              {item.finalPrice.toLocaleString(
                                                "en-BD",
                                              )}
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
                )}
                {activeStep === "info" && (
                  <div className="bg-card-primary p-4 lg:p-8 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold  mb-6">
                      Customer Information
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium  flex items-center">
                            <User size={16} className="mr-2" />
                            First Name
                          </label>
                          <input
                            ref={firstNameRef}
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                            className="w-full px-4 py-3 border border-border rounded-lg transition-all focus:ring-2 "
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium  flex items-center">
                            <User size={16} className="mr-2" />
                            Last Name
                          </label>
                          <input
                            ref={lastNameRef}
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                            className="w-full px-4 py-3 border border-border rounded-lg transition-all focus:ring-2 "
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium  flex items-center">
                          <Mail size={16} className="mr-2" />
                          Email Address
                        </label>
                        <input
                          ref={emailRef}
                          type="email"
                          name="email"
                          onChange={handleChange}
                          placeholder="Email Address"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg transition-all focus:ring-2 "
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium  flex items-center">
                          <Phone size={16} className="mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          ref={phoneRef}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg transition-all focus:ring-2 "
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium  flex items-center">
                          <MapPin size={16} className="mr-2" />
                          Delivery Address
                        </label>
                        <textarea
                          name="address"
                          ref={addressRef}
                          required
                          onChange={handleChange}
                          rows={3}
                          placeholder="Delivery Address"
                          className="w-full px-4 py-3 border border-border rounded-lg transition-all resize-none focus:ring-2 "
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === "payment" && (
                  <div className="bg-card-primary p-4 lg:p-8 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold  mb-6">
                      Payment Details
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Select the payment method for your order
                    </p>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            selectedMethod === method.id
                              ? ""
                              : "border-border hover:border-black/35"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`p-3 rounded-lg ${
                                  selectedMethod === method.id
                                    ? "text-button-ternary"
                                    : ""
                                }`}
                              >
                                {getIcon(method.icon)}
                              </div>
                              <div>
                                <h4
                                  className={`font-semibold  ${
                                    selectedMethod === method.id
                                      ? "text-button-ternary"
                                      : ""
                                  } `}
                                >
                                  {method.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {method.description}
                                </p>
                              </div>
                            </div>
                            {selectedMethod === method.id && (
                              <Check className="text-blue-600" size={24} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-card-primary rounded-xl shadow p-4 flex items-center justify-center space-x-4">
              <Shield className="" size={24} />
              <span className="text-muted-foreground font-medium text-sm sm:text-base text-center">
                Secure Checkout • 256-bit SSL Encryption • Your information is
                safe
              </span>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-2/5 ">
            <div>
              <div className="bg-primary rounded-xl p-4 mb-3">
                <div className="flex items-center text-white">
                  <Truck className="w-6 h-6 mr-3" />
                  <div>
                    <p className="font-semibold">Order Details</p>
                  </div>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="bg-card-primary rounded-xl shadow-sm p-5 mb-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold cart-text-primary">
                    Promo Code
                  </h3>
                  <Tag className="w-5 h-5 text-button-secondary" />
                </div>

                {!appliedPromoCode ? (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value.toUpperCase());
                          setPromoError("");
                        }}
                        placeholder="Enter promo code"
                        className="flex-1 px-3 py-2  border cart-border-sec rounded-lg focus:outline-none focus:ring-2 focus:ring-button-secondary cart-text-primary"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="px-4 py-2 bg-button-primary cursor-pointer text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-sm text-danger mt-2">{promoError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Valid codes: SAVE10, DISCOUNT10, PROMO10 (10% off)
                    </p>
                  </div>
                ) : (
                  <div className="bg-success border border-success rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-success-foreground">
                          {appliedPromoCode}
                        </p>
                        <p className="text-sm text-success-foreground">
                          10% discount applied
                        </p>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-danger hover:text-danger/80 cursor-pointer text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-card-primary rounded-xl shadow-sm p-5 mb-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold cart-text-primary">
                    Vouchers & Promotions
                  </h3>
                  <Tag className="w-5 h-5 text-button-secondary" />
                </div>

                <p className="text-sm cart-dark-text mb-4">
                  You can get a free shipping voucher with a minimum purchase of
                  Tk 1000
                </p>

                <div className="space-y-3">
                  <p className="text-sm font-medium cart-text-primary">
                    There are {vouchers.length} Vouchers for you
                  </p>

                  {vouchers.map((voucher) => {
                    const canApply = totals.totalPrice >= voucher.minPurchase;

                    return (
                      <div key={voucher.id}>
                        {canApply ? (
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-all bg-success`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`font-medium`}>
                                    {voucher.name}
                                  </span>
                                  <Check className="w-4 h-4 text-success-foreground" />
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
                        ) : (
                          // Show AlertDialog if minimum purchase not met
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <div className="border rounded-lg p-4  transition-all opacity-50 cursor-not-allowed">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium cart-text-primary">
                                        {voucher.name}
                                      </span>
                                    </div>
                                    <p className="text-sm cart-dark-text mt-1">
                                      {voucher.description}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold cart-light-text">
                                      Tk{" "}
                                      {voucher.discount.toLocaleString("en-BD")}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Minimum Purchase Required
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  You need to spend at least Tk{" "}
                                  {voucher.minPurchase.toLocaleString("en-BD")}{" "}
                                  to use this voucher. Your current total is Tk{" "}
                                  {totals.totalPrice.toLocaleString("en-BD")}.
                                  <br />
                                  <br />
                                  Please add Tk{" "}
                                  {(
                                    voucher.minPurchase - totals.totalPrice
                                  ).toLocaleString("en-BD")}{" "}
                                  more to your cart to unlock this voucher.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Okay</AlertDialogCancel>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-card-primary rounded-xl shadow-sm p-5">
                <h3 className="font-semibold cart-text-primary mb-4">
                  Order Summary
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Price (
                      {cartItems.filter((item) => item.selected).length}{" "}
                      products)
                    </span>
                    <span className="font-medium cart-text-primary">
                      Tk {totals.totalPrice.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Fee</span>
                    <div className="text-right">
                      {totals.shippingFee === 0 &&
                      totals.fullShippingFee > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="line-through text-sm text-muted-foreground">
                            Tk {totals.fullShippingFee.toLocaleString("en-BD")}
                          </span>
                          <span className="font-medium text-success-foreground">
                            Free
                          </span>
                        </div>
                      ) : totals.savedShippingFee > 0 ? (
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-2">
                            <span className="line-through text-sm text-muted-foreground">
                              Tk{" "}
                              {totals.fullShippingFee.toLocaleString("en-BD")}
                            </span>
                            <span className="font-medium cart-text-primary">
                              Tk {totals.shippingFee.toLocaleString("en-BD")}
                            </span>
                          </div>
                          <span className="text-xs text-success-foreground">
                            Saved Tk{" "}
                            {totals.savedShippingFee.toLocaleString("en-BD")}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium cart-text-primary">
                          Tk {totals.shippingFee.toLocaleString("en-BD")}
                        </span>
                      )}
                    </div>
                  </div>

                  {appliedPromoCode && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Promo Code Discount
                      </span>
                      <span className="font-medium text-danger">
                        - Tk {totals.promoDiscount.toLocaleString("en-BD")}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Discount
                    </span>
                    <span className="font-medium text-danger">
                      - Tk {totals.totalDiscount.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <div className="border-t cart-border-primary pt-3 mt-3">
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

                  {/* Button remains same */}
                  {activeStep === "info" && !formValid ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="button"
                          className="w-full flex justify-center items-center font-semibold py-3 px-4 rounded-lg mt-6 bg-black/10 border border-border shadow-sm cursor-not-allowed opacity-50"
                        >
                          <Lock className="mr-2" size={20} />
                          Proceed to Payment
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Make Sure Complete to Fill This Form
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Please complete all required fields before
                            proceeding to payment.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Okay</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        if (activeStep === "items") {
                          setCompletedSteps((prev) =>
                            new Set(prev).add("items"),
                          );
                          setActiveStep("info");
                        } else if (activeStep === "info") {
                          if (formValid) {
                            setCompletedSteps((prev) =>
                              new Set(prev).add("info"),
                            );
                            setActiveStep("payment");
                          }
                        } else if (activeStep === "payment") {
                          toast.success("Place Order Successful!");
                        }
                      }}
                      className="w-full bg-button-primary text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6 cursor-pointer"
                    >
                      {activeStep === "items" &&
                        `Proceed to Shipping (${cartItems.filter((item) => item.selected).length})`}
                      {activeStep === "info" && "Proceed to Payment"}
                      {activeStep === "payment" && "Place Order"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
