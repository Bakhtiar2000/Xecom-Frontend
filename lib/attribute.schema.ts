import { z } from "zod";

export const attributeSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
});

export const attributeValueSchema = z.object({
  value: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  hexCode: z
    .string()
    .optional()
    .refine((val) => !val || /^#([0-9A-Fa-f]{3}){1,2}$/.test(val), {
      message: "Invalid hex color",
    }),
});

export type TAttributeFormData = z.infer<typeof attributeSchema>;

export type TAttributeValueFormData = z.infer<typeof attributeValueSchema>;
