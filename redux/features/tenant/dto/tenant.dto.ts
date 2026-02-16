import { TenantPlan, TenantStatus } from "@/constants/enum";

export type TCreateTenantDto = {
  name: string;
  slug: string;
  domain?: string;
  subdomain?: string;
  plan?: TenantPlan;
  contactEmail: string;
  phoneNumber?: string;
  address?: string;
};

export type TUpdateTenantDto = Partial<TCreateTenantDto> & {
  status?: TenantStatus;
};
