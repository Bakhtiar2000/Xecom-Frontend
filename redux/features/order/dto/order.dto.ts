import { OrderStatus, PaymentStatus } from "@/constants/enum";

export type TCreateOrderDto = {
  customerId: string;
  addressId: string;
  orderItems: {
    productId: string;
    variantId: string;
    quantity: number;
    unitPrice: string;
  }[];
  paymentMethod?: string;
  notes?: string;
  couponCode?: string;
  shippingMethod?: string;
};

export type TUpdateOrderDto = {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
  internalNotes?: string;
};
