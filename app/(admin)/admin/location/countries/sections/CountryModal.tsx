"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { countrySchema, TCountryFormData } from "@/lib/country.schema";
import {
  useAddCountryMutation,
  useGetAllCountriesQuery,
  useUpdateCountryMutation,
} from "@/redux/features/location/country.api";

import { TCountry } from "@/types/location.type";

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

interface CountryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  country?: TCountry | null;
}

export default function CountryModal({ open, onOpenChange, country }) {
  const isEditMode = !!country;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TCountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  const [addCountry, { isLoading: isAdding }] = useAddCountryMutation();
  const [updateCountry, { isLoading: isUpdating }] = useUpdateCountryMutation();

  const { data: countriesData } = useGetAllCountriesQuery([
    { name: "fields", value: "name" },
    { name: "fields", value: "id" },
  ]);

  const countries = countriesData?.data || [];

  useEffect(() => {
    if (country && open) {
      setValue("name", country.name);
      setValue("code", country.code);
    } else if (!open) {
      reset();
    }
  }, [country, open, setValue, reset]);

  const onSubmit = async (data: TCountryFormData) => {
    try {
      let result;

      // result = await addCountry({
      //     name: data.name,
      //     code:data.code
      //   }).unwrap();

      //   toast.success(result?.message || "Country added successfully");

      if (isEditMode && country) {
        result = await updateCountry({
          id: country.id,
          data: { id: country.id, name: data.name, code: data.code },
        }).unwrap();

        toast.success(result?.message || "Country updated successfully");
      } else {
        result = await addCountry({
          name: data.name,
          code: data.code,
        }).unwrap();

        toast.success(result?.message || "Country added successfully");
      }

      onOpenChange(false);
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to save country");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Country" : "Add Country"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the country name below"
                : "Enter a name to create a new country"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Country Name */}
            <div>
              <Label htmlFor="name">
                Country Name <span className="text-destructive">*</span>
              </Label>
              <Input id="name" placeholder="Country Name" {...register("name")} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="code">Code</Label>
              <Input id="code" placeholder="Code" {...register("code")} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                //   disabled={isAdding || isUpdating}
              >
                Cancel
              </Button>

              {/* disabled={isAdding || isUpdating} */}
              <Button type="submit">
                {isAdding ? (
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
