import Title from "@/components/sections/shared/Title";
import OrderStatusNav from "../sections/OrderStatusNav";
import OrderItemPageRenderer from "../sections/OrderItemPageRenderer";
import {
  getOrderStatusRouteConfig,
  isValidOrderStatusSegment,
} from "../sections/orderStatusConfig";
import { notFound } from "next/navigation";

type TStatusPageProps = {
  params: Promise<{
    status: string;
  }>;
};

export default async function OrderStatusPage({ params }: TStatusPageProps) {
  const { status } = await params;

  if (!isValidOrderStatusSegment(status)) {
    notFound();
  }

  const statusConfig = getOrderStatusRouteConfig(status);

  return (
    <div>
      <Title mainTitle="All Orders" subTitle="Track and manage order lifecycle by status" />

      <div className="mt-4 lg:mt-6">
        <OrderStatusNav currentStatus={status} />
      </div>

      <div className="mt-4 lg:mt-6">
        <OrderItemPageRenderer
          currentStatus={statusConfig.orderStatus}
          nextStatus={statusConfig.nextStatus}
          buttonLabel={statusConfig.buttonLabel}
        />
      </div>
    </div>
  );
}
