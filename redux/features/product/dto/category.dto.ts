export type TAddCategoryDto = {
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  sortOrder?: number;
  metadata?: any;
  file?: File;
};

export type TUpdateCategoryDto = Partial<TAddCategoryDto> & {
  id: string;
};

export type TCategoryMetadata = {
  totalCategories: number;
  totalActiveCategories: number;
  totalInactiveCategories: number;
};
