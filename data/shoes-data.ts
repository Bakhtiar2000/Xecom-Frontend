import { Shoe, SneakerGalleryItem } from "@/types/shoes.types";
import shoes5 from "../assets/shoes/shoes5.png";
import shoes6 from "../assets/shoes/shoes6.png";
import shoes7 from "../assets/shoes/shoes7.png";
import shoes8 from "../assets/shoes/shoes8.png";
import shoes9 from "../assets/shoes/shoes9.png";
import shoes10 from "../assets/shoes/categoryShoes4.webp";

export const shoes: Shoe[] = [
  {
    id: 1,
    image: shoes9,
    name: "Edge Shoes",
    price: "$120",
    trademark: "Nike",
    description:
      "The Edge Shoes provide exceptional comfort with advanced cushioning, ideal for running and casual wear. Lightweight, durable, and stylish.",
    parts: [
      { title: "Heel Part", img: shoes9, top: "20%", left: "10%" },
      { title: "Shoe Lace", img: shoes9, top: "28%", left: "30%" },
      { title: "Toe Cap", img: shoes9, bottom: "10%", left: "60%" },
    ],
  },
  {
    id: 2,
    image: shoes8,
    name: "Flex Pro",
    price: "$150",
    trademark: "Adidas",
    description:
      "Flex Pro shoes are designed for high performance with flexible soles, breathable material, and superior grip for all-day activities.",
    parts: [
      { title: "Heel", img: shoes8, top: "5%", left: "35%" },
      { title: "Lace", img: shoes8, top: "45%", left: "5%" },
      { title: "Toe Shield", img: shoes8, bottom: "12%", left: "48%" },
    ],
  },
  {
    id: 3,
    image: shoes7,
    name: "Glide X",
    price: "$180",
    trademark: "Puma",
    description:
      "Glide X offers premium support and style. With its sleek design, cushioned midsole, and durable materials, it's perfect for sports and casual outings.",
    parts: [
      { title: "Back", img: shoes7, top: "10%", left: "26%" },
      { title: "Mid Lace", img: shoes7, top: "62%", left: "10%" },
      { title: "Front", img: shoes7, bottom: "9%", left: "60%" },
    ],
  },
  {
    id: 4,
    image: shoes8,
    name: "Flex Pro",
    price: "$150",
    trademark: "Adidas",
    description:
      "Flex Pro shoes are designed for high performance with flexible soles, breathable material, and superior grip for all-day activities.",
    parts: [
      { title: "Heel", img: shoes8, top: "5%", left: "35%" },
      { title: "Lace", img: shoes8, top: "45%", left: "10%" },
      { title: "Toe Shield", img: shoes8, bottom: "12%", left: "48%" },
    ],
  },
  {
    id: 5,
    image: shoes6,
    name: "Air Max 270",
    price: "$200",
    trademark: "Nike",
    description:
      "Experience ultimate comfort with the Air Max 270, featuring visible Air units and a sleek design perfect for everyday wear.",
    parts: [
      { title: "Air Unit", img: shoes6, top: "15%", left: "40%" },
      { title: "Sole", img: shoes6, bottom: "5%", left: "35%" },
      { title: "Upper", img: shoes6, top: "50%", left: "25%" },
    ],
  },
  {
    id: 6,
    image: shoes5,
    name: "Ultraboost 22",
    price: "$220",
    trademark: "Adidas",
    description:
      "The Ultraboost 22 delivers energy-returning comfort with every step, ideal for runners and active lifestyles.",
    parts: [
      { title: "Boost Midsole", img: shoes5, top: "20%", left: "30%" },
      { title: "Heel Counter", img: shoes5, top: "10%", left: "45%" },
      { title: "Tongue", img: shoes5, top: "60%", left: "15%" },
    ],
  },
  {
    id: 7,
    image: shoes9,
    name: "Classic Leather",
    price: "$180",
    trademark: "Reebok",
    description:
      "Timeless style meets modern comfort in the Classic Leather sneakers, perfect for casual outings.",
    parts: [
      { title: "Leather Upper", img: shoes9, top: "25%", left: "20%" },
      { title: "Logo", img: shoes9, top: "35%", left: "40%" },
      { title: "Outsole", img: shoes9, bottom: "10%", left: "30%" },
    ],
  },
  {
    id: 8,
    image: shoes7,
    name: "Gel-Kayano 29",
    price: "$240",
    trademark: "ASICS",
    description:
      "Engineered for stability and cushioning, the Gel-Kayano 29 is a top choice for long-distance running.",
    parts: [
      { title: "Gel Cushioning", img: shoes8, top: "18%", left: "35%" },
      { title: "Lateral Support", img: shoes8, top: "12%", left: "50%" },
      { title: "Mesh Upper", img: shoes8, top: "45%", left: "25%" },
    ],
  },
];

export const sneakersGallery: SneakerGalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&auto=format&fit=crop",
    alt: "Retro High Chicago",
    category: "Basketball",
    brand: "Nike",
    colorway: "Chicago",
    featured: true,
    className: "md:col-span-2 md:row-span-2",
    likes: 245,
    description: "Iconic Chicago colorway with premium leather construction",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop",
    alt: "New Balance 990v6",
    category: "Running",
    brand: "New Balance",
    colorway: "Grey",
    featured: false,
    className: "",
    likes: 189,
    description: "Made in USA with premium comfort technology",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop",
    alt: "Yeezy Boost 350 V2 Zebra",
    category: "Lifestyle",
    brand: "Adidas",
    colorway: "Zebra",
    featured: false,
    className: "",
    likes: 312,
    description: "Primeknit upper with Boost cushioning technology",
  },
  {
    id: 4,
    src: shoes10,
    alt: "Nike Dunk Low Panda",
    category: "Skate",
    brand: "Nike",
    colorway: "Panda",
    featured: false,
    className: "",
    likes: 278,
    description: "Classic skate silhouette with durable construction",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
    alt: "Adidas Ultraboost 22",
    category: "Running",
    brand: "Adidas",
    colorway: "Black",
    featured: false,
    className: "",
    likes: 156,
    description: "Maximum energy return with responsive cushioning",
  },
];
