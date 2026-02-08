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
    label: "Brands",
    href: "/brand_shoes",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "About Us",
    href: "/about",
  },
];
