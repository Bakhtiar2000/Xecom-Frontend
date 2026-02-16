import { TenantPlan } from "@/constants/enum";

export type TCreateSubscriptionDto = {
  tenantId: string;
  plan: TenantPlan;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  pricePerMonth?: string;
};
