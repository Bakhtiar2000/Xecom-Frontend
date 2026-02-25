export type TAddProductDto = {
  name: string;
  slug: string;
  shortDescription?: string;
  fullDescription?: string;
  brandId?: string;
  categoryId?: string;
  status?: string;
  featured?: boolean;
  weight?: number;
  dimensions?: any;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string[];
  warranty?: string;
  specifications?: any;
  faqData?: any;
  minOrderQty?: number;
  maxOrderQty?: number;
  videoUrl?: File;
  manualUrl?: File;
};

export type TUpdateProductDto = Partial<TAddProductDto>;

export type TProductMetadata = {
  totalProducts: number;
  totalActiveProducts: number;
  totalInactiveProducts: number;
  totalSalesCount: number;
};
