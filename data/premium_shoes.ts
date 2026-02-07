export type Sneaker = {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  rating: number;
  reviews: number;
  badge:
    | "HOT"
    | "TRENDING"
    | "BEST SELLER"
    | "POPULAR"
    | "LIMITED"
    | "NEW";
  colors: string[];
  sizes: number[];
  category: string;
};


export const shoesData: Sneaker[] = [
  {
    id: 1,
    name: "Nike Air Max 90",
    brand: "Nike",
    category: "Running",
    price: "$120",
    originalPrice: "$150",
    discount: "20% off",
    image: "/man.png",
    rating: 4.7,
    reviews: 245,
    badge: "POPULAR",
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    sizes: [8, 9, 10, 11],
  },
  {
    id: 2,
    name: "Air Jordan 1 Retro High",
    brand: "Nike",
    category: "Basketball",
    price: "$180",
    originalPrice: "$200",
    discount: "10% off",
    image: "/man2.png",
    rating: 4.9,
    reviews: 312,
    badge: "BEST SELLER",
    colors: ["#000000", "#FF0000"],
    sizes: [8, 9, 10, 11, 12],
  },
  {
    id: 3,
    name: "Nike Revolution 7",
    brand: "Nike",
    category: "Running",
    price: "$95",
    originalPrice: "$95",
    discount: "0% off",
    image: "/man3.png",
    rating: 4.3,
    reviews: 189,
    badge: "NEW",
    colors: ["#000000", "#FFFFFF"],
    sizes: [7, 8, 9, 10],
  },
  {
    id: 4,
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "Running",
    price: "$150",
    originalPrice: "$180",
    discount: "17% off",
    image: "/man4.png",
    rating: 4.8,
    reviews: 421,
    badge: "TRENDING",
    colors: ["#000000", "#FFFFFF"],
    sizes: [8, 9, 10, 11],
  },
  {
    id: 5,
    name: "Adidas Forum Low",
    brand: "Adidas",
    category: "Casual",
    price: "$110",
    originalPrice: "$110",
    discount: "0% off",
    image: "/man5.png",
    rating: 4.5,
    reviews: 167,
    badge: "POPULAR",
    colors: ["#FFFFFF", "#000000"],
    sizes: [7, 8, 9, 10],
  },
  {
    id: 6,
    name: "Adidas NMD R1",
    brand: "Adidas",
    category: "Lifestyle",
    price: "$130",
    originalPrice: "$160",
    discount: "19% off",
    image: "/man.png",
    rating: 4.6,
    reviews: 289,
    badge: "HOT",
    colors: ["#000000", "#808080"],
    sizes: [8, 9, 10, 11],
  },
  {
    id: 7,
    name: "Puma RS-X³ Puzzle",
    brand: "Puma",
    category: "Lifestyle",
    price: "$105",
    originalPrice: "$130",
    discount: "19% off",
    image: "/man2.png",
    rating: 4.4,
    reviews: 143,
    badge: "TRENDING",
    colors: ["#000000", "#FF6600"],
    sizes: [8, 9, 10],
  },
  {
    id: 8,
    name: "Puma Suede Classic XXI",
    brand: "Puma",
    category: "Casual",
    price: "$90",
    originalPrice: "$90",
    discount: "0% off",
    image: "/man3.png",
    rating: 4.2,
    reviews: 98,
    badge: "POPULAR",
    colors: ["#000000", "#FFFFFF"],
    sizes: [7, 8, 9],
  },
  {
    id: 9,
    name: "Reebok Classic Leather Legacy",
    brand: "Reebok",
    category: "Casual",
    price: "$95",
    originalPrice: "$120",
    discount: "21% off",
    image: "/man4.png",
    rating: 4.3,
    reviews: 112,
    badge: "HOT",
    colors: ["#FFFFFF", "#000000"],
    sizes: [8, 9, 10],
  },
  {
    id: 10,
    name: "Reebok Nano X3",
    brand: "Reebok",
    category: "Training",
    price: "$125",
    originalPrice: "$125",
    discount: "0% off",
    image: "/man5.png",
    rating: 4.7,
    reviews: 76,
    badge: "NEW",
    colors: ["#000000", "#FF0000"],
    sizes: [8, 9, 10, 11],
  },
  
];

