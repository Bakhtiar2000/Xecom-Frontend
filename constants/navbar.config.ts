export interface SubCategory {
  label: string;
  href: string;
}

export interface Category {
  label: string;
  trigger: string;
  items: SubCategory[];
}

export interface NavbarConfig {
  categories: Category[];
  languages: {
    value: string;
    label: string;
  }[];
}

export const navbarConfig: NavbarConfig = {
  categories: [
    {
      label: "Men",
      trigger: "Men",
      items: [
        { label: "All", href: "/products?target=men" },
        { label: "Sneakers", href: "/products?target=men&category=sneakers" },
        { label: "Loafers", href: "/products?target=men&category=loafers" },
        { label: "Boots", href: "/products?target=men&category=boots" },
        { label: "Sandals", href: "/products?target=men&category=sandals" },
        { label: "Formal Shoes", href: "/products?target=men&category=formal" },
      ],
    },
    {
      label: "Women",
      trigger: "Women",
      items: [
        { label: "All", href: "/products?target=women" },
        { label: "Sneakers", href: "/products?target=women&category=sneakers" },
        { label: "Heels", href: "/products?target=women&category=heels" },
        { label: "Flats", href: "/products?target=women&category=flats" },
        { label: "Sandals", href: "/products?target=women&category=sandals" },
        { label: "Boots", href: "/products?target=women&category=boots" },
      ],
    },
    {
      label: "Kids",
      trigger: "Kids",
      items: [
        { label: "All", href: "/products?target=kids" },
        { label: "Sneakers", href: "/products?target=kids&category=sneakers" },
        {
          label: "School Shoes",
          href: "/products?target=kids&category=school-shoes",
        },
        { label: "Sandals", href: "/products?target=kids&category=sandals" },
        {
          label: "Sports Shoes",
          href: "/products?target=kids&category=sports",
        },
        { label: "Casual Wear", href: "/products?target=kids&category=casual" },
      ],
    },
  ],
  languages: [
    { value: "en", label: "English" },
    { value: "bn", label: "বাংলা" },
  ],
};
