import * as z from "zod";

// convert string → number safely
const numberField = z.coerce.number();

const fileValidator = z.custom<File>(
  (val) => typeof window !== "undefined" && val instanceof File,
  { message: "Must be a valid file" }
);

const optionalFileValidator = z
  .custom<File | null | undefined>(
    (val) => val == null || (typeof window !== "undefined" && val instanceof File),
    { message: "Must be a valid file" }
  )
  .optional()
  .nullable();

export const editProductSchema = z
  .object({
    // Basic Info
    name: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    shortDescription: z.string().min(10).optional(),
    fullDescription: z.string().min(20).optional(),
    brandId: z.string().optional(),
    categoryId: z.string().optional(),

    // FIXED ENUM
    status: z.enum(["ACTIVE", "INACTIVE", "DRAFT", "OUT_OF_STOCK"]).optional(),

    featured: z.boolean().optional(),

    // Media (optional for edit)
    images: z.array(fileValidator).optional(),
    video: optionalFileValidator,
    manualFile: optionalFileValidator,

    // Product Details
    weight: numberField.optional(),
    weightUnit: z.string().optional(),

    dimensions: z
      .object({
        unit: z.string().optional(),
        width: numberField.optional(),
        height: numberField.optional(),
        length: numberField.optional(),
      })
      .optional(),

    tags: z.array(z.string()).optional(),
    warranty: z.string().optional(),

    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),

    // Specifications
    specifications: z.record(z.string(), z.string()).optional(),

    // FAQ
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),

    // Inventory
    minOrderQty: numberField.optional(),
    maxOrderQty: numberField.optional(),

    // Variants
    variants: z
      .array(
        z.object({
          sku: z.string().optional(),

          // FIX string → number
          price: numberField.optional(),
          cost: numberField.optional(),
          stockQuantity: numberField.optional(),
          stockAlertThreshold: numberField.optional(),

          isDefault: z.boolean().optional(),
          attributeValueIds: z.array(z.string()).optional(),
        })
      )
      .optional(),
  })
  .refine(
    (data) => !data.minOrderQty || !data.maxOrderQty || data.maxOrderQty >= data.minOrderQty,
    {
      message: "Max quantity must be ≥ min quantity",
      path: ["maxOrderQty"],
    }
  );

export type EditProductFormData = z.infer<typeof editProductSchema>;
