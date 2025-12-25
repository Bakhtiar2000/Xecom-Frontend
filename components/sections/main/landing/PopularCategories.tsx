import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function PopularCategories() {
  return (
    <section className="py-4">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Electronics", icon: "📱" },
            { name: "Fashion", icon: "👗" },
            { name: "Home & Garden", icon: "🏠" },
            { name: "Sports", icon: "⚽" },
            { name: "Books", icon: "📚" },
            { name: "Beauty", icon: "💄" },
            { name: "Toys", icon: "🧸" },
            { name: "Automotive", icon: "🚗" },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name.toLowerCase()}`}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 duration-300">
                <CardContent className="text-center py-4">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
