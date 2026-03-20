import { OrderStatus } from "@/constants/enum";

export type TOrderStatusSegment =
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned"
    | "refunded";

export type TOrderStatusRouteConfig = {
    segment: TOrderStatusSegment;
    label: string;
    orderStatus: OrderStatus;
    nextStatus: OrderStatus | null;
    buttonLabel: string | null;
};

export const ORDER_STATUS_ROUTES: TOrderStatusRouteConfig[] = [
    {
        segment: "pending",
        label: "Pending",
        orderStatus: OrderStatus.PENDING,
        nextStatus: OrderStatus.CONFIRMED,
        buttonLabel: "Accept",
    },
    {
        segment: "confirmed",
        label: "Confirmed",
        orderStatus: OrderStatus.CONFIRMED,
        nextStatus: OrderStatus.PROCESSING,
        buttonLabel: "Start Processing",
    },
    {
        segment: "processing",
        label: "Processing",
        orderStatus: OrderStatus.PROCESSING,
        nextStatus: OrderStatus.SHIPPED,
        buttonLabel: "Mark Shipped",
    },
    {
        segment: "shipped",
        label: "Shipped",
        orderStatus: OrderStatus.SHIPPED,
        nextStatus: OrderStatus.DELIVERED,
        buttonLabel: "Mark Delivered",
    },
    {
        segment: "delivered",
        label: "Delivered",
        orderStatus: OrderStatus.DELIVERED,
        nextStatus: null,
        buttonLabel: null,
    },
    {
        segment: "cancelled",
        label: "Cancelled",
        orderStatus: OrderStatus.CANCELLED,
        nextStatus: null,
        buttonLabel: null,
    },
    {
        segment: "returned",
        label: "Returned",
        orderStatus: OrderStatus.RETURNED,
        nextStatus: null,
        buttonLabel: null,
    },
    {
        segment: "refunded",
        label: "Refunded",
        orderStatus: OrderStatus.REFUNDED,
        nextStatus: null,
        buttonLabel: null,
    },
];

export const isValidOrderStatusSegment = (
    value: string
): value is TOrderStatusSegment => {
    return ORDER_STATUS_ROUTES.some((route) => route.segment === value);
};

export const getOrderStatusRouteConfig = (
    value: TOrderStatusSegment
): TOrderStatusRouteConfig => {
    return (
        ORDER_STATUS_ROUTES.find((route) => route.segment === value) ||
        ORDER_STATUS_ROUTES[0]
    );
};
