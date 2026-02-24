import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerDashboard() {
  return (
    <div className="space-y-2">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-muted-foreground text-xs">+$234 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Wishlist Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-muted-foreground text-xs">3 items on sale</p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Reward Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-muted-foreground text-xs">Expires in 6 months</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/customer/orders">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              {
                id: "#ORD-001",
                date: "2025-11-20",
                status: "Delivered",
                amount: "$89.99",
              },
              {
                id: "#ORD-002",
                date: "2025-11-18",
                status: "In Transit",
                amount: "$156.50",
              },
              {
                id: "#ORD-003",
                date: "2025-11-15",
                status: "Processing",
                amount: "$234.99",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-muted-foreground text-sm">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      order.status === "Delivered"
                        ? "bg-accent text-success"
                        : order.status === "In Transit"
                          ? "bg-accent text-info"
                          : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-background border-border transform cursor-pointer rounded-lg border shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-accent mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Continue Shopping</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Explore our latest products and deals
            </p>
            <Link href="/">
              <Button className="w-full">Browse Products</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-background border-border transform cursor-pointer rounded-lg border shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-accent mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">My Wishlist</h3>
            <p className="text-muted-foreground mb-4 text-sm">View and manage your saved items</p>
            <Link href="/customer/wishlist">
              <Button className="w-full" variant="outline">
                View Wishlist
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-background border-border transform cursor-pointer rounded-lg border shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-accent mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Manage Addresses</h3>
            <p className="text-muted-foreground mb-4 text-sm">Update your delivery addresses</p>
            <Link href="/customer/addresses">
              <Button className="w-full" variant="outline">
                Manage Addresses
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
