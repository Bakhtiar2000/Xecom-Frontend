import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoriesPage() {
    const categories = [
        {
            id: 1,
            name: "Electronics",
            description: "Latest gadgets and tech products",
            productCount: 1234,
            icon: "📱"
        },
        {
            id: 2,
            name: "Fashion",
            description: "Trendy clothing and accessories",
            productCount: 2456,
            icon: "👗"
        },
        {
            id: 3,
            name: "Home & Kitchen",
            description: "Everything for your home",
            productCount: 987,
            icon: "🏠"
        },
        {
            id: 4,
            name: "Sports & Outdoors",
            description: "Gear for active lifestyle",
            productCount: 756,
            icon: "⚽"
        },
        {
            id: 5,
            name: "Beauty & Personal Care",
            description: "Cosmetics and personal care items",
            productCount: 1543,
            icon: "💄"
        },
        {
            id: 6,
            name: "Books & Media",
            description: "Books, movies, and music",
            productCount: 3421,
            icon: "📚"
        },
        {
            id: 7,
            name: "Toys & Games",
            description: "Fun for all ages",
            productCount: 876,
            icon: "🧸"
        },
        {
            id: 8,
            name: "Automotive",
            description: "Car accessories and parts",
            productCount: 543,
            icon: "🚗"
        },
        {
            id: 9,
            name: "Pet Supplies",
            description: "Everything for your furry friends",
            productCount: 654,
            icon: "🐾"
        }
    ];

    return (
        <div className="container">
            <div className="mb-4">
                <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
                <p className="text-muted-foreground text-lg">
                    Browse our wide range of product categories to find exactly what you need.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`}>
                        <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
                            <CardHeader className="text-center">
                                <div className="text-7xl mb-4">{category.icon}</div>
                                <CardTitle>{category.name}</CardTitle>
                                <CardDescription>{category.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-sm text-muted-foreground">
                                    {category.productCount.toLocaleString()} products
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
