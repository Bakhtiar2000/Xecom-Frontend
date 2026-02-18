// lib/validations/product.schema.ts
import * as z from "zod";

export const productSchema = z.object({
  // Basic Info
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  fullDescription: z.string().min(20, "Full description must be at least 20 characters"),
  brandId: z.string().min(1, "Please select a brand"),
  categoryId: z.string().min(1, "Please select a category"),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]),
  featured: z.boolean().default(false),

  // Product Details
  weight: z.string().optional(),
  dimensions: z.object({
    unit: z.string().default("cm"),
    width: z.number().min(0).default(0),
    height: z.number().min(0).default(0),
    length: z.number().min(0).default(0),
  }),
  tags: z.array(z.string()).default([]),
  warranty: z.string().optional(),

  // SEO
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  metaKeywords: z.array(z.string()).default([]),

  // Specifications
  specifications: z.object({
    fitType: z.string().optional(),
    occasion: z.string().optional(),
    closureType: z.string().optional(),
    soleMaterial: z.string().optional(),
    upperMaterial: z.string().optional(),
  }),

  // FAQ
  faqData: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })
  ).default([]),

  // Media
  videoUrl: z.string().optional().refine(
    (val) => !val || val === "" || z.string().url().safeParse(val).success,
    "Please enter a valid URL"
  ),
  manualUrl: z.string().optional().refine(
    (val) => !val || val === "" || z.string().url().safeParse(val).success,
    "Please enter a valid URL"
  ),

  // Inventory
  minOrderQty: z.number().min(1, "Minimum order quantity must be at least 1").default(1),
  maxOrderQty: z.number().min(1, "Maximum order quantity must be at least 1").default(100),
  isBundle: z.boolean().default(false),
});

export type ProductFormData = z.infer<typeof productSchema>;