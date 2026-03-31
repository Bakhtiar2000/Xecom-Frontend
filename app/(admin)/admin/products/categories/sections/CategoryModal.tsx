"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { categorySchema, TCategoryFormData } from "@/lib/category.schema";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/product/category.api";
import { TCategory } from "@/types/product.type";
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
import { TargetAudience } from "@/constants/enum";

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: TCategory | null;
}

export function CategoryModal({ open, onOpenChange, category }: CategoryModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const isEditMode = !!category;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TCategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parentId: null,
      sortOrder: 0,
      targetAudience: [],
    },
  });

  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  // Fetch categories for parent dropdown
  const { data: categoriesData } = useGetAllCategoriesQuery([
    { name: "fields", value: "name" },
    { name: "fields", value: "id" },
  ]);

  const categories = categoriesData?.data || [];

  // Load category data when editing
  useEffect(() => {
    if (category && open) {
      setValue("name", category.name);
      setValue("slug", category.slug);
      setValue("description", category.description || "");
      setValue("parentId", category.parentId || null);
      setValue("sortOrder", category.sortOrder || 0);
      setValue("targetAudience", category.targetAudience || []);
      if (category.imageUrl) {
        setImagePreview(category.imageUrl);
      }
    } else if (!open) {
      reset();
      setImagePreview(null);
    }
  }, [category, open, setValue, reset]);

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

  const onSubmit = async (data: TCategoryFormData) => {
    console.log("RAW FORM DATA:", data);
    console.log("targetAudience:", data.targetAudience);

    try {
      const formData = new FormData();

      // Prepare JSON payload
      const payload: any = {
        name: data.name,
        slug: data.slug,
        description: data.description || undefined,
        parentId: data.parentId || null,
        sortOrder: data.sortOrder,
        targetAudience: data.targetAudience,
      };

      // Include id only for update requests
      if (isEditMode && category) {
        payload.id = category.id;
      }

      // Append JSON data as a single field
      formData.append("text", JSON.stringify(payload));
      console.log("PAYLOAD BEING SENT:", JSON.stringify(payload));

      // Append file if present
      if (data.file) {
        formData.append("file", data.file);
      }

      let result;
      if (isEditMode && category) {
        result = await updateCategory({
          id: category.id,
          data: formData,
        }).unwrap();
        toast.success(result?.message || "Category updated successfully");
      } else {
        result = await addCategory(formData).unwrap();
        toast.success(result?.message || "Category added successfully");
      }

      onOpenChange(false);
      reset();
      setImagePreview(null);
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Failed to save category";
      toast.error(errorMessage);
    }
  };

  const parentIdValue = watch("parentId");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Category" : "Add Category"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the category details below"
              : "Fill in the details to create a new category"}
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
              placeholder="Brief description of the category"
              rows={3}
            />
            {errors.description && (
              <p className="text-destructive text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Parent Category */}
            <div>
              <Label htmlFor="parentId">Parent Category</Label>
              <Select
                value={parentIdValue || "none"}
                onValueChange={(value) => setValue("parentId", value === "none" ? null : value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Top Level)</SelectItem>
                  {categories
                    .filter((cat: TCategory) => cat.id !== category?.id)
                    .map((cat: TCategory) => (
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
            {/* Sort Order */}
            <div>
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                {...register("sortOrder", { valueAsNumber: true })}
                placeholder="0"
                min="0"
              />
              {errors.sortOrder && (
                <p className="text-destructive text-sm">{errors.sortOrder.message}</p>
              )}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <Label>Target Audience</Label>
            <div className="mt-1 flex gap-5">
              {Object.values(TargetAudience).map((audience) => {
                const current = watch("targetAudience") || [];
                const isChecked = current.includes(audience);
                return (
                  <div key={audience} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={audience}
                      checked={isChecked}
                      onChange={(e) => {
                        const current = watch("targetAudience") || [];
                        const updated = e.target.checked
                          ? [...current, audience]
                          : current.filter((a) => a !== audience);
                        setValue("targetAudience", updated, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                    />
                    <label htmlFor={audience}>{audience}</label>
                  </div>
                );
              })}
            </div>
            {errors.targetAudience && (
              <p className="text-destructive text-sm">{errors.targetAudience.message}</p>
            )}
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
  );
}
