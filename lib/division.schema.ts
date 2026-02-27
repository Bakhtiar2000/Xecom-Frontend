import { z } from "zod";

export const divisionSchema = z.object({
  // id:z.string().optional(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  countryId: z.string().min(1, "Country is required"),
});

export type TDivisionFormData = z.infer<typeof divisionSchema>;
