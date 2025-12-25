export interface RouteItem {
  label: string;
  href: string;
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
      },
    ],
  },
  {
    title: "Products",
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

export const adminFooterRoutes: RouteItem[] = [
  {
    label: "View Store",
    href: "/",
  },
];
