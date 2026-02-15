"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import CartContent from "./sections/CartSheetContent";

export default function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-3 z-100 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center text-lg gap-2"><ShoppingCart /> Your Cart</SheetTitle>
        </SheetHeader>
        <CartContent isSheet onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}