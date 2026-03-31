"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ORDER_STATUS_ROUTES, TOrderStatusSegment } from "./orderStatusConfig";

type TOrderStatusNavProps = {
  currentStatus: TOrderStatusSegment;
};

export default function OrderStatusNav({ currentStatus }: TOrderStatusNavProps) {
  const pathname = usePathname();

  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-8">
      {ORDER_STATUS_ROUTES.map((route) => {
        const href = `/admin/orders/all-orders/${route.segment}`;
        const isActive = pathname === href || currentStatus === route.segment;

        return (
          <li key={route.segment}>
            <Link
              href={href}
              className={cn(
                "block rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary border-primary text-primary-foreground"
                  : "hover:bg-muted border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {route.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
