"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { divisionSchema, TDivisionFormData } from "@/lib/division.schema";
import {
  useAddDivisionMutation,
  useUpdateDivisionMutation,
} from "@/redux/features/location/division.api";
import { useGetAllCountriesQuery } from "@/redux/features/location/country.api";

import { TDivision } from "@/types/location.type";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  division?: TDivision | null;
}

export default function DivisionModal({ open, onOpenChange, division }: Props) {
  const isEditMode = !!division;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TDivisionFormData>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      //   id:"",
      name: "",
      countryId: "",
    },
  });

  const { data: countryData } = useGetAllCountriesQuery([
    { name: "fields", value: "id" },
    { name: "fields", value: "name" },
  ]);
  const countries = countryData?.data || [];

  const [addDivision, { isLoading: isAdding }] = useAddDivisionMutation();
  const [updateDivision, { isLoading: isUpdating }] = useUpdateDivisionMutation();

  // Prefill form on edit
  useEffect(() => {
    if (division && open) {
      //   setValue("id",division.id);
      setValue("name", division.name);
      setValue("countryId", division.countryId);
    } else {
      reset();
    }
  }, [division, open, setValue, reset]);

  const onSubmit = async (data: TDivisionFormData) => {
    try {
      if (isEditMode && division) {
        await updateDivision({
          id: division.id,
          data: {
            id: division.id,
            name: data.name,
            countryId: data.countryId,
          },
        }).unwrap();

        toast.success("Division updated successfully");
      } else {
        await addDivision(data).unwrap();
        toast.success("Division added successfully");
      }

      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save division");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Division" : "Add Division"}</DialogTitle>
          <DialogDescription>Manage division under selected country</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Country Select */}
          <div>
            <Label>Country *</Label>
            <Controller
              name="countryId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.countryId && (
              <p className="text-destructive text-sm">{errors.countryId.message}</p>
            )}
          </div>

          {/* Division Name */}
          <div>
            <Label>Division Name *</Label>
            <Input placeholder="Enter division name" {...register("name")} />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
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
