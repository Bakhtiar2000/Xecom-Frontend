import { InventoryReason } from "@/constants/enum";

// ========================================
// INVENTORY DTOs
// ========================================

export type TAddInventoryLogDto = {
  variantId: string;
  change: number;
  reason: InventoryReason;
  referenceId?: string;
  note?: string;
};
