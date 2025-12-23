import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DealsPage() {
    const deals = [
        {
            id: 1,
            name: "4K Smart TV",
            category: "Electronics",
            originalPrice: "$799.99",
            salePrice: "$599.99",
            discount: "25%",
            endsIn: "2 days",
            icon: "📺"
        },
        {
            id: 2,
            name: "Gaming Laptop",
            category: "Electronics",
            originalPrice: "$1,499.99",
            salePrice: "$1,199.99",
            discount: "20%",
            endsIn: "5 hours",
            icon: "💻"
        },
        {
            id: 3,
            name: "Wireless Earbuds Pro",
            category: "Electronics",
            originalPrice: "$149.99",
            salePrice: "$89.99",
            discount: "40%",
            endsIn: "1 day",
            icon: "🎧"
        },
        {
            id: 4,
            name: "Designer Handbag",
            category: "Fashion",
            originalPrice: "$299.99",
            salePrice: "$199.99",
            discount: "33%",
            endsIn: "3 days",
            icon: "👜"
        },
        {
            id: 5,
            name: "Air Purifier",
            category: "Home & Kitchen",
            originalPrice: "$249.99",
            salePrice: "$179.99",
            discount: "28%",
            endsIn: "6 hours",
            icon: "🌬️"
        },
        {
            id: 6,
            name: "Robot Vacuum",
            category: "Home & Kitchen",
            originalPrice: "$399.99",
            salePrice: "$279.99",
            discount: "30%",
            endsIn: "12 hours",
            icon: "🤖"
        },
        {
            id: 7,
            name: "Fitness Tracker",
            category: "Sports",
            originalPrice: "$129.99",
            salePrice: "$79.99",
            discount: "38%",
            endsIn: "4 days",
            icon: "⌚"
        },
        {
            id: 8,
            name: "Digital Camera",
            category: "Electronics",
            originalPrice: "$699.99",
            salePrice: "$499.99",
            discount: "29%",
            endsIn: "2 days",
            icon: "📷"
        },
        {
            id: 9,
            name: "Electric Kettle",
            category: "Home & Kitchen",
            originalPrice: "$59.99",
            salePrice: "$39.99",
            discount: "33%",
            endsIn: "8 hours",
            icon: "☕"
        }
    ];

    return (
        <div className="mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">🔥 Hot Deals & Offers</h1>
                <p className="text-gray-600 text-lg">
                    Don't miss out on these amazing limited-time deals and discounts!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map((deal) => (
                    <Card key={deal.id} className="hover:shadow-lg transition-shadow border-2 border-red-200">
                        <CardHeader>
                            <div className="relative">
                                <div className="text-6xl mb-4 text-center">{deal.icon}</div>
                                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {deal.discount} OFF
                                </div>
                            </div>
                            <CardTitle>{deal.name}</CardTitle>
                            <CardDescription>{deal.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 line-through">{deal.originalPrice}</span>
                                <span className="text-2xl font-bold text-red-600">{deal.salePrice}</span>
                            </div>
                            <div className="text-sm text-orange-600 font-medium">
                                ⏰ Ends in {deal.endsIn}
                            </div>
                            <Button className="w-full bg-red-500 hover:bg-red-600">Grab This Deal</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
