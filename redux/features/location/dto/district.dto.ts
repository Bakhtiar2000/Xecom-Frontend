export type TAddDistrictDto = {
  name: string;
  divisionId: string;
};

export type TUpdateDistrictDto = {
  id: string;
  name?: string;
  divisionId?: string;
};
