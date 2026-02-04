import * as z from "zod";

export const reviewSchema = z.object({
  name: z
    .string()
    .min(4, "Name is required") // must not be empty
    .max(50, "Name is too long"), // optional max length
  email: z
    .string()
    .min(1, "Email is required") // must not be empty
    .email("Invalid email address"), // must be a valid email
  rating: z
    .number({
      required_error: "Rating is required", // shown if not selected
      invalid_type_error: "Rating must be a number", // type check
    })
    .min(1, "Rating must be at least 1 star") // minimum 1
    .max(5, "Rating cannot be more than 5 stars"), // maximum 5
  review: z
    .string()
    .min(1, "Review is required") // must not be empty
    .max(500, "Review cannot exceed 500 characters"), // optional max length
});
