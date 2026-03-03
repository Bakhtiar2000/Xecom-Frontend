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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { MultiImageUpload } from "@/components/custom/MultipleImageUpload";
import { VideoUpload } from "@/components/custom/VideoUpload";

interface MediaTabProps {
  form: UseFormReturn<ProductFormData>;
  fieldRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  imageFiles: { file: File; url: string }[];
  setImageFiles: React.Dispatch<React.SetStateAction<{ file: File; url: string }[]>>;
}

export default function MediaTab({ form, fieldRefs, imageFiles, setImageFiles }: MediaTabProps) {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [manualFileName, setManualFileName] = useState<string | null>(null);

  return (
    <TabsContent value="media" className="space-y-4">
      <Card className="rounded-lg pt-0 pb-4 lg:pb-6">
        <CardHeader className="bg-success text-success-foreground rounded-t-lg px-4 py-4 lg:px-6">
          <div className="mt-2 flex items-center gap-2 text-xl">
            <div className="bg-primary h-5 w-1 rounded-full"></div>
            <CardTitle className="font-semibold">Media Files</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-4 lg:px-6">
          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Images *</FormLabel>
                <FormControl>
                  <div
                    ref={(el) => {
                      fieldRefs.current["images"] = el;
                    }}
                  >
                    <MultiImageUpload
                      values={imageFiles}
                      onChange={(images) => {
                        setImageFiles(images);
                        form.setValue(
                          "images",
                          images.map((i) => i.file)
                        );
                      }}
                      maxFiles={8}
                      maxSizeMB={5}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-danger" />
              </FormItem>
            )}
          />

          {/* Video */}
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Video</FormLabel>
                <FormControl>
                  <VideoUpload
                    value={videoPreview}
                    onChange={(file) => {
                      if (file) {
                        const url = URL.createObjectURL(file);
                        field.onChange(file);
                        setVideoPreview(url);
                      } else {
                        field.onChange(null);
                        setVideoPreview(null);
                      }
                    }}
                    maxSizeMB={100}
                  />
                </FormControl>
                <FormDescription>Upload a product demo or walkthrough video</FormDescription>
                <FormMessage className="text-danger" />
              </FormItem>
            )}
          />

          {/* Manual / PDF */}
          <FormField
            control={form.control}
            name="manualFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Manual (PDF)</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 cursor-pointer">
                      <div className="border-input hover:bg-muted/50 flex items-center gap-3 rounded-md border px-3 py-2 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-muted-foreground h-5 w-5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-muted-foreground truncate text-sm">
                          {manualFileName || "Click to upload PDF or document"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          field.onChange(file);
                          setManualFileName(file ? file.name : null);
                        }}
                      />
                    </label>
                    {manualFileName && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          field.onChange(null);
                          setManualFileName(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload the product manual or documentation (PDF, DOC)
                </FormDescription>
                <FormMessage className="text-danger" />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
