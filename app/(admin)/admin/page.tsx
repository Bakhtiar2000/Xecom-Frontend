import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-2">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-muted-foreground text-xs">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-muted-foreground text-xs">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Active Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-muted-foreground text-xs">+3 new products</p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-muted-foreground text-xs">+180 new customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              {
                id: "#ORD-1001",
                customer: "John Doe",
                date: "2025-11-25",
                status: "Processing",
                amount: "$89.99",
              },
              {
                id: "#ORD-1002",
                customer: "Jane Smith",
                date: "2025-11-25",
                status: "Shipped",
                amount: "$156.50",
              },
              {
                id: "#ORD-1003",
                customer: "Bob Johnson",
                date: "2025-11-24",
                status: "Delivered",
                amount: "$234.99",
              },
              {
                id: "#ORD-1004",
                customer: "Alice Brown",
                date: "2025-11-24",
                status: "Pending",
                amount: "$67.25",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-muted-foreground text-sm">
                    {order.customer} • {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      order.status === "Delivered"
                        ? "bg-accent text-success"
                        : order.status === "Shipped"
                          ? "bg-accent text-info"
                          : order.status === "Processing"
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-foreground"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Add New Product</h3>
            <p className="text-muted-foreground mb-4 text-sm">Create and publish a new product</p>
            <Link href="/admin/products/add">
              <Button className="w-full">Add Product</Button>
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Manage Orders</h3>
            <p className="text-muted-foreground mb-4 text-sm">View and process customer orders</p>
            <Link href="/admin/orders">
              <Button className="w-full" variant="outline">
                Manage Orders
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Manage Users</h3>
            <p className="text-muted-foreground mb-4 text-sm">View and manage customer accounts</p>
            <Link href="/admin/users">
              <Button className="w-full" variant="outline">
                Manage Users
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-background border-border transform cursor-pointer rounded-lg border shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-accent mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-warning h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">View Analytics</h3>
            <p className="text-muted-foreground mb-4 text-sm">Check sales reports and analytics</p>
            <Link href="/admin/analytics">
              <Button className="w-full" variant="outline">
                View Reports
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-background border-border transform cursor-pointer rounded-lg border shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-accent mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-accent-foreground h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Manage Categories</h3>
            <p className="text-muted-foreground mb-4 text-sm">Organize product categories</p>
            <Link href="/admin/categories">
              <Button className="w-full" variant="outline">
                Manage Categories
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Settings</h3>
            <p className="text-muted-foreground mb-4 text-sm">Configure store settings</p>
            <Link href="/admin/settings">
              <Button className="w-full" variant="outline">
                Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
