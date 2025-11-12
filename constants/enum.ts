export enum TenantPlan {
    FREE = "FREE",
    STARTER = "STARTER",
    PROFESSIONAL = "PROFESSIONAL",
    ENTERPRISE = "ENTERPRISE",
}

export enum TenantStatus {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    CANCELLED = "CANCELLED",
    TRIAL = "TRIAL",
}

export enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    PAST_DUE = "PAST_DUE",
    CANCELLED = "CANCELLED",
    UNPAID = "UNPAID",
    TRIALING = "TRIALING",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

// User Enums
export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    STAFF = "STAFF",
    CUSTOMER = "CUSTOMER",
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    BLOCKED = "BLOCKED",
}

export enum CustomerType {
    REGULAR = "REGULAR",
    PREMIUM = "PREMIUM",
    VIP = "VIP",
    BUSINESS = "BUSINESS",
    WHOLESALE = "WHOLESALE",
}

// Product Enums
export enum ProductStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DRAFT = "DRAFT",
    OUT_OF_STOCK = "OUT_OF_STOCK",
    DISCONTINUED = "DISCONTINUED",
}

// Order Enums
export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURNED = "RETURNED",
    REFUNDED = "REFUNDED",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
}

export enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    PAYPAL = "PAYPAL",
    STRIPE = "STRIPE",
    BANK_TRANSFER = "BANK_TRANSFER",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    WALLET = "WALLET",
    CRYPTOCURRENCY = "CRYPTOCURRENCY",
}

export enum ShipmentStatus {
    PENDING = "PENDING",
    PREPARING = "PREPARING",
    SHIPPED = "SHIPPED",
    IN_TRANSIT = "IN_TRANSIT",
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",
    FAILED = "FAILED",
    RETURNED = "RETURNED",
}

export enum ReturnStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export enum ItemCondition {
    NEW = "NEW",
    USED = "USED",
    DAMAGED = "DAMAGED",
    DEFECTIVE = "DEFECTIVE",
}

// Inventory Enums
export enum InventoryReason {
    SALE = "SALE",
    RESTOCK = "RESTOCK",
    RETURN = "RETURN",
    CORRECTION = "CORRECTION",
    MANUAL = "MANUAL",
    ADJUSTMENT = "ADJUSTMENT",
    DAMAGE = "DAMAGE",
    EXPIRED = "EXPIRED",
}

// Coupon Enums
export enum CouponType {
    PERCENTAGE = "PERCENTAGE",
    FIXED_AMOUNT = "FIXED_AMOUNT",
    FREE_SHIPPING = "FREE_SHIPPING",
    BUY_X_GET_Y = "BUY_X_GET_Y",
}

// Notification Enums
export enum NotificationType {
    ORDER_CONFIRMATION = "ORDER_CONFIRMATION",
    ORDER_SHIPPED = "ORDER_SHIPPED",
    ORDER_DELIVERED = "ORDER_DELIVERED",
    PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    STOCK_ALERT = "STOCK_ALERT",
    PROMOTION = "PROMOTION",
    SYSTEM = "SYSTEM",
    ACCOUNT = "ACCOUNT",
}

// Audit Enums
export enum AuditAction {
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    PURCHASE = "PURCHASE",
    REFUND = "REFUND",
}

// Setting Enums
export enum SettingType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    JSON = "JSON",
    EMAIL = "EMAIL",
    URL = "URL",
}
