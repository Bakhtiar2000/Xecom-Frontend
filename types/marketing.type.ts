import { CouponType } from "@/constants/enum";

// ========================================
// MARKETING & PROMOTIONS
// ========================================

export type TCoupon = {
  id: string;
  tenantId?: string | null;
  code: string;
  name: string;
  description?: string | null;
  type: CouponType;
  value: string;
  minOrderAmount?: string | null;
  maxDiscountAmount?: string | null;
  usageLimit?: number | null;
  usageCount: number;
  userUsageLimit?: number | null;
  isActive: boolean;
  startsAt?: string | null;
  expiresAt?: string | null;
  applicableProductIds: string[];
  applicableCategoryIds: string[];
  createdAt: string;
  updatedAt: string;
};
