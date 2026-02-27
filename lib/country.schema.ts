import { z } from "zod";

export const countrySchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    code: z.string().optional()
        
    
});

export type TCountryFormData = z.infer<typeof countrySchema>;