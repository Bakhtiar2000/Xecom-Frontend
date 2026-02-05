import { CouponType } from "@/constants/enum";

export type TAddCouponDto = {
  code: string;
  name: string;
  description?: string;
  type: CouponType;
  value: string;
  minOrderAmount?: string;
  maxDiscountAmount?: string;
  usageLimit?: number;
  userUsageLimit?: number;
  isActive?: boolean;
  startsAt?: string;
  expiresAt?: string;
  applicableProductIds?: string[];
  applicableCategoryIds?: string[];
};

export type TUpdateCouponDto = Partial<TAddCouponDto>;
