import { UserStatus } from "@/constants/enum";

export type TChangeStatusDto = {
  status: UserStatus;
};

export type TAddAddressDto = {
  userId?: string;
  thanaId: string;
  postalCode?: string;
  street: string;
};
