"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
      <SheetContent side="right" className="z-100 w-full overflow-y-auto p-3">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart /> Your Cart
          </SheetTitle>
        </SheetHeader>
        <CartContent isSheet onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
