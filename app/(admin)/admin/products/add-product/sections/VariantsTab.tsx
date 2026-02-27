"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";

interface VariantsTabProps {
  form: UseFormReturn<ProductFormData>;
  fieldRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

export default function VariantsTab({ form, fieldRefs }: VariantsTabProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  return (
    <TabsContent value="variants" className="space-y-4">
      <Card className="py-5">
        <CardHeader className="border-b bg-muted/30 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-primary" />
            <CardTitle className="text-base font-semibold">Product Variants</CardTitle>
          </div>
          <CardDescription className="text-xs mt-1 ml-3">
            Add SKU, pricing and stock for each variant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          {form.formState.errors.variants?.message && (
            <p className="text-sm text-danger">{form.formState.errors.variants.message}</p>
          )}

          {fields.map((variantField, index) => (
            <div
              key={variantField.id}
              className="border rounded-lg p-4 space-y-4"
              ref={(el) => { if (index === 0) fieldRefs.current["variants"] = el; }}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Variant {index + 1}</h4>
                <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name={`variants.${index}.sku`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU *</FormLabel>
                    <FormControl><Input placeholder="AFP-WHITE-S" {...field} /></FormControl>
                    <FormMessage className="text-danger" />
                  </FormItem>
                )} />

                <FormField control={form.control} name={`variants.${index}.price`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="89.99" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage className="text-danger" />
                  </FormItem>
                )} />

                <FormField control={form.control} name={`variants.${index}.cost`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="55.00" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage className="text-danger" />
                  </FormItem>
                )} />

                <FormField control={form.control} name={`variants.${index}.stockQuantity`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage className="text-danger" />
                  </FormItem>
                )} />

                <FormField control={form.control} name={`variants.${index}.stockAlertThreshold`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Alert Threshold *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage className="text-danger" />
                  </FormItem>
                )} />

                <FormField control={form.control} name={`variants.${index}.isDefault`} render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Default Variant</FormLabel>
                      <FormDescription>Set as the default selected variant</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name={`variants.${index}.attributeValueIds`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Attribute Value IDs *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="uuid-1, uuid-2"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) => {
                        const ids = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                        field.onChange(ids);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Enter attribute value UUIDs separated by commas</FormDescription>
                  <FormMessage className="text-danger" />
                </FormItem>
              )} />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ sku: "", price: 0, cost: 0, stockQuantity: 0, stockAlertThreshold: 0, isDefault: false, attributeValueIds: [] })}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />Add Variant
          </Button>

        </CardContent>
      </Card>
    </TabsContent>
  );
}