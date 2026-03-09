import { z } from "zod";

export const thanatSchema = z.object({
  // id:z.string().optional(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  districtId: z.string().min(1, "district is required"),
});

export type TThanaFormData = z.infer<typeof thanatSchema>;
