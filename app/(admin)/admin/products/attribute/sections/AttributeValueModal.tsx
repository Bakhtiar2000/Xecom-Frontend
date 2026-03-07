"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { attributeValueSchema, TAttributeValueFormData } from "@/lib/attribute.schema";
import {
  useAddAttributeValueMutation,
  useUpdateAttributeValueMutation,
} from "@/redux/features/product/attribute.api";

import { TAttribute, TAttributeValue } from "@/types/product.type";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface AttributeValueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attribute?: TAttribute | null;
  attributeValue?: TAttributeValue | null;
}
export default function AttributeValueModal({
  open,
  onOpenChange,
  attribute,
  attributeValue,
}: AttributeValueModalProps) {
  const isEditMode = !!attributeValue;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<TAttributeValueFormData>({
    resolver: zodResolver(attributeValueSchema),
    defaultValues: {
      value: "",
      hexCode: "",
    },
  });

  const [addAttributeValue, { isLoading: isAdding }] = useAddAttributeValueMutation();
  const [updateAttributeValue, { isLoading: isUpdating }] = useUpdateAttributeValueMutation();

  const isColorAttribute =
    attribute?.name?.toLowerCase() === "color" ||
    attribute?.name?.toLowerCase() === "colour" ||
    attribute?.name?.toLowerCase() === "colur";

  // Set values in Edit mode
  useEffect(() => {
    if (isEditMode && attributeValue && open) {
      setValue("value", attributeValue.value);
      setValue("hexCode", attributeValue.hexCode || "");
    } else if (!open) {
      reset();
    }
  }, [attributeValue, open, isEditMode, setValue, reset]);

  const onSubmit = async (data: TAttributeValueFormData) => {
    try {
      if (!attribute?.id && !isEditMode) {
        toast.error("Attribute ID is required");
        return;
      }

      const payload: any = { value: data.value };
      if (isColorAttribute && data.hexCode) {
        payload.hexCode = data.hexCode;
      }

      if (isEditMode && attributeValue) {
        await updateAttributeValue({
          id: attributeValue.id,
          data: { id: attributeValue.id, ...payload },
        }).unwrap();

        toast.success("Attribute value updated successfully");
      } else {
        await addAttributeValue({
          attributeId: attribute!.id,
          ...payload,
        }).unwrap();

        toast.success("Attribute value added successfully");
      }

      onOpenChange(false);
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to save attribute value");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Attribute Value" : "Add Attribute Value"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? `Update the attribute value ${isColorAttribute ? "and hex code below " : ""}`
              : `Enter a new attribute value ${isColorAttribute ? "and hex code below " : ""}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">
                Attribute Value <span className="text-destructive">*</span>
              </Label>
              <Input id="value" placeholder="e.g. Red, Large" {...register("value")} />
              {errors.value && <p className="text-destructive text-sm">{errors.value.message}</p>}
            </div>

            {isColorAttribute && (
              <div>
                <Label htmlFor="hexCode">Hex Code</Label>
                <div className="relative">
                  <Input
                    id="hexCode"
                    placeholder="#ffffff"
                    className="pl-14"
                    {...register("hexCode")}
                  />
                  <Input
                    type="color"
                    className="absolute top-0 left-0 h-full w-12 cursor-pointer border-r"
                    value={watch("hexCode") || "#000000"}
                    onChange={(e) => setValue("hexCode", e.target.value)}
                  />
                </div>
                {errors.hexCode && (
                  <p className="text-destructive mt-1 text-sm">{errors.hexCode.message}</p>
                )}
              </div>
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
