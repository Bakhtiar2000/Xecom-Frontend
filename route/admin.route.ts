import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Store,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export interface RouteItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface RouteGroup {
  title: string;
  icon: LucideIcon;
  routes: RouteItem[];
}

export const adminRoutes: RouteGroup[] = [
  {
    title: "Products",
    icon: Package,
    routes: [
      {
        label: "All Products",
        href: "/admin/products",
      },
      {
        label: "Add Product",
        href: "/admin/products/add",
      },
      {
        label: "Categories",
        href: "/admin/categories",
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    routes: [
      {
        label: "All Orders",
        href: "/admin/orders",
      },
      {
        label: "Pending Orders",
        href: "/admin/orders/pending",
      },
    ],
  },
  {
    title: "Users",
    icon: Users,
    routes: [
      {
        label: "All Users",
        href: "/admin/users",
      },
      {
        label: "Customers",
        href: "/admin/users/customers",
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    routes: [
      {
        label: "Reports",
        href: "/admin/analytics",
      },
      {
        label: "Sales Analytics",
        href: "/admin/analytics/sales",
      },
    ],
  },
];

export const adminMainRoutes: RouteItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
];

export interface FooterRouteItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const adminFooterRoutes: FooterRouteItem[] = [
  {
    label: "View Store",
    href: "/",
    icon: Store,
  },
];
