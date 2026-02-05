// ========================================
// LOCATION MANAGEMENT
// ========================================

export type TCountry = {
  id: string;
  name: string;
  code?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TDivision = {
  id: string;
  countryId: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TDistrict = {
  id: string;
  divisionId: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TThana = {
  id: string;
  districtId: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TAddress = {
  id: string;
  userId?: string | null;
  thanaId: string;
  street: string;
  postalCode?: string | null;
  createdAt: string;
  updatedAt: string;
};
