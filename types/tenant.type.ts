import { SubscriptionStatus, TenantPlan, TenantStatus } from "@/constants/enum";

// ========================================
// TENANT MANAGEMENT
// ========================================

export type TTenant = {
  id: string;
  name: string;
  slug: string;
  domain?: string | null;
  subdomain?: string | null;
  plan: TenantPlan;
  status: TenantStatus;
  maxUsers: number;
  maxProducts: number;
  maxOrders: number;
  features: any;
  config: any;
  billingEmail?: string | null;
  contactEmail: string;
  phoneNumber?: string | null;
  address?: string | null;
  logoUrl?: string | null;
  brandColors?: any | null;
  customDomain?: string | null;
  sslEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string | null;
};

export type TSubscription = {
  id: string;
  tenantId: string;
  plan: TenantPlan;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string | null;
  stripeCustomerId?: string | null;
  pricePerMonth?: string | null;
  trialEndsAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
