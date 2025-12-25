export interface RouteItem {
  label: string;
  href: string;
}

export const customerRoutes: RouteItem[] = [
  {
    label: "Dashboard",
    href: "/customer",
  },
  {
    label: "Profile",
    href: "/customer/profile",
  },
  {
    label: "My Orders",
    href: "/customer/orders",
  },
  {
    label: "Wishlist",
    href: "/customer/wishlist",
  },
  {
    label: "Addresses",
    href: "/customer/addresses",
  },
  {
    label: "Settings",
    href: "/customer/settings",
  },
];

export const customerFooterRoutes: RouteItem[] = [
  {
    label: "Back to Store",
    href: "/",
  },
];
