// data/categories.
import image1 from "@/assets/CategoryShoes/categoryShoes1.webp";
import image2 from "@/assets/CategoryShoes/categoryShoes2.webp";
import image3 from "@/assets/CategoryShoes/categoryShoes3.webp";
import image5 from "@/assets/CategoryShoes/categoryShoes5.webp";
import image4 from "@/assets/CategoryShoes/categoryShoes6.webp";

import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: 1,
    title: "Sneakers",
    image: image1,
  },
  {
    id: 2,
    title: "Formal",
    image: image2,
  },
  {
    id: 3,
    title: "Boots",
    image: image4,
  },
  {
    id: 4,
    title: "Loafer",
    image: image3,
  },
  {
    id: 5,
    title: "Sports",
    image: image5,
  },
  {
    id: 6,
    title: "Formal",
    image: image2,
  },

  // add more → auto scroll mode
];
