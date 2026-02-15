// components/category/CategoryCard.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Category } from "@/types";

type Props = {
  category: Category;
  active?: boolean;
};

export default function CategoryCard({ category, active }: Props) {
  return (
    <Card
      className={`
        relative flex flex-col items-center justify-center
       max-w-65 lg:h-85 h-55 lg:my-10 my-5
        rounded-full border-0 shadow-md
        transition-all duration-300
        ${active ? "ring-4 ring-primary " : ""}
      `}
    >
      <Image
        src={category.image}
        alt={category.title}
        fill
        className={`rounded-full object-cover h-full w-full ${active ? "hover:shadow-2xl cursor-pointer" : ""}`}
      />
      <p className="z-100 absolute bottom-5 lg:bottom-10 text-xl font-semibold text-white tracking-wide">{category.title}</p>
    </Card>
  );
}
