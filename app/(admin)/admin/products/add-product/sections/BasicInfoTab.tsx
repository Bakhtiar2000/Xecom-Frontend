"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

interface BasicInfoTabProps {
  form: UseFormReturn<ProductFormData>;
  fieldRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  onNameChange: (name: string) => void;
}

export default function BasicInfoTab({ form, fieldRefs, onNameChange }: BasicInfoTabProps) {
  return (
    <TabsContent value="basic" className="space-y-4">
      <Card className="py-5">
        <CardHeader className="bg-muted/30 border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-5 w-1 rounded-full" />
            <CardTitle className="text-base font-semibold">Basic Information</CardTitle>
          </div>
          <CardDescription className="mt-1 ml-3 text-xs">
            Enter the core details of your product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input
                      ref={(el) => {
                        fieldRefs.current["name"] = el;
                      }}
                      placeholder="Men's Casual Sneakers – Urban Flex"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onNameChange(e.target.value);
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
                      ref={(el) => {
                        fieldRefs.current["slug"] = el;
                      }}
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
                    ref={(el) => {
                      fieldRefs.current["shortDescription"] = el;
                    }}
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
                    ref={(el) => {
                      fieldRefs.current["fullDescription"] = el;
                    }}
                    placeholder="Urban Flex casual sneakers are designed for all-day wear..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-danger" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        ref={(el) => {
                          fieldRefs.current["brandId"] = el;
                        }}
                      >
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3912d37f-50e6-4160-a412-3f7dd86c3b7b">Nike</SelectItem>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        ref={(el) => {
                          fieldRefs.current["categoryId"] = el;
                        }}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="9bd04cc8-354a-4c6d-8d44-dd1d9a720eba">
                        Men&apos;s Shoe
                      </SelectItem>
                      <SelectItem value="category-2">Women&apos;s Shoe</SelectItem>
                      <SelectItem value="category-3">Kids Shoe</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
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
                    <FormLabel className="text-base">Featured Product</FormLabel>
                    <FormDescription>Display this product as featured</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
