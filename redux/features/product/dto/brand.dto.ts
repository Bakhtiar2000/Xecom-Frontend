export type TAddBrandDto = {
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
  metadata?: any;
  file?: File;
};

export type TUpdateBrandDto = Partial<TAddBrandDto>;


export type TBrandMetadata = {
  totalBrands: number;
  totalActiveBrands: number;
  totalInactiveBrands: number;
}