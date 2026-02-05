export type TAddBrandDto = {
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
  metadata?: any;
  file?: File;
};

export type TUpdateBrandDto = Partial<TAddBrandDto>;
