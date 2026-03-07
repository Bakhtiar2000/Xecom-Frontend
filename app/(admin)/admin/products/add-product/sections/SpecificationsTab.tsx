"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/lib/productSchema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";

interface SpecificationsTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function SpecificationsTab({ form }: SpecificationsTabProps) {
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");

  const specifications = form.watch("specifications") || {};

  const addSpecification = () => {
    if (fieldName.trim() && fieldValue.trim()) {
      form.setValue("specifications", {
        ...specifications,
        [fieldName.trim()]: fieldValue.trim(),
      });
      setFieldName("");
      setFieldValue("");
    }
  };

  const removeSpecification = (key: string) => {
    const updated = { ...specifications };
    delete updated[key];
    form.setValue("specifications", updated);
  };

  const updateSpecification = (key: string, value: string) => {
    form.setValue("specifications", {
      ...specifications,
      [key]: value,
    });
  };
  return (
    <TabsContent value="specifications" className="space-y-4">
      <Card className="rounded-lg pt-0 pb-4 lg:pb-6">
        <CardHeader className="bg-success text-success-foreground rounded-t-lg px-4 py-4 lg:px-6">
          <div className="mt-2 flex items-center gap-2 text-xl">
            <div className="bg-primary h-5 w-1 rounded-full"></div>
            <CardTitle className="font-semibold">Product Specifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-4 lg:px-6">
          {/* Add new specification */}
          <div className="space-y-2">
            <FormLabel>Add Specification</FormLabel>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
              <Input
                placeholder="Field name (e.g., Fit Type / Material)"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="md:col-span-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSpecification();
                  }
                }}
              />
              <Input
                placeholder="Value (e.g., Regular / Leather)"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                className="md:col-span-7"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSpecification();
                  }
                }}
              />
              <Button type="button" onClick={addSpecification} className="md:col-span-1">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Display existing specifications */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(specifications).length === 0 ? (
              <p className="text-muted-foreground text-sm">No specifications added yet.</p>
            ) : (
              Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="grid flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                    <div>
                      <span className="text-muted-foreground text-xs">Field</span>
                      <p className="font-medium">{key}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Value</span>
                      <Input
                        value={value}
                        onChange={(e) => updateSpecification(key, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecification(key)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
