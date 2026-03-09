export type TAddReviewDto = {
  productId: string;
  rating: number;
  comment?: string;
};

export type TUpdateReviewDto = {
  id: string;
  rating?: number;
  comment?: string;
};

export type TApproveReviewDto = {
  isApproved: boolean;
};
