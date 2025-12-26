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
        href: "/admin/products/all-products",
      },
      {
        label: "Add Product",
        href: "/admin/products/add-product",
      },
      {
        label: "Categories",
        href: "/admin/products/categories",
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    routes: [
      {
        label: "All Orders",
        href: "/admin/orders/all-orders",
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
        href: "/admin/users/all-users",
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
        href: "/admin/analytics/reports",
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
