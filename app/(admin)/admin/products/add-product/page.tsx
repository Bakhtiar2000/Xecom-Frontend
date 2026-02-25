"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/lib/productSchema";
import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { ImageUpload } from "@/components/custom/ImageUpload";
import { VideoUpload } from "@/components/custom/VideoUpload";
import { MultiImageUpload } from "@/components/custom/MultipleImageUpload";

export default function AddProductPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [imageFiles, setImageFiles] = useState<{ file: File; url: string }[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const tabOrder = [
    "basic",
    "details",
    "specifications",
    "seo",
    "media",
    "faq",
  ] as const;

  // ✅ FIX 1: Added videoUrl and manualUrl to media tab fields
  const tabFields: Record<
    (typeof tabOrder)[number],
    (keyof ProductFormData | string)[]
  > = {
    basic: [
      "name",
      "slug",
      "shortDescription",
      "fullDescription",
      "brandId",
      "categoryId",
      "status",
      "featured",
    ],
    details: [
      "weight",
      "warranty",
      "dimensions.width",
      "dimensions.height",
      "dimensions.length",
      "tags",
      "minOrderQty",
      "maxOrderQty",
      "isBundle",
    ],
    specifications: [
      "specifications.fitType",
      "specifications.occasion",
      "specifications.closureType",
      "specifications.soleMaterial",
      "specifications.upperMaterial",
    ],
    seo: ["seoTitle", "seoDescription", "metaKeywords"],
    // ✅ FIX: videoUrl and manualUrl are now included so they get validated on Next
    media: ["images", "videoUrl", "manualUrl"],
    faq: ["faqData"],
  };

  const currentIndex = tabOrder.indexOf(activeTab as any);

  const goNext = async () => {
    const fields = tabFields[activeTab as keyof typeof tabFields];

    let isValid = true;
    for (const field of fields) {
      const result = await form.trigger(field as any);
      if (!result) isValid = false;
    }

    if (!isValid) {
      console.log("Validation errors:", form.formState.errors);
      return;
    }

    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

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
      weight: "",
      warranty: "",
      tags: [],
      metaKeywords: [],
      faqData: [],
      minOrderQty: 1,
      maxOrderQty: 100,
      isBundle: false,
      videoUrl: "",
      images: [],
      manualUrl: "",
      seoTitle: "",
      seoDescription: "",
      dimensions: {
        unit: "cm",
        width: 0,
        height: 0,
        length: 0,
      },
      specifications: {
        fitType: "",
        occasion: "",
        closureType: "",
        soleMaterial: "",
        upperMaterial: "",
      },
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();

    // Append images correctly
    data.images.forEach((file: File) => {
      formData.append("images", file);
    });

    // Append primitive fields
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("shortDescription", data.shortDescription);
    formData.append("fullDescription", data.fullDescription);
    formData.append("brandId", data.brandId);
    formData.append("categoryId", data.categoryId);
    formData.append("status", data.status);
    formData.append("featured", String(data.featured));
    formData.append("weight", String(data.weight));
    formData.append("warranty", data.warranty);
    formData.append("minOrderQty", String(data.minOrderQty));
    formData.append("maxOrderQty", String(data.maxOrderQty));
    formData.append("isBundle", String(data.isBundle));
    formData.append("videoUrl", data.videoUrl ?? "");
    formData.append("manualUrl", data.manualUrl ?? "");
    formData.append("seoTitle", data.seoTitle ?? "");
    formData.append("seoDescription", data.seoDescription ?? "");

    // Arrays & objects must be JSON stringified
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("metaKeywords", JSON.stringify(data.metaKeywords));
    formData.append("faqData", JSON.stringify(data.faqData));
    formData.append("dimensions", JSON.stringify({
      length: Number(data.dimensions.length),
      width: Number(data.dimensions.width),
      height: Number(data.dimensions.height),
      unit: data.dimensions.unit,
    }));
    formData.append("specifications", JSON.stringify({
      fitType: data.specifications.fitType,
      occasion: data.specifications.occasion,
      closureType: data.specifications.closureType,
      soleMaterial: data.specifications.soleMaterial,
      upperMaterial: data.specifications.upperMaterial,
    }));

    //  Debug — verify images are included
    console.log("Total images:", data);


  };

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    form.setValue("slug", slug);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues("tags");
      form.setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((_, i) => i !== index)
    );
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      const currentKeywords = form.getValues("metaKeywords");
      form.setValue("metaKeywords", [...currentKeywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (index: number) => {
    const currentKeywords = form.getValues("metaKeywords");
    form.setValue(
      "metaKeywords",
      currentKeywords.filter((_, i) => i !== index)
    );
  };

  const addFAQ = () => {
    const currentFAQs = form.getValues("faqData");
    form.setValue("faqData", [...currentFAQs, { question: "", answer: "" }]);
  };

  const removeFAQ = (index: number) => {
    const currentFAQs = form.getValues("faqData");
    form.setValue(
      "faqData",
      currentFAQs.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title mainTitle="Add New Product" />
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* ✅ FIX 2: Shadcn TabsTrigger disabled prop replaced with pointer-events-none
                via data attribute + className to properly lock non-active tabs visually */}
            <TabsList className="grid w-full grid-cols-6">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={
                    tab !== activeTab
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ── Basic Info Tab ── */}
            <TabsContent value="basic" className="space-y-4">
              <Card className="py-5">
                <CardHeader className="border-b bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-primary" />
                    <CardTitle className="text-base font-semibold">Basic Information</CardTitle>
                  </div>
                  <CardDescription className="text-xs mt-1 ml-3">
                    Enter the core details of your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* ✅ FIX 3: All FormField components now have control={form.control} */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Men's Casual Sneakers – Urban Flex"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleNameChange(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="mens-casual-sneakers-urban-flex"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Stylish everyday sneakers built for comfort and versatility."
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Urban Flex casual sneakers are designed for all-day wear..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brandId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="3912d37f-50e6-4160-a412-3f7dd86c3b7b">
                                Nike
                              </SelectItem>
                              <SelectItem value="brand-2">Adidas</SelectItem>
                              <SelectItem value="brand-3">Puma</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="9bd04cc8-354a-4c6d-8d44-dd1d9a720eba">
                                Men&apos;s Shoe
                              </SelectItem>
                              <SelectItem value="category-2">
                                Women&apos;s Shoe
                              </SelectItem>
                              <SelectItem value="category-3">
                                Kids Shoe
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="INACTIVE">Inactive</SelectItem>
                              <SelectItem value="DRAFT">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Featured Product
                            </FormLabel>
                            <FormDescription>
                              Display this product as featured
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Details Tab ── */}
            <TabsContent value="details" className="space-y-4">
              <Card className="py-5">
                <CardHeader className="border-b bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-primary" />
                    <CardTitle className="text-base font-semibold">Product Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input placeholder="0.9" {...field} />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="warranty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Warranty</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="6 Months Manufacturing Warranty"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Dimensions (cm)</FormLabel>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="dimensions.width"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Width"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dimensions.height"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Height"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dimensions.length"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Length"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Tags</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button type="button" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch("tags").map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minOrderQty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Order Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 1)
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxOrderQty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Order Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 100)
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="isBundle"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Bundle Product
                          </FormLabel>
                          <FormDescription>
                            Is this a bundle of multiple products?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Specifications Tab ── */}
            <TabsContent value="specifications" className="space-y-4">
              <Card className="py-5">
                <CardHeader className="border-b bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-primary" />
                    <CardTitle className="text-base font-semibold">Product Specifications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="specifications.fitType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fit Type</FormLabel>
                          <FormControl>
                            <Input placeholder="Comfort Fit" {...field} />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specifications.occasion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occasion</FormLabel>
                          <FormControl>
                            <Input placeholder="Casual & Daily Wear" {...field} />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specifications.closureType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Closure Type</FormLabel>
                          <FormControl>
                            <Input placeholder="Lace-Up" {...field} />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specifications.soleMaterial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sole Material</FormLabel>
                          <FormControl>
                            <Input placeholder="EVA Rubber" {...field} />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specifications.upperMaterial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upper Material</FormLabel>
                          <FormControl>
                            <Input placeholder="Synthetic Leather" {...field} />
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── SEO Tab ── */}
            <TabsContent value="seo" className="space-y-4">
              <Card className="py-5">
                <CardHeader className="border-b bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-primary" />
                    <CardTitle className="text-base font-semibold">SEO Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="seoTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Men's Casual Sneakers Urban Flex – Stylish & Comfortable"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Recommended: 50-60 characters
                        </FormDescription>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seoDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Shop men's casual sneakers Urban Flex..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Recommended: 150-160 characters
                        </FormDescription>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Meta Keywords</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a keyword"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addKeyword();
                          }
                        }}
                      />
                      <Button type="button" onClick={addKeyword}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch("metaKeywords").map((keyword, index) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(index)}
                            className="ml-2"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Media Tab ── */}
            <TabsContent value="media" className="space-y-4">
              <Card className="py-5">
                <CardHeader className="border-b bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-primary" />
                    <CardTitle className="text-base font-semibold">Media Files</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Images *</FormLabel>
                        <FormControl>
                          <MultiImageUpload
                            values={imageFiles}
                            onChange={(images) => {
                              setImageFiles(images);
                              // Pass just the File[] to react-hook-form
                              form.setValue("images", images.map((i) => i.file));
                            }}
                            maxFiles={8}
                            maxSizeMB={5}
                          />
                        </FormControl>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />


                  {/* Video URL — file upload, field name: videoUrl */}
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Video</FormLabel>
                        <FormControl>
                          <VideoUpload
                            value={videoPreview}
                            onChange={(file) => {
                              if (file) {
                                const url = URL.createObjectURL(file);
                                field.onChange(url);
                                setVideoPreview(url);
                              } else {
                                field.onChange("");
                                setVideoPreview(null);
                              }
                            }}
                            maxSizeMB={100}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload a product demo or walkthrough video
                        </FormDescription>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />

                  {/* Manual URL */}
                  <FormField
                    control={form.control}
                    name="manualUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manual / PDF URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/manual.pdf"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Link to the product manual or documentation PDF
                        </FormDescription>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── FAQ Tab ── */}
            <TabsContent value="faq" className="space-y-4">
              <Card className="py-5">
                <CardHeader className="border-b bg-muted/30 px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-primary" />
        <CardTitle className="text-base font-semibold">Frequently Asked Questions</CardTitle>
      </div>
      <CardDescription className="text-xs mt-1 ml-3">
        Add common questions and answers about your product
      </CardDescription>
    </CardHeader>
                <CardContent className="space-y-4">
                  {form.watch("faqData").map((_, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">FAQ {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFAQ(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <FormField
                        control={form.control}
                        name={`faqData.${index}.question`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Are these sneakers suitable for long hours of wear?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`faqData.${index}.answer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Yes, the cushioned sole and breathable lining..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFAQ}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={currentIndex === 0}
              onClick={goPrevious}
            >
              Previous
            </Button>

            {currentIndex < tabOrder.length - 1 ? (
              <Button type="button" onClick={goNext}>
                Next
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.setValue("status", "DRAFT");
                    form.handleSubmit(onSubmit)();
                  }}
                >
                  Save as Draft
                </Button>
                <Button type="submit">Create Product</Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}