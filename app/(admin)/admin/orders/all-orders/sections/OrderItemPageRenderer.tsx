"use client";

import { useEffect, useMemo, useState } from "react";
import { OrderStatus, PaymentStatus } from "@/constants/enum";
import {
  useCancelOrderAdminMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/order.api";
import { TOrder, TOrderItem } from "@/types/order.type";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OrderItemCard from "./OrderItemCard";

type TOrderItemPageRenderer = {
  currentStatus: OrderStatus;
  nextStatus: OrderStatus | null;
  buttonLabel: string | null;
};

type TOrderWithRelations = TOrder & {
  customer?: {
    user?: {
      name?: string;
    };
  };
  address?: {
    street?: string;
    thana?: {
      name?: string;
      district?: {
        name?: string;
      };
    };
  };
  orderItems?: TOrderItem[];
};

const statusColorClass: Partial<Record<OrderStatus, string>> = {
  [OrderStatus.PENDING]: "bg-amber-500",
  [OrderStatus.CONFIRMED]: "bg-sky-500",
  [OrderStatus.PROCESSING]: "bg-indigo-500",
  [OrderStatus.SHIPPED]: "bg-blue-600",
  [OrderStatus.DELIVERED]: "bg-emerald-600",
  [OrderStatus.CANCELLED]: "bg-red-600",
  [OrderStatus.RETURNED]: "bg-orange-600",
  [OrderStatus.REFUNDED]: "bg-gray-600",
};

const paymentColorClass: Partial<Record<PaymentStatus, string>> = {
  [PaymentStatus.PENDING]: "bg-amber-600",
  [PaymentStatus.PAID]: "bg-green-600",
  [PaymentStatus.FAILED]: "bg-red-600",
  [PaymentStatus.CANCELLED]: "bg-red-600",
  [PaymentStatus.REFUNDED]: "bg-slate-600",
  [PaymentStatus.PARTIALLY_REFUNDED]: "bg-zinc-600",
};

const FINAL_STATUSES = new Set<OrderStatus>([
  OrderStatus.CANCELLED,
  OrderStatus.DELIVERED,
  OrderStatus.REFUNDED,
  OrderStatus.RETURNED,
]);

const formatOrderDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
};

