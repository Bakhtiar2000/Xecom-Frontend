export type TAddCountryDto = {
  name: string;
  code?: string;
};

export type TUpdateCountryDto = {
  id: string;
  name?: string;
  code?: string;
};
