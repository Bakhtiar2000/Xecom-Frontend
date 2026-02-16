import { Gender } from "@/constants/enum";


export type TRegisterStaffDto = {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender?: Gender;
  hireDate?: string;
  notes?: string;
  profilePicture?: File;
};