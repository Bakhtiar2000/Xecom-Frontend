import { Gender } from "@/constants/enum";

export type TRegisterCustomerDto = {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender?: Gender;
};
