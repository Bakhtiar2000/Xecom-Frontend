import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
    const products = [
        { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$79.99", rating: 4.5, image: "🎧" },
        { id: 2, name: "Smart Watch", category: "Electronics", price: "$199.99", rating: 4.8, image: "⌚" },
        { id: 3, name: "Running Shoes", category: "Fashion", price: "$89.99", rating: 4.6, image: "👟" },
        { id: 4, name: "Coffee Maker", category: "Home & Kitchen", price: "$129.99", rating: 4.7, image: "☕" },
        { id: 5, name: "Backpack", category: "Fashion", price: "$49.99", rating: 4.4, image: "🎒" },
        { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: "$59.99", rating: 4.5, image: "🔊" },
        { id: 7, name: "Desk Lamp", category: "Home & Kitchen", price: "$34.99", rating: 4.3, image: "💡" },
        { id: 8, name: "Water Bottle", category: "Sports", price: "$24.99", rating: 4.6, image: "🚰" },
        { id: 9, name: "Yoga Mat", category: "Sports", price: "$39.99", rating: 4.7, image: "🧘" },
    ];

    return (
        <div className="mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">All Products</h1>
                <p className="text-gray-600 text-lg">
                    Browse our wide selection of quality products across multiple categories.
                </p>
            </div>

            {/* Filter Section */}
            <div className="mb-6 flex gap-4">
                <Button variant="outline">All Categories</Button>
                <Button variant="outline">Electronics</Button>
                <Button variant="outline">Fashion</Button>
                <Button variant="outline">Home & Kitchen</Button>
                <Button variant="outline">Sports</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-6xl mb-4 text-center">{product.image}</div>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>{product.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-3">
                                <span className="text-yellow-500">{'⭐'.repeat(Math.floor(product.rating))}</span>
                                <span className="text-gray-400 text-sm ml-2">({product.rating})</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                                    {product.price}
                                </span>
                                <Button size="sm">Add to Cart</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
