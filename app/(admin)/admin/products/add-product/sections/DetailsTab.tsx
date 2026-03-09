"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/lib/productSchema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, X, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ProductWeightUnit, ProductDimensionUnit } from "@/constants/enum";

interface DetailsTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function DetailsTab({ form }: DetailsTabProps) {
  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  const addTag = () => {
    if (tagInput.trim()) {
      form.setValue("tags", [...form.getValues("tags"), tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (i: number) =>
    form.setValue(
      "tags",
      form.getValues("tags").filter((_, idx) => idx !== i)
    );

  const addKeyword = () => {
    if (keywordInput.trim()) {
      form.setValue("metaKeywords", [...form.getValues("metaKeywords"), keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (i: number) =>
    form.setValue(
      "metaKeywords",
      form.getValues("metaKeywords").filter((_, idx) => idx !== i)
    );

  return (
    <TabsContent value="details" className="space-y-4">
      <Card className="rounded-lg pt-0 pb-4 lg:pb-6">
        <CardHeader className="bg-success text-success-foreground rounded-t-lg px-4 py-4 lg:px-6">
          <div className="mt-2 flex items-center gap-2 text-xl">
            <div className="bg-primary h-5 w-1 rounded-full"></div>
            <CardTitle className="font-semibold">Product Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Weight with inline unit */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.9"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        className="pr-16"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground absolute top-0 right-0 flex h-full cursor-pointer items-center gap-1 px-3 text-sm transition-colors"
                          >
                            {form.watch("weightUnit")}
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 p-1" align="end">
                          <div className="flex flex-col">
                            {Object.values(ProductWeightUnit).map((unit) => (
                              <button
                                key={unit}
                                type="button"
                                onClick={() => form.setValue("weightUnit", unit)}
                                className={`hover:bg-accent rounded px-2 py-1.5 text-left text-sm transition-colors ${
                                  form.watch("weightUnit") === unit ? "bg-accent font-medium" : ""
                                }`}
                              >
                                {unit}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />

            {/* Dimensions with shared inline unit */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-3 gap-4">
                {(["length", "width", "height"] as const).map((dim) => (
                  <FormField
                    key={dim}
                    control={form.control}
                    name={`dimensions.${dim}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dim.charAt(0).toUpperCase() + dim.slice(1)} *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              step="0.01"
                              placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              className="pr-20"
                            />
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="text-muted-foreground hover:text-foreground absolute top-0 right-0 flex h-full cursor-pointer items-center gap-1 px-3 text-sm transition-colors"
                                >
                                  {form.watch("dimensions.unit")}
                                  <ChevronDown className="h-3 w-3" />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-32 p-1" align="end">
                                <div className="flex flex-col">
                                  {Object.values(ProductDimensionUnit).map((unit) => (
                                    <button
                                      key={unit}
                                      type="button"
                                      onClick={() => form.setValue("dimensions.unit", unit)}
                                      className={`hover:bg-accent rounded px-2 py-1.5 text-left text-sm transition-colors ${
                                        form.watch("dimensions.unit") === unit
                                          ? "bg-accent font-medium"
                                          : ""
                                      }`}
                                    >
                                      {unit}
                                    </button>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </FormControl>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="warranty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty *</FormLabel>
                  <FormControl>
                    <Input placeholder="6 Months Manufacturing Warranty" {...field} />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minOrderQty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Order Quantity *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
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
                  <FormLabel>Maximum Order Quantity *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 10)}
                    />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />

            {/* Tags */}
            <div className="space-y-2">
              <FormLabel>Tags *</FormLabel>
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
              {form.formState.errors.tags && (
                <p className="text-danger text-sm">{form.formState.errors.tags.message}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {form.watch("tags").map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                    <button type="button" onClick={() => removeTag(index)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="AirFlex Pro Running Sneakers - Lightweight Sports Shoes"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Recommended: 50-60 characters</FormDescription>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seoDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Buy premium quality AirFlex Pro running sneakers..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Recommended: 150-160 characters</FormDescription>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />

            {/* Meta Keywords */}
            <div className="space-y-2">
              <FormLabel>Meta Keywords *</FormLabel>
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
              {form.formState.errors.metaKeywords && (
                <p className="text-danger text-sm">{form.formState.errors.metaKeywords.message}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {form.watch("metaKeywords").map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                    <button type="button" onClick={() => removeKeyword(index)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
