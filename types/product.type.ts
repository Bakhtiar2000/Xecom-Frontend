import { ProductRelationType, ProductStatus } from "@/constants/enum";

// ========================================
// PRODUCT CATALOG MANAGEMENT
// ========================================

export type TCategory = {
  id: string;
  tenantId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  parentId?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  sortOrder: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number
  }
};

export type TBrand = {
  id: string;
  tenantId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  isActive: boolean;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number
  }
};

export type TProduct = {
  id: string;
  tenantId?: string | null;
  name: string;
  slug: string;
  shortDescription?: string | null;
  fullDescription?: string | null;
  brandId?: string | null;
  categoryId?: string | null;
  status: ProductStatus;
  featured: boolean;
  weight?: string | null;
  dimensions?: any | null;
  tags: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  metaKeywords: string[];
  warranty?: string | null;
  specifications: any;
  faqData: any;
  videoUrl?: string | null;
  manualUrl?: string | null;
  minOrderQty: number;
  maxOrderQty?: number | null;
  isBundle: boolean;
  totalSales: number;
  viewCount: number;
  avgRating?: string | null;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type TBundleItem = {
  id: string;
  bundleId: string;
  productId: string;
  quantity: number;
  discount: string;
  createdAt: string;
};

export type TProductRelation = {
  id: string;
  tenantId?: string | null;
  productId: string;
  relatedToId: string;
  type: ProductRelationType;
  priority: number;
  createdAt: string;
};

export type TAttribute = {
  id: string;
  name: string;
  createdAt: string;
};

export type TAttributeValue = {
  id: string;
  attributeId: string;
  value: string;
  hexCode?: string | null;
};

export type TProductVariantAttribute = {
  id: string;
  variantId: string;
  attributeValueId: string;
};

export type TProductVariant = {
  id: string;
  productId: string;
  sku: string;
  price: string;
  cost?: string | null;
  stockQuantity: number;
  stockAlertThreshold: number;
  isDefault: boolean;
  createdAt: string;
};

export type TProductImage = {
  id: string;
  productId: string;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
};

export type TReview = {
  id: string;
  productId: string;
  customerId: string;
  rating: number;
  comment?: string | null;
  isApproved: boolean;
  createdAt: string;
};

export type TWishlist = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
};

export type TCart = {
  id: string;
  customerId: string;
  createdAt: string;
};

export type TCartItem = {
  id: string;
  cartId: string;
  variantId: string;
  quantity: number;
  createdAt: string;
};
