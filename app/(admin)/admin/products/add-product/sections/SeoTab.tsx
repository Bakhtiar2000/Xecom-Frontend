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
import { Plus, X } from "lucide-react";

interface SeoTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function SeoTab({ form }: SeoTabProps) {
  const [keywordInput, setKeywordInput] = useState("");

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
    <TabsContent value="seo" className="space-y-4">
      <Card className="py-5">
        <CardHeader className="bg-muted/30 border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-5 w-1 rounded-full" />
            <CardTitle className="text-base font-semibold">SEO Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
    </TabsContent>
  );
}
