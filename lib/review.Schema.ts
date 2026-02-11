import * as z from "zod";

export const reviewSchema = z.object({
  name: z
    .string()
    .min(4, "Name is required")
    .max(50, "Name is too long"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  rating: z
    .number()
    .min(1, "Rating must be at least 1 star")
    .max(5, "Rating cannot be more than 5 stars"),

  review: z
    .string()
    .min(1, "Review is required")
    .max(500, "Review cannot exceed 500 characters"),
});