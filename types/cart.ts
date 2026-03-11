// ---------- Types ----------
interface CartItemVariant {
  id: string;
  stockQuantity: number;
  price: number;
  discountPrice?: number;
  product: {
    name: string;
    description?: string;
    images?: { imageUrl: string; isFeatured: boolean }[];
    store?: { name: string };
  };
}

interface CartItemApi {
  id: string;
  variantId: string;
  quantity: number;
  variant: CartItemVariant;
}

interface CartApi {
  id: string;
  customerId: string;
  items?: CartItemApi[];
}

interface LocalSelection {
  [cartItemId: string]: boolean;
}

interface LocalQuantity {
  [cartItemId: string]: number;
}
