import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
export interface CartItem {
  id: string;
  store: string;
  name: string;
  description?: string;
  originalPrice?: number;
  discountPercentage?: number;
  finalPrice: number;
  image: any;
  selected: boolean;
  quantity: number;
  comboOffer?: boolean;
  price: number;

  discount?: number;
}
export interface OrderSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

import { StaticImageData } from 'next/image';

export type Category = {
  id: number;
  title: string;
  image: string | StaticImageData;
};


