import { Gender } from "@/constants/enum";

export type TRegisterAdminDto = {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender?: Gender;
  hireDate?: string;
  notes?: string;
  profilePicture?: File;
};
