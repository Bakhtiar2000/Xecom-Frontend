"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { attributeSchema, TAttributeFormData } from "@/lib/attribute.schema";
import {
  useGetAllAttributesQuery,
  useAddAttributeMutation,
  useUpdateAttributeMutation,
} from "@/redux/features/product/attribute.api";

import { TAttribute, TAttributeValue } from "@/types/product.type";

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

import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface AttributesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attribute?: TAttribute | null;
}

export default function AttributeModal({ open, onOpenChange, attribute }) {
  const isEditMode = !!attribute;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TAttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
    },
  });

  const [addAttribute, { isLoading: isAdding }] = useAddAttributeMutation();
  const [updateAttribute, { isLoading: isUpdating }] = useUpdateAttributeMutation();

  const { data: attributesData } = useGetAllAttributesQuery([
    { name: "fields", value: "name" },
    { name: "fields", value: "id" },
  ]);

  const attributes = attributesData?.data || [];

  useEffect(() => {
    if (attribute && open) {
      setValue("name", attribute.name);
    } else if (!open) {
      reset();
    }
  }, [attribute, open, setValue, reset]);

  const onSubmit = async (data: TAttributeFormData) => {
    try {
      let result;

      if (isEditMode && attribute) {
        result = await updateAttribute({
          id: attribute.id,
          data: { id: attribute.id, name: data.name },
        }).unwrap();

        toast.success(result?.message || "Attribute updated successfully");
      } else {
        result = await addAttribute({
          name: data.name,
        }).unwrap();

        toast.success(result?.message || "Attribute added successfully");
      }

      onOpenChange(false);
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to save Attribute");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Attribute" : "Add Attribute"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the attribute name below"
                : "Enter a name to create a new attribute"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Attribute Name */}
            <div>
              <Label htmlFor="name">
                Attribute Name <span className="text-destructive">*</span>
              </Label>
              <Input id="name" placeholder="e.g. Color, Size, Material" {...register("name")} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
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
