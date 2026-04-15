"use client";

import { useState } from "react";
import Image from "next/image";

import { useGetMyOrdersQuery, useCancelOrderMutation } from "@/redux/features/order/order.api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
  TableLoading,
  TableError,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/custom/TablePagination";
import { useTablePagination } from "@/hooks/useTablePagination";
import { toast } from "sonner";
import { Trash2, Folder } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter, 
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function OrderTable({onEdit}) {
  // cancel mutation
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  // pagination
  const { handlePageChange, handlePageSizeChange, getPaginationParams } = useTablePagination({
    initialPageNumber: 1,
    initialPageSize: 10,
  });

  // dialog state
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<any>(null);

  // fetch orders
  const { data, isLoading, isError } = useGetMyOrdersQuery(getPaginationParams());

  const orders = data?.data || [];
  const hasNoData = orders.length === 0 && !isLoading;

  // open dialog
  const handleCancelClick = (order: any) => {
    if (order.status !== "PENDING") {
      toast.error("Only pending orders can be cancelled");
      return;
    }

    setOrderToCancel(order);
    setCancelDialogOpen(true);
  };

  // confirm cancel
  const handleConfirmCancel = async () => {
    if (!orderToCancel) return;

    try {
      await cancelOrder(orderToCancel.id).unwrap();
      toast.success("Order cancelled successfully");

      setCancelDialogOpen(false);
      setOrderToCancel(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <>
      <div className="border-border relative mt-4 rounded-md border lg:mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Order No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={8} rows={5} />
            ) : isError ? (
              <TableError colSpan={8}>Error loading orders. Please try again.</TableError>
            ) : orders.length === 0 ? (
              <TableEmpty colSpan={8}>No orders found</TableEmpty>
            ) : (
              orders.map((order: any) => (
                <TableRow key={order.id}>
                  {/* Image */}
                  <TableCell>
                    {order.orderItems?.[0]?.product?.images?.[0]?.imageUrl ? (
                      <div className="bg-muted relative h-10 w-10 overflow-hidden rounded-md">
                        <Image
                          src={order.orderItems[0].product.images[0].imageUrl}
                          alt="product"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
                        <Folder className="text-muted-foreground h-6 w-6" />
                      </div>
                    )}
                  </TableCell>

                  {/* Order Number */}
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.status === "DELIVERED"
                          ? "border-green-600 text-green-600"
                          : order.status === "CANCELLED"
                            ? "border-red-600 text-red-600"
                            : "border-yellow-600 text-yellow-600"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>

                  {/* Payment */}
                  <TableCell>
                    <Badge variant="secondary">{order.paymentStatus}</Badge>
                  </TableCell>

                  {/* Total */}
                  <TableCell>${order.total}</TableCell>

                  {/* Date */}
                  <TableCell>{new Date(order.placedAt).toLocaleDateString()}</TableCell>

                  {/* Items */}
                  <TableCell className="text-center">{order.orderItems?.length || 0}</TableCell>

                  {/* Action */}
                  <TableCell>
                    <div className="flex justify-end">
                      {order.status === "PENDING" ? (
                        <Button
                          size="sm"
                          onClick={() => handleCancelClick(order)}
                          disabled={isCancelling}
                          className="bg-green-600 text-white hover:bg-green-700"
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Badge className="border border-red-200 bg-red-100 text-red-600">
                          Not Allowed
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {data?.meta && (
          <TablePagination
            meta={data.meta}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            disabled={hasNoData}
          />
        )}
      </div>

      {/*  Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel order "{orderToCancel?.orderNumber}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>Keep Order</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmCancel}
              disabled={isCancelling}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isCancelling ? "Cancelling..." : "Cancel Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
