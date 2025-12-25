import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";

export interface RouteItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export const customerRoutes: RouteItem[] = [
  {
    label: "Dashboard",
    href: "/customer",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    href: "/customer/profile",
    icon: User,
  },
  {
    label: "My Orders",
    href: "/customer/orders",
    icon: ShoppingBag,
  },
  {
    label: "Wishlist",
    href: "/customer/wishlist",
    icon: Heart,
  },
  {
    label: "Addresses",
    href: "/customer/addresses",
    icon: MapPin,
  },
  {
    label: "Settings",
    href: "/customer/settings",
    icon: Settings,
  },
];

export const customerFooterRoutes: RouteItem[] = [
  {
    label: "Back to Store",
    href: "/",
    icon: ArrowLeft,
  },
];
