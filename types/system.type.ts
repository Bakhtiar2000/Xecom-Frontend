import { AuditAction, NotificationType, SettingType } from "@/constants/enum";

// ========================================
// SYSTEM & CONFIGURATION
// ========================================

export type TNotification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: any;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
};

export type TAuditLog = {
  id: string;
  userId?: string | null;
  entityType: string;
  entityId: string;
  action: AuditAction;
  oldValues?: any | null;
  newValues?: any | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
};

export type TSetting = {
  id: string;
  tenantId?: string | null;
  key: string;
  value: string;
  type: SettingType;
  description?: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};
