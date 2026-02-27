import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    ),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  file: z.any().optional(),
});

export type TBrandFormData = z.infer<typeof brandSchema>;
