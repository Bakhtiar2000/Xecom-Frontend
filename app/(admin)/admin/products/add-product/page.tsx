"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/lib/productSchema";

import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductSummary from "./sections/ProductSummary";
import BasicInfoTab from "./sections/BasicInfoTab";
import DetailsTab from "./sections/DetailsTab";
import SpecificationsTab from "./sections/SpecificationsTab";
import SeoTab from "./sections/SeoTab";
import MediaTab from "./sections/MediaTab";
import FaqTab from "./sections/FaqTab";
import VariantsTab from "./sections/VariantsTab";



// ─── Tab config ─────
const TAB_ORDER = ["basic", "details", "specifications", "seo", "media", "faq", "variants"] as const;
type TabName = (typeof TAB_ORDER)[number];

const TAB_FIELDS: Record<TabName, string[]> = {
  basic:          ["name", "slug", "shortDescription", "fullDescription", "brandId", "categoryId", "status", "featured"],
  details:        ["weight", "warranty", "dimensions.width", "dimensions.height", "dimensions.length", "tags", "minOrderQty", "maxOrderQty"],
  specifications: ["specifications.fitType", "specifications.occasion", "specifications.closureType", "specifications.soleMaterial", "specifications.upperMaterial"],
  seo:            ["seoTitle", "seoDescription", "metaKeywords"],
  media:          ["images"],
  faq:            ["faqs"],
  variants:       ["variants"],
};

// Map every field key → its tab (root key used for nested, e.g. "variants.0.sku" → "variants")
const FIELD_TO_TAB: Record<string, TabName> = {};
for (const [tab, fields] of Object.entries(TAB_FIELDS)) {
  for (const field of fields) {
    FIELD_TO_TAB[field] = tab as TabName;
  }
}

// ─── Page ───────────
export default function AddProductPage() {
  const [activeTab, setActiveTab]   = useState<TabName>("basic");
  const [imageFiles, setImageFiles] = useState<{ file: File; url: string }[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  // ── Form setup ────
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      brandId: "",
      categoryId: "",
      status: "DRAFT",
      featured: false,
      images: [],
      video: null,
      manualFile: null,
      weight: 0,
      warranty: "",
      tags: [],
      metaKeywords: [],
      faqs: [],
      minOrderQty: 1,
      maxOrderQty: 10,
      seoTitle: "",
      seoDescription: "",
      dimensions: { unit: "cm", width: 0, height: 0, length: 0 },
      specifications: { fitType: "", occasion: "", closureType: "", soleMaterial: "", upperMaterial: "" },
      variants: [],
    },
  });

  // ── Auto-generate slug from name ────────────────────────────────────────────
  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    form.setValue("slug", slug);
  };

  // ── Validate all → jump to first error field, or show summary ───────────────
  const handleSubmitWithValidation = async (status?: "DRAFT") => {
    if (status) form.setValue("status", status);

    const isValid = await form.trigger();

    if (!isValid) {
      const errors = form.formState.errors;
      const flatKeys: string[] = [];

      const flatten = (obj: any, prefix = "") => {
        for (const key of Object.keys(obj)) {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          if (obj[key]?.message || obj[key]?.type) {
            flatKeys.push(fullKey);
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            flatten(obj[key], fullKey);
          }
        }
      };
      flatten(errors);

      if (flatKeys.length > 0) {
        const firstKey = flatKeys[0];
        const rootKey  = firstKey.split(".")[0];
        const targetTab = FIELD_TO_TAB[rootKey] || FIELD_TO_TAB[firstKey] || "basic";
        setActiveTab(targetTab);

        setTimeout(() => {
          const el = fieldRefs.current[firstKey] || fieldRefs.current[rootKey];
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
          el?.focus?.();
        }, 120);
      }
      return;
    }

    setShowSummary(true);
  };

  // ── Final submit (API call) ─
  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    data.images.forEach((file: File) => formData.append("images", file));
    if (data.video)      formData.append("video", data.video);
    if (data.manualFile) formData.append("manualFile", data.manualFile);

    formData.append("name",            data.name);
    formData.append("slug",            data.slug);
    formData.append("shortDescription",data.shortDescription);
    formData.append("fullDescription", data.fullDescription);
    formData.append("brandId",         data.brandId);
    formData.append("categoryId",      data.categoryId);
    formData.append("status",          data.status);
    formData.append("featured",        String(data.featured));
    formData.append("weight",          String(data.weight));
    formData.append("warranty",        data.warranty);
    formData.append("minOrderQty",     String(data.minOrderQty));
    formData.append("maxOrderQty",     String(data.maxOrderQty));
    formData.append("seoTitle",        data.seoTitle);
    formData.append("seoDescription",  data.seoDescription);
    formData.append("tags",            JSON.stringify(data.tags));
    formData.append("metaKeywords",    JSON.stringify(data.metaKeywords));
    formData.append("faqs",            JSON.stringify(data.faqs));
    formData.append("variants",        JSON.stringify(data.variants));
    formData.append("dimensions",      JSON.stringify(data.dimensions));
    formData.append("specifications",  JSON.stringify(data.specifications));

    console.log("Submitting product:", data);
    // TODO: await yourApiCall(formData);
  };

  // ── Tab navigation helpers ──
  const currentIndex = TAB_ORDER.indexOf(activeTab);
  const goNext     = () => { if (currentIndex < TAB_ORDER.length - 1) setActiveTab(TAB_ORDER[currentIndex + 1]); };
  const goPrevious = () => { if (currentIndex > 0) setActiveTab(TAB_ORDER[currentIndex - 1]); };

  // ── Handle edit from summary 
  const handleEditFromSummary = (tab: string) => {
    setShowSummary(false);
    setActiveTab(tab as TabName);
  };

  // ── Summary view ──
  if (showSummary) {
    return (
      <ProductSummary
        data={form.getValues()}
        imageFiles={imageFiles}
        onEdit={handleEditFromSummary}
        onConfirm={() => form.handleSubmit(onSubmit)()}
      />
    );
  }

  // ── Main form view 
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title mainTitle="Add New Product" />
        <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabName)}>

            {/* Free tab navigation */}
            <TabsList className="grid w-full grid-cols-7">
              {TAB_ORDER.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Each tab is its own component */}
            <BasicInfoTab      form={form} fieldRefs={fieldRefs} onNameChange={handleNameChange} />
            <DetailsTab        form={form} />
            <SpecificationsTab  form={form} />
            <SeoTab            form={form} />
            <MediaTab          form={form} fieldRefs={fieldRefs} imageFiles={imageFiles} setImageFiles={setImageFiles} />
            <FaqTab             form={form} />
            <VariantsTab       form={form} fieldRefs={fieldRefs} />

          </Tabs>

          {/* Navigation buttons */}
          <div className="flex justify-between gap-4">
            <Button type="button" variant="outline" disabled={currentIndex === 0} onClick={goPrevious}>
              Previous
            </Button>

            {currentIndex < TAB_ORDER.length - 1 ? (
              <Button type="button" onClick={goNext}>Next</Button>
            ) : (
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => handleSubmitWithValidation("DRAFT")}>
                  Save as Draft
                </Button>
                <Button type="button" onClick={() => handleSubmitWithValidation()}>
                  Create Product
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}