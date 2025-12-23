import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-xs text-muted-foreground">
              +$234 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Wishlist Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 items on sale</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Reward Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground">Expires in 6 months</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/customer/orders">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
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
            <h3 className="font-semibold mb-2">Continue Shopping</h3>
            <p className="text-sm text-gray-600 mb-4">
              Explore our latest products and deals
            </p>
            <Link href="/">
              <Button className="w-full">Browse Products</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
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
            <h3 className="font-semibold mb-2">My Wishlist</h3>
            <p className="text-sm text-gray-600 mb-4">
              View and manage your saved items
            </p>
            <Link href="/customer/wishlist">
              <Button className="w-full" variant="outline">
                View Wishlist
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
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
            <h3 className="font-semibold mb-2">Manage Addresses</h3>
            <p className="text-sm text-gray-600 mb-4">
              Update your delivery addresses
            </p>
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
