"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { brandSchema, TBrandFormData } from "@/lib/brand.schema";
import {
  useAddBrandMutation,
  useUpdateBrandMutation,
  useGetAllBrandsQuery,
} from "@/redux/features/product/brand.api";
import { TBrand } from "@/types/product.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/custom/ImageUpload";

interface BrandsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand?: TBrand | null;
}

export default function BrandModal({ open, onOpenChange, brand }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const isEditMode = !!brand;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TBrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parentId: null,
    },
  });
  const [addBrand, { isLoading: isAdding }] = useAddBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  // Fetch brands for parent dropdown
  const { data: brandsData } = useGetAllBrandsQuery([
    { name: "fields", value: "name" },
    { name: "fields", value: "id" },
  ]);

  const categories = brandsData?.data || [];

  // Load brand data when editing
  useEffect(() => {
    if (brand && open) {
      setValue("name", brand.name);
      setValue("slug", brand.slug);
      setValue("description", brand.description || "");
      setValue("parentId", brand.parentId || null);
      if (brand.logoUrl) {
        setImagePreview(brand.logoUrl);
      }
    } else if (!open) {
      reset();
      setImagePreview(null);
    }
  }, [brand, open, setValue, reset]);

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue("name", name);

    // Auto-generate slug only if not in edit mode
    if (!isEditMode) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setValue("slug", slug);
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setValue("file", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue("file", undefined);
      setImagePreview(null);
    }
  };

  // const onSubmit = async (data: TBrandFormData) => {
  //     try {
  //         const formData = new FormData();
  //         formData.append("name", data.name);
  //         formData.append("slug", data.slug);
  //         if (data.description) formData.append("description", data.description);
  //         if (data.parentId) formData.append("parentId", data.parentId);
  //         if (data.file) formData.append("file", data.file);

  //         let result;
  //         if (isEditMode && brand) {
  //             result = await updateBrand({ id: brand.id, data: formData }).unwrap();
  //             toast.success(result?.message || "Brand updated successfully");
  //         } else {
  //             result = await addBrand(formData).unwrap();
  //             toast.success(result?.message || "Brand added successfully");
  //         }

  //         onOpenChange(false);
  //         reset();
  //         setImagePreview(null);
  //     } catch (error: any) {
  //         const errorMessage = error?.data?.message || error?.message || "Failed to save Brand";
  //         toast.error(errorMessage);
  //     }
  // };

  const onSubmit = async (data: TBrandFormData) => {
    try {
      const formData = new FormData();

      const payload = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        parentId: data.parentId,
      };

      formData.append("text", JSON.stringify(payload));

      if (data.file) {
        formData.append("file", data.file);
      }

      let result;
      if (isEditMode && brand) {
        result = await updateBrand({ id: brand.id, data: formData }).unwrap();
        toast.success(result?.message || "Brand updated successfully");
      } else {
        result = await addBrand(formData).unwrap();
        toast.success(result?.message || "Brand added successfully");
      }

      onOpenChange(false);
      reset();
      setImagePreview(null);
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Failed to save Brand";
      toast.error(errorMessage);
    }
  };

  const parentIdValue = watch("parentId");

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Brand" : "Add Brand"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the brand details below"
                : "Fill in the details to create a new brand"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Category Image */}
            <div className="flex justify-center">
              <ImageUpload value={imagePreview} onChange={handleImageChange} size="lg" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  onChange={handleNameChange}
                  placeholder="e.g., Men's Shoes"
                />
                {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
              </div>

              {/* Slug Field */}
              <div>
                <Label htmlFor="slug">
                  Slug <span className="text-destructive">*</span>
                </Label>
                <Input id="slug" {...register("slug")} placeholder="e.g., mens-shoes" />
                {errors.slug && <p className="text-destructive text-sm">{errors.slug.message}</p>}
              </div>
            </div>

            {/* Description Field */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief description of the brand"
                rows={3}
              />
              {errors.description && (
                <p className="text-destructive text-sm">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Parent Category */}
              <div>
                <Label htmlFor="parentId">Parent Brand</Label>
                <Select
                  value={parentIdValue || "none"}
                  onValueChange={(value) => setValue("parentId", value === "none" ? null : value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select parent brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {categories
                      .filter((cat: TBrand) => cat.id !== brand?.id)
                      .map((cat: TBrand) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.parentId && (
                  <p className="text-destructive text-sm">{errors.parentId.message}</p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isAdding || isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isAdding || isUpdating}>
                {isAdding || isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
