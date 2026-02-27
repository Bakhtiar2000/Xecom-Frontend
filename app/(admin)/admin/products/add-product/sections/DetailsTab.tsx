"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/lib/productSchema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";

interface DetailsTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function DetailsTab({ form }: DetailsTabProps) {
  const [tagInput, setTagInput] = useState("");

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

  return (
    <TabsContent value="details" className="space-y-4">
      <Card className="py-5">
        <CardHeader className="bg-muted/30 border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-5 w-1 rounded-full" />
            <CardTitle className="text-base font-semibold">Product Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.9"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
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
                  <FormLabel>Warranty *</FormLabel>
                  <FormControl>
                    <Input placeholder="6 Months Manufacturing Warranty" {...field} />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />
          </div>

          {/* Dimensions */}
          <div className="space-y-2">
            <FormLabel>Dimensions (length , width , height) *</FormLabel>
            <div className="grid grid-cols-3 gap-4">
              {(["width", "height", "length"] as const).map((dim) => (
                <FormField
                  key={dim}
                  control={form.control}
                  name={`dimensions.${dim}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage className="text-danger" />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

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

          {/* Order Qty */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
