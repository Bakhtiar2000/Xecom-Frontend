import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CustomerOrders() {
    const orders = [
        {
            id: "#ORD-001",
            date: "2025-11-20",
            status: "Delivered",
            total: "$89.99",
            items: 3,
            trackingNumber: "TRK123456789"
        },
        {
            id: "#ORD-002",
            date: "2025-11-18",
            status: "In Transit",
            total: "$156.50",
            items: 2,
            trackingNumber: "TRK987654321"
        },
        {
            id: "#ORD-003",
            date: "2025-11-15",
            status: "Processing",
            total: "$234.99",
            items: 5,
            trackingNumber: "TRK456789123"
        },
        {
            id: "#ORD-004",
            date: "2025-11-10",
            status: "Delivered",
            total: "$67.25",
            items: 1,
            trackingNumber: "TRK789123456"
        },
    ];

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Orders</h2>
                <Link href="/">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>

            <div className="space-y-2">
                {orders.map((order) => (
                    <Card key={order.id} className="bg-background rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{order.id}</CardTitle>
                                    <CardDescription>
                                        Placed on {order.date} • {order.items} items
                                    </CardDescription>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold">{order.total}</div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-accent text-success' :
                                            order.status === 'In Transit' ? 'bg-accent text-info' :
                                                order.status === 'Processing' ? 'bg-accent text-accent-foreground' :
                                                    'bg-muted text-foreground'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Tracking Number: {order.trackingNumber}
                                    </p>
                                </div>
                                <div className="space-x-2">
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                    {order.status === 'In Transit' && (
                                        <Button variant="outline" size="sm">
                                            Track Order
                                        </Button>
                                    )}
                                    {order.status === 'Delivered' && (
                                        <Button variant="outline" size="sm">
                                            Reorder
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Order Filters */}
            <Card className="bg-background rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>Filter Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">All Orders</Button>
                        <Button variant="outline" size="sm">Processing</Button>
                        <Button variant="outline" size="sm">Shipped</Button>
                        <Button variant="outline" size="sm">Delivered</Button>
                        <Button variant="outline" size="sm">Cancelled</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}