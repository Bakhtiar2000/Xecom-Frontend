"use client";

import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/lib/productSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

interface SpecificationsTabProps {
  form: UseFormReturn<ProductFormData>;
}

const SPEC_FIELDS = [
  { name: "specifications.fitType",       placeholder: "Regular",           label: "Fit Type *" },
  { name: "specifications.occasion",      placeholder: "Sports / Casual",   label: "Occasion *" },
  { name: "specifications.closureType",   placeholder: "Lace-Up",           label: "Closure Type *" },
  { name: "specifications.soleMaterial",  placeholder: "Rubber",            label: "Sole Material *" },
  { name: "specifications.upperMaterial", placeholder: "Breathable Mesh",   label: "Upper Material *" },
] as const;

export default function SpecificationsTab({ form }: SpecificationsTabProps) {
  return (
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
            {SPEC_FIELDS.map(({ name, placeholder, label }) => (
              <FormField key={name} control={form.control} name={name} render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )} />
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}