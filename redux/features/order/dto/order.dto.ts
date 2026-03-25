import { OrderStatus } from "@/constants/enum";

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

export type TUpdateOrderStatusDto = {
  status: OrderStatus;
  internalNotes?: string;
};
