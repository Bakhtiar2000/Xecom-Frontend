"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/lib/productSchema";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, X, Search, Package } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import Image from "next/image";

interface SpecificationsTabProps {
  form: UseFormReturn<ProductFormData>;
}

export default function SpecificationsTab({ form }: SpecificationsTabProps) {
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const specifications = form.watch("specifications") || {};

  // Fetch all products
  const { data: allProducts } = useGetAllProductsQuery([]);
  const products = allProducts?.data || [];
  console.log("products", products);

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

  // Filter products for dropdown - show all products
  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Get current related products array safely
  const getCurrentRelatedProducts = (): string[] => {
    return form.getValues("relatedProductIds") || [];
  };

  //  For rendering — watch triggers re-renders
  const relatedProducts: string[] = form.watch("relatedProductIds") || [];

  //  For writing — getValues reads fresh state at click time
  const toggleRelatedProduct = (productId: string) => {
    const currentProducts: string[] = form.getValues("relatedProductIds") || [];
    const isAlreadySelected = currentProducts.includes(productId);

    if (isAlreadySelected) {
      form.setValue(
        "relatedProductIds",
        currentProducts.filter((id) => id !== productId),
        { shouldDirty: true }
      );
    } else {
      form.setValue("relatedProductIds", [...currentProducts, productId], { shouldDirty: true });
    }
  };

  const removeRelatedProduct = (productId: string) => {
    const currentProducts: string[] = form.getValues("relatedProductIds") || [];
    form.setValue(
      "relatedProductIds",
      currentProducts.filter((id) => id !== productId),
      { shouldDirty: true }
    );
  };

  // Get product details by ID
  const getProductById = (productId: string) => {
    return products.find((p: any) => p.id === productId);
  };

  return (
    <TabsContent value="specifications" className="space-y-4">
      <Card className="rounded-lg pt-0 pb-4 lg:pb-6">
        <CardHeader className="bg-success text-success-foreground rounded-t-lg px-4 py-4 lg:px-6">
          <div className="mt-2 flex items-center gap-2 text-xl">
            <div className="bg-primary h-5 w-1 rounded-full"></div>
            <CardTitle className="font-semibold">Product Specifications </CardTitle>
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

      {/* Related Products Card */}
      <Card className="rounded-lg pt-0 pb-4 lg:pb-6">
        <CardHeader className="bg-success text-success-foreground rounded-t-lg px-4 py-4 lg:px-6">
          <div className="mt-2 flex items-center gap-2 text-xl">
            <div className="bg-primary h-5 w-1 rounded-full"></div>
            <CardTitle className="font-semibold">Related Products</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-4 lg:px-6">
          <div className="space-y-2">
            <FormLabel>Select Related Products</FormLabel>
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full justify-between"
              >
                <span className="text-left">
                  {relatedProducts.length === 0
                    ? "Select products..."
                    : `${relatedProducts.length} product(s) selected`}
                </span>
                <span className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </Button>

              {isDropdownOpen && (
                <div className="bg-background border-border absolute top-full left-0 z-50 mt-1 mb-1 w-full rounded-lg border shadow-lg">
                  {/* Search input */}
                  <div className="sticky top-0 border-b bg-white p-3">
                    <div className="relative">
                      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Products list */}
                  <div className="max-h-80 overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <div className="text-muted-foreground flex items-center gap-2 px-4 py-6 text-center text-sm">
                        <Package className="h-4 w-4" />
                        No products found
                      </div>
                    ) : (
                      filteredProducts.map((product: any) => {
                        const isSelected = getCurrentRelatedProducts().includes(product.id);
                        return (
                          <button
                            key={product.id}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              toggleRelatedProduct(product.id);
                            }}
                            className={`flex w-full items-center gap-3 border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-gray-100 ${
                              isSelected ? "bg-blue-50" : ""
                            }`}
                          >
                            {/* Checkbox */}
                            <div
                              className={`pointer-events-none flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                                isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="h-3 w-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>

                            {/* Product image and info */}
                            <div className="bg-muted h-10 w-10 shrink-0 overflow-hidden rounded-md border">
                              {product.images?.[0]?.imageUrl ? (
                                <Image
                                  src={product.images[0].imageUrl}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                  width={40}
                                  height={40}
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Package className="text-muted-foreground h-4 w-4" />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{product.name}</p>
                              {product.sku && (
                                <p className="text-muted-foreground truncate text-xs">
                                  SKU: {product.sku}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {relatedProducts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No related products added yet.</p>
          ) : (
            <div>
              <p className="text-muted-foreground mb-3 text-sm">Selected Products:</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((productId: string, index: number) => {
                  const product = getProductById(productId);
                  if (!product) return null;

                  return (
                    <div
                      key={`related-${productId}-${index}`}
                      className="flex flex-col items-center gap-2 rounded-lg border p-3"
                    >
                      <div className="bg-muted h-40 w-full overflow-hidden rounded-md border">
                        {product.images?.[0]?.imageUrl ? (
                          <Image
                            src={product.images[0].imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            width={100}
                            height={100}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="text-muted-foreground h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <p className="line-clamp-2 w-full text-center text-sm font-medium">
                        {product.name}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRelatedProduct(productId)}
                        className="text-destructive hover:text-destructive w-full"
                      >
                        <X className="mr-1 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
