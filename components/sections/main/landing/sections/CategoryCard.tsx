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
        className={`relative cursor-pointer my-5 flex h-55 max-w-65 flex-col items-center justify-center rounded-full border-0 shadow-md transition-all duration-300 lg:my-10 lg:h-85 hover:shadow-lg ${active ? "ring-primary ring-4" : ""} `}
      >
        <Image
          src={imageUrl}
          alt={category.title}
          fill
          className={`h-full w-full rounded-full object-cover ${active ? "cursor-pointer hover:shadow-2xl" : ""}`}
        />
        <p className="absolute bottom-5 z-100 text-xl font-semibold tracking-wide text-white lg:bottom-10">
          {category.title}
        </p>
      </Card>
    </Link>
  );
}
