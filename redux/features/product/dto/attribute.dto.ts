export type TAddAttributeDto = {
  name: string;
};

export type TUpdateAttributeDto = {
  name: string;
};

export type TAddAttributeValueDto = {
  attributeId: string;
  value: string;
  hexCode?: string;
};

export type TUpdateAttributeValueDto = {
  attributeId: string;
  value?: string;
  hexCode?: string;
};
