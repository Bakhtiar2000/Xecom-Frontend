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
} from "lucide-react";
import Image from "next/image";

import { useRef } from "react";
import { PaymentMethod, UserInfo } from "@/types";
import { CartData } from "@/data/cart";
import AllOrderSummery from "@/components/customComponents/OrderSummery";

const CheckoutPage = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const [activeStep, setActiveStep] = useState<"info" | "payment">(
    "info",
  );
  const [selectedMethod, setSelectedMethod] = useState<string>("cod");

  // Add state to track form validity
  const [formValid, setFormValid] = useState(false);

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

  const [cartItems, setCartItems] = useState<CartItem[]>(CartData);

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

    return {
      totalPrice,
      totalDiscount,
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen cart-bg py-8">
      <div className="mx-auto">
        <div className="lg:flex justify-center mx-auto w-11/12 lg:max-w-7xl gap-8">
          {/* Left Column - Checkout Process */}
          <div className="lg:w-2/3">
            <div className="bg-card-primary rounded-xl shadow-sm p-6 mb-6">
              {/* Checkout Steps */}
              <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
                <button
                  onClick={() => setActiveStep("info")}
                  className={`flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeStep === "info"
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
              <div className="mt-8">
               

                {activeStep === "info" && (
                  <div>
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
                  <div>
                    <h2 className="text-2xl font-bold  mb-6">
                      Payment Details
                    </h2>
                    <p className="text-gray-600 mb-6">
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
                                    : "bg-white text-black"
                                }`}
                              >
                                {getIcon(method.icon)}
                              </div>
                              <div>
                                <h4 className={`font-semibold  ${
                                  selectedMethod === method.id
                                    ? "text-button-ternary"
                                    : "bg-white text-black"
                                } `}>
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
          <div className="lg:w-1/3 ">
            <AllOrderSummery
              items={CartData}
              Totals={totals}
              activeStep={activeStep}
              isDisabled={activeStep === "info" && !formValid}
              onProceed={() => {
                if (activeStep === "items") {
                  setActiveStep("info");
                } else if (activeStep === "info") {
                  if (formValid) {
                    setActiveStep("payment");
                  }
                } else {
                  console.log("Processing payment...");
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
