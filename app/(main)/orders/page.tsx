"use client";

import Title from "@/components/sections/shared/Title";
import { TOrder } from "@/types/order.type";
import { useState } from "react";
import OrderTable from "./sections/OrderTable";

export default function MyOrderPage() {
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  const handleEditClick = (order: TOrder) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <div className="container space-y-8 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <Title mainTitle="My Order" subTitle="Manage all your Order in one place." />
        </div>

        <div className="mt-4 lg:mt-6">
          <OrderTable onEdit={handleEditClick} />
        </div>
      </div>
    </>
  );
}
