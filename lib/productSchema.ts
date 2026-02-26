import * as z from "zod";

const fileValidator = z.custom<File>(
  (val) => typeof window !== "undefined" && val instanceof File,
  { message: "Must be a valid file" }
);

const optionalFileValidator = z.custom<File | null | undefined>(
  (val) => val == null || (typeof window !== "undefined" && val instanceof File),
  { message: "Must be a valid file" }
).optional().nullable();

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

  // Media
  images: z.array(fileValidator).min(1, "At least one image is required"),
  video: optionalFileValidator,      
  manualFile: optionalFileValidator,  

  // Product Details
  weight: z.number() .min(0.01, "Weight must be greater than 0"),
  dimensions: z.object({
    unit: z.string().default("cm"),
    width: z.number().min(0.01, "Width must be greater than 0"),
    height: z.number().min(0.01, "Height must be greater than 0"),
    length: z.number().min(0.01, "Length must be greater than 0"),
  }),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  warranty: z.string().min(1, "Warranty is required"),

  // SEO
  seoTitle: z.string().min(10, "SEO title must be at least 10 characters"),
  seoDescription: z.string().min(20, "SEO description must be at least 20 characters"),
  metaKeywords: z.array(z.string()).min(1, "At least one meta keyword is required"),

  // Specifications
  specifications: z.object({
    fitType: z.string().min(1, "Fit type is required"),
    occasion: z.string().min(1, "Occasion is required"),
    closureType: z.string().min(1, "Closure type is required"),
    soleMaterial: z.string().min(1, "Sole material is required"),
    upperMaterial: z.string().min(1, "Upper material is required"),
  }),

  // FAQ
  faqs: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      })
    )
    .min(1, "At least one FAQ is required"),

  // Inventory
  minOrderQty: z.number().min(1, "Minimum order quantity must be at least 1").default(1),
  maxOrderQty: z.number().min(1, "Maximum order quantity must be at least 1").default(10),

  // Variants
  variants: z
    .array(
      z.object({
        sku: z.string().min(1, "SKU is required"),
        price: z.number().min(0.01, "Price must be greater than 0"),
        cost: z.number().min(0.01, "Cost must be greater than 0"),
        stockQuantity: z.number().min(0, "Stock quantity must be 0 or more"),
        stockAlertThreshold: z.number().min(0, "Alert threshold must be 0 or more"),
        isDefault: z.boolean().default(false),
        attributeValueIds: z.array(z.string()).min(1, "At least one attribute value is required"),
      })
    )
    .min(1, "At least one variant is required"),

}).refine(
  (data) => data.maxOrderQty >= data.minOrderQty,
  {
    message: "Max quantity must be ≥ min quantity",
    path: ["maxOrderQty"],
  }
);

export type ProductFormData = z.infer<typeof productSchema>;