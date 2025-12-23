import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Active Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">+3 new products</p>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,350</div>
                        <p className="text-xs text-muted-foreground">+180 new customers</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Recent Orders</CardTitle>
                        <Link href="/admin/orders">
                            <Button variant="outline" size="sm">View All Orders</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { id: "#ORD-1001", customer: "John Doe", date: "2025-11-25", status: "Processing", amount: "$89.99" },
                            { id: "#ORD-1002", customer: "Jane Smith", date: "2025-11-25", status: "Shipped", amount: "$156.50" },
                            { id: "#ORD-1003", customer: "Bob Johnson", date: "2025-11-24", status: "Delivered", amount: "$234.99" },
                            { id: "#ORD-1004", customer: "Alice Brown", date: "2025-11-24", status: "Pending", amount: "$67.25" },
                        ].map((order) => (
                            <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">{order.id}</p>
                                    <p className="text-sm text-gray-600">{order.customer} • {order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{order.amount}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
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
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">Add New Product</h3>
                        <p className="text-sm text-gray-600 mb-4">Create and publish a new product</p>
                        <Link href="/admin/products/add">
                            <Button className="w-full">Add Product</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">Manage Orders</h3>
                        <p className="text-sm text-gray-600 mb-4">View and process customer orders</p>
                        <Link href="/admin/orders">
                            <Button className="w-full" variant="outline">Manage Orders</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">Manage Users</h3>
                        <p className="text-sm text-gray-600 mb-4">View and manage customer accounts</p>
                        <Link href="/admin/users">
                            <Button className="w-full" variant="outline">Manage Users</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">View Analytics</h3>
                        <p className="text-sm text-gray-600 mb-4">Check sales reports and analytics</p>
                        <Link href="/admin/analytics">
                            <Button className="w-full" variant="outline">View Reports</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">Manage Categories</h3>
                        <p className="text-sm text-gray-600 mb-4">Organize product categories</p>
                        <Link href="/admin/categories">
                            <Button className="w-full" variant="outline">Manage Categories</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2">Settings</h3>
                        <p className="text-sm text-gray-600 mb-4">Configure store settings</p>
                        <Link href="/admin/settings">
                            <Button className="w-full" variant="outline">Settings</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}