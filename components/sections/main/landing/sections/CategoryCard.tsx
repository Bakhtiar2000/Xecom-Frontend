// components/category/CategoryCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

type Props = {
  category: {
    id: string;
    title: string;
    imageUrl?: string | null;
  };
  active?: boolean;
};

export default function CategoryCard({ category, active }: Props) {
  const imageUrl = category.imageUrl || "/placeholder-category.jpg";

  return (
    <Link href={`/products?categories=${category.id}`}>
      <Card
        className={`relative bg-black/30  backdrop-blur-sm my-5 flex h-55 max-w-95 cursor-pointer flex-col items-center justify-center rounded-full border-0 shadow-md transition-all duration-300 hover:shadow-lg lg:my-10 lg:h-105 ${active ? "ring-primary ring-4" : ""} `}
      >
        <Image
          src={imageUrl}
          alt={category.title}
          fill
          className={`h-full w-full rounded-full object-cover p-1 ${active ? "cursor-pointer hover:shadow-2xl" : ""}`}
        />
        <p className="absolute bottom-5 z-100 text-sm lg:text-xl text-white font-bold  border-black  tracking-wide  lg:bottom-10">
          {category.title}
        </p>
      </Card>
    </Link>
  );
}
