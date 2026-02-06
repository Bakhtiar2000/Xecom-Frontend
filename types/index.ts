export * from "./user.type";
export * from "./global.type";

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  image: string;
  badge?: "BEST SELLER" | "NEW" | "TRENDING" | "LIMITED" | "CLASSIC";
  inStock: boolean;
  deliveryTime: string;
  features: string[];
}

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  categories: string[];
  sortBy: string;
}

export interface Order {
  id: string
  date: string
  value: string
  status: "On shipping" | "Delivered"
  phone: string
}

export type Review = {
  id: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
};

