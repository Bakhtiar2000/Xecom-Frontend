export interface RouteItem {
  label: string;
  href: string;
}

export const mainRoutes: RouteItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "Deals",
    href: "/deals",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
