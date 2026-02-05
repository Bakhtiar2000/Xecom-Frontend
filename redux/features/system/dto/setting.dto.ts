import { SettingType } from "@/constants/enum";

export type TAddSettingDto = {
  key: string;
  value: string;
  type: SettingType;
  description?: string;
  isPublic?: boolean;
};

export type TUpdateSettingDto = Partial<TAddSettingDto>;