export default function OrderItemPageRenderer({
  currentStatus,
  nextStatus,
  buttonLabel,
}: TOrderItemPageRenderer) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery([
    { name: "status", value: currentStatus },
    { name: "pageNumber", value: "1" },
    { name: "pageSize", value: "100" },
    { name: "sortBy", value: "placedAt" },
    { name: "sortOrder", value: "desc" },
  ]);

  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  const [cancelOrderAdmin, { isLoading: isCancelling }] = useCancelOrderAdminMutation();

  const orders = ((data?.data as TOrderWithRelations[]) || []) as TOrderWithRelations[];

  console.log("odrders1: ", orders);

  console.log("status ", orders);

  useEffect(() => {
    if (orders.length === 0) {
      setSelectedOrderId(null);
      return;
    }

    const isCurrentSelectionValid = orders?.some((order) => order.id === selectedOrderId);
    if (!selectedOrderId || !isCurrentSelectionValid) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders, selectedOrderId]);

  const selectedOrder = useMemo(() => {
    return orders?.find((order) => order.id === selectedOrderId) || null;
  }, [orders, selectedOrderId]);

  console.log("selectorOrderId ", selectedOrderId);

  console.log("selectorOrder ", selectedOrder);
  console.log("Status ", selectedOrder?.status);

  console.log("orderItems", selectedOrder?.orderItems);

  const orderItems = selectedOrder?.orderItems?.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  orderItems?.forEach((item) => {
    console.log(item.productId);
    console.log(item.quantity);
  });

  const isMutating = isUpdating || isCancelling;

  const handleOrderStatusUpdate = async (orderId: string, status: OrderStatus) => {
    try {
      const result = await updateOrderStatus({ id: orderId, data: { status } }).unwrap();
      toast.success(result?.message || "Order status updated");

      refetch();
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Failed to update order status";
      toast.error(message);
    }
  };

  const handleOrderCancel = async (orderId: string) => {
    try {
      const result = await cancelOrderAdmin({ id: orderId }).unwrap();
      toast.success(result?.message || "Order cancelled");
      refetch();
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Failed to cancel order";
      toast.error(message);
    }
  };

  if (isLoading) {
    return <p className="text-muted-foreground py-10 text-center">Loading orders...</p>;
  }

  if (isError) {
    return <p className="text-destructive py-10 text-center">Failed to load orders.</p>;
  }

  if (orders?.length === 0) {
    return (
      <p className="text-muted-foreground py-10 text-center">No orders found for this status.</p>
    );
  }

  const customerName = selectedOrder?.customer?.user?.name || "Unknown Customer";

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-4">
      <aside className="border-border max-h-[75vh] overflow-y-auto rounded-lg border">
        <div className="bg-muted sticky top-0 flex h-12 items-center justify-center border-b text-sm font-semibold lg:text-base">
          Items: {orders?.length}
        </div>

        {orders?.map((order: TOrderWithRelations) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrderId(order.id)}
            className={`cursor-pointer border-b p-3 transition-colors ${
              selectedOrder?.id === order?.id ? "bg-primary/10 border-primary" : "hover:bg-muted/70"
            }`}
          >
            <p className="text-sm font-semibold">Order #{order.orderNumber}</p>
            <p className="text-muted-foreground mt-1 text-xs">{formatOrderDate(order.placedAt)}</p>

            <div className="mt-2 flex items-center justify-between gap-2">
              <Badge className={paymentColorClass[order.paymentStatus] || "bg-zinc-600"}>
                {order?.paymentStatus}
              </Badge>
              <div className="text-right text-sm">
                <p className="font-semibold">${Number(order.total || 0).toFixed(2)}</p>
                <p className="text-muted-foreground text-xs">
                  {order?.orderItems?.length || 0} items
                </p>
              </div>
            </div>
          </div>
        ))}
      </aside>

      <section className="border-border rounded-lg border p-4 lg:col-span-3">
        {selectedOrder ? (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-3">
              <div>
                <h2 className="text-lg font-bold lg:text-xl">Order #{selectedOrder.orderNumber}</h2>
                <p className="text-muted-foreground text-sm">Customer: {customerName}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className={statusColorClass[selectedOrder.status] || "bg-zinc-600"}>
                  {selectedOrder.status}
                </Badge>
                <Badge className={paymentColorClass[selectedOrder.paymentStatus] || "bg-zinc-600"}>
                  {selectedOrder.paymentStatus}
                </Badge>

                {nextStatus && buttonLabel && (
                  <Button
                    disabled={isMutating}
                    onClick={() => handleOrderStatusUpdate(selectedOrder.id, nextStatus)}
                  >
                    {buttonLabel}
                  </Button>
                )}

                {!FINAL_STATUSES.has(currentStatus) && (
                  <Button
                    variant="destructive"
                    disabled={isMutating}
                    onClick={() => handleOrderCancel(selectedOrder.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 text-sm md:grid-cols-2">
              <div>
                <p>
                  <span className="font-semibold">Order Date:</span>{" "}
                  {formatOrderDate(selectedOrder.placedAt)}
                </p>
                <p>
                  <span className="font-semibold">Total:</span> $
                  {Number(selectedOrder.total || 0).toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Tracking:</span>{" "}
                  {selectedOrder.trackingNumber || "Not assigned"}
                </p>
              </div>

              <div>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedOrder.address?.street || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Thana:</span>{" "}
                  {selectedOrder?.address?.thana?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">District:</span>{" "}
                  {selectedOrder?.address?.thana?.district?.name || "N/A"}
                </p>
              </div>
            </div>

            <h3 className="mt-5 mb-3 text-base font-semibold">Items</h3>
            <div className="space-y-3">
              {(selectedOrder?.orderItems || []).map((item) => (
                <OrderItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground py-10 text-center">No order selected.</p>
        )}
      </section>
    </section>
  );
}
