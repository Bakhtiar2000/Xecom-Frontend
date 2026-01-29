"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Truck,
  Shield,
  CreditCard,
  ArrowRight,
  Check,
  User,
  MapPin,
  Phone,
  Tag,
  Trash2,
  Lock,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { z } from "zod";
import { CartData } from "@/data/cart";
import { checkoutSchema, type CheckoutFormData } from "@/lib/shepping.Schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

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
  const [activeStep, setActiveStep] = useState<"items" | "info" | "payment">(
    "items",
  );

  const INSIDE_DHAKA_FEE = 100;
  const OUTSIDE_DHAKA_FEE = 150;

  const [formValid, setFormValid] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(CartData);
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
      name: "Shipping Discount",
      description: "Minimum spend  Tk 1000",
      discount: 145,
      type: "freeShipping",
      minPurchase: 1000,
    },
  ];

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

    const baseShippingFee =
      formData.shippingLocation === "inside"
        ? INSIDE_DHAKA_FEE
        : OUTSIDE_DHAKA_FEE;

    let shippingFee = baseShippingFee;
    let savedShippingFee = 0;

    if (totalPrice >= 1000) {
      if (formData.shippingLocation === "inside") {
        savedShippingFee = baseShippingFee;
        shippingFee = 0;
      } else {
        savedShippingFee = baseShippingFee * 0.5;
        shippingFee = baseShippingFee * 0.5;
      }
    }

    // Promo discount (10%)
    const promoDiscount = appliedPromoCode ? totalPrice * 0.1 : 0;

    const totalDiscount = promoDiscount + savedShippingFee;

    return {
      totalPrice,
      shippingFee,
      fullShippingFee: baseShippingFee,
      savedShippingFee,
      promoDiscount,
      totalDiscount,
      grandTotal: Math.max(0, totalPrice + shippingFee - promoDiscount),
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

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    mobileNumber: "",
    shippingLocation: "inside",
    address: "",
    paymentOption: "cod",
    additionalNote: "",
    selectedPaymentMethod: "bkash",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});
  console.log(formData);

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Validate specific field only
  const validateField = (
    fieldName: string,
    value: string,
    allData: CheckoutFormData,
  ) => {
    const fieldSchemas: Record<string, z.ZodTypeAny> = {
      name: checkoutSchema.pick({ name: true }).shape.name,
      mobileNumber: checkoutSchema.pick({ mobileNumber: true }).shape
        .mobileNumber,
      shippingLocation: checkoutSchema.pick({ shippingLocation: true }).shape
        .shippingLocation,
      address: checkoutSchema.pick({ address: true }).shape.address,
      paymentOption: checkoutSchema.pick({ paymentOption: true }).shape
        .paymentOption,
      additionalNote: checkoutSchema.pick({ additionalNote: true }).shape
        .additionalNote,
      selectedPaymentMethod: checkoutSchema.pick({
        selectedPaymentMethod: true,
      }).shape.selectedPaymentMethod,
    };

    const schema = fieldSchemas[fieldName];
    if (!schema) return;

    const validation = schema.safeParse(value);

    setFormErrors((prev) => {
      if (validation.success) {
        // Clear error for this field
        const newErrors = { ...prev };
        delete newErrors[fieldName as keyof CheckoutFormData];
        return newErrors;
      } else {
        // Set error for this field only
        return {
          ...prev,
          [fieldName]: validation.error.issues[0]?.message || "Invalid input",
        };
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // Validate only the field being changed
      validateField(name, value, updatedData);

      // Check if entire form is valid for button enabling
      const validation = checkoutSchema.safeParse(updatedData);
      setFormValid(validation.success);

      return updatedData;
    });
  };

  const totals = calculateTotals();

  // shepping discound message

  const getOfferMessage = () => {
    const remaining = 1000 - totals.totalPrice;

    if (totals.totalPrice < 1000) {
      return {
        status: "locked",
        message: `Spend Tk ${remaining.toLocaleString("en-BD")} more to unlock shipping offer`,
      };
    }

    if (formData.shippingLocation === "inside") {
      return {
        status: "active",
        message: "🎉 Free shipping applied (Inside Dhaka)",
      };
    }

    return {
      status: "active",
      message: "🎉 50% shipping discount applied (Outside Dhaka)",
    };
  };
  const offerInfo = getOfferMessage();


  return (
    <div className="min-h-screen cart-bg py-8">
      <div className="mx-auto">
        <div className="lg:flex justify-center mx-auto w-11/12 px-4  gap-3">
          {/* Left Column - Checkout Process */}
          <div
            className={`${activeStep === "payment" ? "lg:w-full" : "lg:w-8/12"}`}
          >
            <div className="mb-3">
              {/* Checkout Steps */}
              <Tabs
              
                value={activeStep}
                onValueChange={(value) => {
                  if (value === "items") {
                    setActiveStep("items");
                  } else if (value === "info" && completedSteps.has("items")) {
                    setActiveStep("info");
                  } else if (value === "payment" && formValid) {
                    setActiveStep("payment");
                  }
                }}
              >
                <TabsList className="flex bg-card-primary px-4 py-2  rounded-lg shadow-sm items-center flex-wrap gap-2 w-full h-auto">
                  <TabsTrigger
                    value="items"
                    className="flex items-center space-x-2 px-4 py-4 rounded-lg transition-all data-[state=active]:text-button-secondary"
                  >
                    <ShoppingCart size={20} />
                    <span className="font-medium hidden md:inline">Items</span>
                  </TabsTrigger>

                  <ArrowRight className="mx-1" />

                  <TabsTrigger
                    value="info"
                    disabled={!completedSteps.has("items")}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all data-[state=active]:text-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Truck size={20} />
                    <span className="font-medium hidden md:inline">Shipping</span>
                  </TabsTrigger>

                  <ArrowRight className="mx-1" />

                  <TabsTrigger
                    value="payment"
                    disabled={!formValid}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all data-[state=active]:text-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CreditCard size={20} />
                    <span className="font-medium hidden md:inline">Successfully Payment</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>


              {/* Active Step Content */}
              <div className="mt-3">
                {activeStep === "items" && (
                  <div>
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
                              <div className=" p-2">
                                <div className="flex items-center cursor-pointer justify-between">
                                  <div className="ml-3">
                                    <h3 className="font-semibold text-lg lg:text-xl">
                                      {store}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="divide-y border-t cart-border-primary border-border">
                                {items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="p-4 cursor-pointer"
                                  >
                                    <div
                                      className="flex flex-col
                                     sm:flex-row gap-4"
                                    >
                                      {/* Image */}
                                      <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden cart-img-bg-primary flex-shrink-0">
                                        <div className="w-full h-full flex items-center justify-center">
                                          <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={96}
                                            height={96}
                                            className="object-cover"
                                          />
                                        </div>
                                      </div>

                                      {/* Details */}
                                      <div className="flex-1 flex flex-col justify-between">
                                        {/* Name and Remove Button */}
                                        <div className="flex flex-row justify-between">
                                          <div>
                                            <h4 className="font-medium text-sm lg:text-lg">
                                              {item.name}{" "}
                                              <span className="ml-2">
                                                x {item.quantity}
                                              </span>
                                            </h4>
                                            {item.description && (
                                              <p className="text-sm cart-text-base mt-1">
                                                {item.description}
                                              </p>
                                            )}
                                          </div>
                                          <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 mt-2 sm:mt-0 self-start sm:self-auto rounded-lg"
                                          >
                                            <Trash2 className="w-5 h-5 text-muted-foreground hover:text-danger" />
                                          </button>
                                        </div>

                                        {/* Pricing and Quantity */}
                                        <div className="flex flex-row items-start sm:items-center justify-between mt-4 gap-2 sm:gap-0">
                                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            {item.discountPercentage && (
                                              <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 bg-danger-foreground text-danger text-sm font-medium rounded">
                                                  {item.discountPercentage}%
                                                </span>
                                                <span className="text-lg cart-text-base line-through">
                                                  Tk{" "}
                                                  {item.originalPrice.toLocaleString(
                                                    "en-BD",
                                                  )}
                                                </span>
                                              </div>
                                            )}
                                            <div className="text-xl font-bold text-sm lg:text-lg">
                                              Tk{" "}
                                              {item.finalPrice.toLocaleString(
                                                "en-BD",
                                              )}
                                            </div>
                                          </div>

                                          {/* Quantity Selector */}
                                          <div className="flex items-center border cart-border-sec rounded-lg mt-2 sm:mt-0">
                                            <button
                                              onClick={() =>
                                                updateQuantity(item.id, false)
                                              }
                                              className="px-3 py-1 cursor-pointer"
                                            >
                                              -
                                            </button>
                                            <span className="px-4 py-1 text-sm lg:text-lg">
                                              {item.quantity}
                                            </span>
                                            <button
                                              onClick={() =>
                                                updateQuantity(item.id, true)
                                              }
                                              className="px-3 py-1 cursor-pointer"
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
                    <div className="flex my-2 gap-2">
                      {/* Name Field */}
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium  flex items-center">
                          <User size={16} className="mr-2" />
                          Your name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Rahim Abdel"
                          className={`w-full px-4 py-3 border rounded-lg  transition-all bg-transparent ${
                            formErrors.name
                              ? "border-danger focus:ring-danger "
                              : " focus:ring-success"
                          }`}
                        />
                        {formErrors.name && (
                          <p className="text-sm text-danger font-medium">
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      {/* Mobile Number Field */}
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium  flex items-center">
                          <Phone size={16} className="mr-2" />
                          <span className="hidden lg:flex">
                            Your Mobile
                          </span>{" "}
                          Number *
                        </label>
                        <Input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          placeholder="017XXXXXXXX"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none  transition-all bg-transparent ${
                            formErrors.mobileNumber
                              ? "border-danger focus:ring-danger"
                              : "border-success  focus:ring-success"
                          }`}
                        />
                        {formErrors.mobileNumber && (
                          <p className="text-sm text-danger font-medium">
                            {formErrors.mobileNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Shipping Location */}
                    <div className="space-y-2 my-2">
                      <label className="text-sm font-medium  flex items-center">
                        <MapPin size={16} className="mr-2" />
                        Shipping Location *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <label
                          className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                            formData.shippingLocation === "inside"
                              ? "border-border bg-success"
                              : "border-border hover:border-success-foreground"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shippingLocation"
                            value="inside"
                            checked={formData.shippingLocation === "inside"}
                            onChange={handleChange}
                            className="mr-3 w-4 h-4 "
                          />
                          <div>
                            <p className="font-medium">Inside Dhaka</p>
                            <p className="text-sm text-muted-foreground">
                              Minimum spend 1000 tk then Free Shipping{" "}
                            </p>
                          </div>
                        </label>

                        <label
                          className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                            formData.shippingLocation === "outside"
                              ? "border-border bg-success"
                              : "border-border hover:border-success-foreground"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shippingLocation"
                            value="outside"
                            checked={formData.shippingLocation === "outside"}
                            onChange={handleChange}
                            className="mr-3 w-4 h-4 text-success-foreground"
                          />
                          <div>
                            <p className="font-medium">Outside Dhaka</p>
                            <p className="text-sm text-muted-foreground">
                              Minimum spend 1000 tk then Shipping 50% off{" "}
                            </p>
                          </div>
                        </label>
                      </div>
                      {formErrors.shippingLocation && (
                        <p className="text-sm text-danger font-medium">
                          {formErrors.shippingLocation}
                        </p>
                      )}
                    </div>

                    {/* Address Field */}
                    <div className="space-y-2 my-2">
                      <label className="text-sm font-medium  flex items-center">
                        <MapPin size={16} className="mr-2" />
                        Your Address *
                      </label>
                      <Textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Product delivery address here"
                        className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all ${
                          formErrors.address
                            ? "border-danger focus:ring-danger"
                            : "border-success focus:ring-success"
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-sm text-danger font-medium">
                          {formErrors.address}
                        </p>
                      )}
                    </div>

                    {/* Payment Option */}
                    <div className="space-y-2 my-2">
                      <label className="text-sm font-medium  flex items-center">
                        Payment Option *
                      </label>

                      <div className="space-y-4 lg:flex lg:gap-4">
                        {/* Cash on Delivery Card */}
                        <div className="flex-1">
                          <label
                            className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                              formData.paymentOption === "cod"
                                ? "border-border bg-success"
                                : "border-border hover:border-success-foreground"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentOption"
                              value="cod"
                              checked={formData.paymentOption === "cod"}
                              onChange={handleChange}
                              className="mr-3 w-4 h-4 text-tag"
                            />
                            <div>
                              <p className="font-medium ">Cash On Delivery</p>
                              <p className="text-sm text-muted-foreground">
                                Additional fee may apply
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Online Payment Dropdown Card */}
                        <div
                          className={`border flex-1  rounded-lg p-4 cursor-pointer  mb-4 transition-all ${
                            formData.paymentOption === "online"
                              ? "border-border bg-success"
                              : "border-border hover:border-success-foreground"
                          }`}
                        >
                          <div className="flex items-center  justify-start">
                            <input
                              type="radio"
                              name="paymentOption"
                              value="online"
                              checked={formData.paymentOption === "online"}
                              onChange={handleChange}
                              className="mr-3 w-4 h-4  mt-4 text-tag"
                            />
                            <div className="h-1 mb-4">
                              <div className="h-1 mb-4 flex-1">
                                <Select
                                  value={formData.selectedPaymentMethod}
                                  onValueChange={(
                                    value:
                                      | "bkash"
                                      | "nagad"
                                      | "rocket"
                                      | "upay"
                                      | "bank"
                                      | "card",
                                  ) => {
                                    setFormData((prev) => {
                                      const updatedData: CheckoutFormData = {
                                        ...prev,
                                        paymentOption: "online",
                                        selectedPaymentMethod: value,
                                      };

                                      // Validate the entire form with updated data
                                      const validation =
                                        checkoutSchema.safeParse(updatedData);
                                      if (validation.success) {
                                        setFormErrors({});
                                        setFormValid(true);
                                      } else {
                                        const errors: Partial<
                                          Record<keyof CheckoutFormData, string>
                                        > = {};
                                        validation.error.issues.forEach(
                                          (error) => {
                                            const field = error
                                              .path[0] as keyof CheckoutFormData;
                                            errors[field] = error.message;
                                          },
                                        );
                                        setFormErrors(errors);
                                        setFormValid(false);
                                      }

                                      return updatedData;
                                    });
                                  }}
                                >
                                  <SelectTrigger
                                    className={`w-full ${
                                      formErrors.selectedPaymentMethod
                                        ? "border-danger focus:ring-danger"
                                        : ""
                                    }`}
                                  >
                                    <SelectValue placeholder="Select payment method" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="bkash">
                                      <div>
                                        <p className="font-medium ">Bkash</p>
                                        <p className="text-xs text-muted-foreground">
                                          Mobile Payment
                                        </p>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="nagad">
                                      <div>
                                        <p className="font-medium">Nagad</p>
                                        <p className="text-xs text-muted-foreground">
                                          Mobile payment
                                        </p>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="rocket">
                                      <div>
                                        <p className="font-medium">Rocket</p>
                                        <p className="text-xs text-muted-foreground">
                                          Mobile payment
                                        </p>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="upay">
                                      <div>
                                        <p className="font-medium">Upay</p>
                                        <p className="text-xs text-muted-foreground">
                                          Digital wallet
                                        </p>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="bank">
                                      <div>
                                        <p className="font-medium">
                                          Bank Transfer
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          Direct transfer
                                        </p>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="card">
                                      <div>
                                        <p className="font-medium">
                                          Credit/Debit Card
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          Visa, Mastercard, Amex
                                        </p>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                {formErrors.selectedPaymentMethod && (
                                  <p className="text-sm text-danger font-medium mt-1">
                                    {formErrors.selectedPaymentMethod}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {formErrors.paymentOption && (
                        <p className="text-sm text-danger font-medium">
                          {formErrors.paymentOption}
                        </p>
                      )}
                    </div>

                    {/* Additional Note */}
                    <div className="space-y-2 my-2">
                      <label className="text-sm font-medium  flex items-center">
                        <FileText size={16} className="mr-2" />
                        Additional Note
                      </label>
                      <Textarea
                        name="additionalNote"
                        value={formData.additionalNote}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Write your instruction here"
                        className="w-full px-4 py-3 border border-success rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-success transition-all"
                      />
                    </div>
                  </div>
                )}

                {activeStep === "payment" && (
                  <div className=" flex items-center justify-center bg-card-primary py-10 ">
                    <div className="max-w-md w-full p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        🎉 Thank You
                      </p>

                      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                        Your order has been received
                      </h1>

                      <p className="text-muted-foreground text-sm mb-6">
                        Thanks for your order at . Your order will be processed
                        as soon as possible. Make sure you check your order ID.
                        You will be receiving an email shortly with invoice
                        number.
                      </p>

                      <div className="text-sm text-center mb-6">
                        <div className="inline-block text-left space-y-3">
                          <p>
                            <strong>Order ID:</strong> #T9639048
                          </p>
                          <p>
                            <strong>Order Date:</strong> 10 May, 2025
                          </p>
                          <p>
                            <strong>Order Status:</strong> Order Submitted
                          </p>
                          <p>
                            <strong>Order Value:</strong> Tk. 1,297
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 justify-center mt-6">
                        {/* Track Order Button */}
                        <Link href="/track-order">
                          <button className="flex items-center gap-2 px-5 py-2 cursor-pointer bg-success rounded-lg text-secondary-foreground transition">
                            <Truck size={18} />
                            <span>Track Order</span>
                          </button>
                        </Link>

                        {/* Continue Shopping Button */}
                        <Link href="/shop">
                          <button className="flex items-center gap-2 px-5 py-2  border rounded-lg border-success cursor-pointer text-success-foreground transition">
                            <ShoppingCart size={18} />
                            <span>Continue Shopping</span>
                          </button>
                        </Link>
                      </div>
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
          <div
            className={`lg:w-4/12 mt-3 lg:mt-0 ${activeStep === "payment" ? "hidden" : ""}`}
          >
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
                  <h3 className="font-semibold text-sm lg:text-lg">
                    Discount Code
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
                        className="flex-1 px-3 py-2  border cart-border-sec rounded-lg focus:outline-none focus:ring-2 focus:ring-button-secondary text-sm lg:text-lg"
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
                  <h3 className="font-semibold text-sm lg:text-lg">
                    Available Offers
                  </h3>
                  <Tag className="w-5 h-5 text-button-secondary" />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-sm lg:text-lg">
                    There are {vouchers.length} Vouchers for you
                  </p>

                  {vouchers.map((voucher) => {
                    const canApply = totals.totalPrice >= voucher.minPurchase;

                    return (
                      <div key={voucher.id}>
                        {canApply ? (
                          <div
                            className={`rounded-lg p-3 mb-4 text-sm flex items-center gap-2
    ${
      offerInfo.status === "active"
        ? "bg-success text-success-foreground border border-success/30"
        : "bg-muted text-muted-foreground border border-border"
    }`}
                          >
                            {offerInfo.status === "active" ? (
                              <Check size={16} />
                            ) : (
                              <Lock size={16} />
                            )}
                            <span>{offerInfo.message}</span>
                          </div>
                        ) : (
                          // Show AlertDialog if minimum purchase not met
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <div
                                className={`rounded-lg p-3 mb-4 text-sm flex items-center gap-2
    ${
      offerInfo.status === "active"
        ? "bg-success/10 text-success-foreground border border-success/30"
        : "bg-muted text-muted-foreground border border-border"
    }`}
                              >
                                {offerInfo.status === "active" ? (
                                  <Check size={16} />
                                ) : (
                                  <Lock size={16} />
                                )}
                                <span>{offerInfo.message}</span>
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
                <h3 className="font-semibold text-sm lg:text-lg mb-4">
                  Order Summary
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Price (
                      {cartItems.filter((item) => item.selected).length}{" "}
                      products)
                    </span>
                    <span className="font-medium text-sm lg:text-lg">
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
                            <span className="font-medium text-sm lg:text-lg">
                              Tk {totals.shippingFee.toLocaleString("en-BD")}
                            </span>
                          </div>
                          <span className="text-xs text-success-foreground">
                            Saved Tk{" "}
                            {totals.savedShippingFee.toLocaleString("en-BD")}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium text-sm lg:text-lg">
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
                      <span className="text-lg font-bold text-sm lg:text-lg">
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
                            const orderData = {
                              customer: {
                                name: formData.name,
                                phone: formData.mobileNumber,
                              },
                              shipping: {
                                location: formData.shippingLocation,
                                address: formData.address,
                              },
                              payment: {
                                method: formData.paymentOption,
                                selectedMethod: formData.selectedPaymentMethod,
                              },
                              note: formData.additionalNote,
                              items: cartItems.filter((item) => item.selected),
                              total: totals.grandTotal,
                            };
                            console.log("orderData", orderData);
                            toast.success("Place Order Successful!");

                            // Clear the form after successful order
                            setFormData({
                              name: "",
                              mobileNumber: "",
                              shippingLocation: "inside",
                              address: "",
                              paymentOption: "cod",
                              additionalNote: "",
                              selectedPaymentMethod: "bkash",
                            });

                            // Clear form validation states
                            setFormErrors({});
                            setFormValid(false);

                            // Clear other states
                            setAppliedPromoCode("");
                            setPromoCode("");
                            setPromoError("");
                          }
                        } else if (activeStep === "payment") {
                          
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
