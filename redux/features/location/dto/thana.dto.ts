export type TAddThanaDto = {
  name: string;
  districtId: string;
};

export type TUpdateThanaDto = {
  id: string;
  name?: string;
  districtId?: string;
};
