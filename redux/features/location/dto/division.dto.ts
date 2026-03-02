export type TAddDivisionDto = {
  name: string;
  countryId: string;
};

export type TUpdateDivisionDto = {
  id: string;
  name?: string;
  countryId?: string;
};
