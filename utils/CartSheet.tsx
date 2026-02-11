"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import CartContent from "./CartSheetContent";

export default function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-3 z-100 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex text-xl   gap-2"><ShoppingCart /> Your Cart</SheetTitle>
        </SheetHeader>

        <CartContent isSheet onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}