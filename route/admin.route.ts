import {
  LayoutDashboard,
  Package,
  PackagePlus,
  FolderTree,
  ShoppingCart,
  Clock,
  Users,
  UserCircle,
  BarChart3,
  TrendingUp,
  Store,
  type LucideIcon,
} from "lucide-react";

export interface RouteItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface RouteGroup {
  title?: string;
  routes: RouteItem[];
}

export const adminRoutes: RouteGroup[] = [
  {
    routes: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Products",
    routes: [
      {
        label: "All Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        label: "Add Product",
        href: "/admin/products/add",
        icon: PackagePlus,
      },
      {
        label: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
      },
    ],
  },
  {
    title: "Orders",
    routes: [
      {
        label: "All Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        label: "Pending Orders",
        href: "/admin/orders/pending",
        icon: Clock,
      },
    ],
  },
  {
    title: "Users",
    routes: [
      {
        label: "All Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        label: "Customers",
        href: "/admin/users/customers",
        icon: UserCircle,
      },
    ],
  },
  {
    title: "Analytics",
    routes: [
      {
        label: "Reports",
        href: "/admin/analytics",
        icon: BarChart3,
      },
      {
        label: "Sales Analytics",
        href: "/admin/analytics/sales",
        icon: TrendingUp,
      },
    ],
  },
];

export const adminFooterRoutes: RouteItem[] = [
  {
    label: "View Store",
    href: "/",
    icon: Store,
  },
];
