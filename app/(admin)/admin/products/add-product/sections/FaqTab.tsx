"use client";

import { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { ProductFormData } from "@/lib/productSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";

interface FaqTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function FaqTab({ form }: FaqTabProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  return (
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

          {form.formState.errors.faqs?.root && (
            <p className="text-sm text-danger">{form.formState.errors.faqs.root.message}</p>
          )}
          {form.formState.errors.faqs?.message && (
            <p className="text-sm text-danger">{form.formState.errors.faqs.message}</p>
          )}

          {fields.map((faqField, index) => (
            <div key={faqField.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">FAQ {index + 1}</h4>
                <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <FormField control={form.control} name={`faqs.${index}.question`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Question *</FormLabel>
                  <FormControl>
                    <Input placeholder="Are these sneakers suitable for long hours of wear?" {...field} />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )} />

              <FormField control={form.control} name={`faqs.${index}.answer`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Yes, the cushioned sole and breathable lining..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )} />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ question: "", answer: "" })}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />Add FAQ
          </Button>

        </CardContent>
      </Card>
    </TabsContent>
  );
}