// data/categories.ts

import { Category } from "@/types";
import shoes5 from "../assets/shoes/shoes5.png";
import shoes6 from "../assets/shoes/shoes6.png";
import shoes7 from "../assets/shoes/shoes7.png";
import shoes8 from "../assets/shoes/shoes8.png";
import shoes9 from "../assets/shoes/shoes9.png";

export const categories: Category[] = [
  {
    id: 1,
    title: "Sneakers",
    image: shoes7,

  },
  {
    id: 2,
    title: "Formal",
    image: shoes5,
  },
  {
    id: 3,
    title: "Boots",
    image: shoes6,
  },
  {
    id: 4,
    title: "Loafer",
    image: shoes7
  },
  {
    id: 5,
    title: "Sports",
    image: shoes8,
  },
   {
    id: 6,
    title: "Formal",
    image: shoes9,

  },
];
