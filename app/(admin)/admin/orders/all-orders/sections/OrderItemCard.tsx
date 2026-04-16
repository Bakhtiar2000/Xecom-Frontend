import Image from "next/image";
import { TOrderItem } from "@/types/order.type";

type TOrderItemCardProps = {
  item: TOrderItem;
};

export default function OrderItemCard({ item }: TOrderItemCardProps) {
  const featuredImage =
    item?.product?.images?.find((image) => image.isFeatured)?.imageUrl ||
    item?.product?.images?.[0]?.imageUrl ||
    "/placeholder-product.png";

  return (
    <article className="border-border bg-card flex items-center gap-3 rounded-md border p-3">
      <div className="bg-muted relative h-16 w-16 overflow-hidden rounded-md">
        <Image
          src={featuredImage}
          alt={item?.product?.name || "Order item"}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{item?.product?.name || "Unknown Product"}</p>
        <p className="text-muted-foreground text-xs">SKU: {item?.variant?.sku || "N/A"}</p>
      </div>

      <div className="text-right text-sm">
        <p>
          Qty: <span className="font-semibold">{item?.quantity}</span>
        </p>
        <p className="font-semibold">${Number(item?.totalPrice || 0).toFixed(2)}</p>
      </div>
    </article>
  );
}
 