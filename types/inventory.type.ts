import { InventoryReason } from "@/constants/enum";

// ========================================
// INVENTORY MANAGEMENT
// ========================================

export type TInventoryLog = {
  id: string;
  variantId: string;
  change: number;
  reason: InventoryReason;
  referenceId?: string | null;
  note?: string | null;
  createdAt: string;
};
