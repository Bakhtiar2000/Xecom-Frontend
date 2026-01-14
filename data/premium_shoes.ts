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

export const trendingSneakers: Sneaker[] = [
  {
    id: 1,
    name: "Nike Air Jordan 1 Retro High OG",
    brand: "Nike",
    price: "$180",
    originalPrice: "$220",
    discount: "18% off",
    image: "/man.png",
    rating: 4.8,
    reviews: 1247,
    badge: "HOT",
    colors: ["#000000", "#FF0000", "#FFFFFF"],
    sizes: [8, 9, 10, 11, 12],
    category: "Lifestyle",
  },
  {
    id: 2,
    name: "Adidas Yeezy Boost 350 V2",
    brand: "Adidas",
    price: "$220",
    originalPrice: "$250",
    discount: "12% off",
    image: "/man2.png",
    rating: 4.7,
    reviews: 892,
    badge: "TRENDING",
    colors: ["#F5F5F5", "#2D2D2D", "#8B4513"],
    sizes: [7, 8, 9, 10, 11],
    category: "Lifestyle",
  },
  {
    id: 3,
    name: "Nike Dunk Low Retro",
    brand: "Nike",
    price: "$110",
    originalPrice: "$130",
    discount: "15% off",
    image: "/man3.png",
    rating: 4.6,
    reviews: 756,
    badge: "BEST SELLER",
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    sizes: [8, 9, 10, 11],
    category: "Skateboarding",
  },
  {
    id: 4,
    name: "New Balance 550 White Green",
    brand: "New Balance",
    price: "$120",
    originalPrice: "$140",
    discount: "14% off",
    image: "/man4.png",
    rating: 4.5,
    reviews: 634,
    badge: "POPULAR",
    colors: ["#FFFFFF", "#008000", "#000000"],
    sizes: [8, 9, 10, 11, 12],
    category: "Lifestyle",
  },
  {
    id: 5,
    name: "Air Jordan 4 Retro Military Black",
    brand: "Nike",
    price: "$210",
    originalPrice: "$240",
    discount: "13% off",
    image: "/man5.png",
    rating: 4.9,
    reviews: 1103,
    badge: "LIMITED",
    colors: ["#000000", "#FFFFFF", "#808080"],
    sizes: [8, 9, 10, 11],
    category: "Lifestyle",
  },
  {
    id: 6,
    name: "Adidas Forum Low CL",
    brand: "Adidas",
    price: "$100",
    originalPrice: "$120",
    discount: "17% off",
    image: "/man.png",
    rating: 4.4,
    reviews: 521,
    badge: "NEW",
    colors: ["#FFFFFF", "#000000", "#FFD700"],
    sizes: [7, 8, 9, 10, 11],
    category: "Basketball",
  },
];
