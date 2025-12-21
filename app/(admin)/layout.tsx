import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="p-6">
                    <Link href="/" className="site-logo block mb-8">
                        Xecom Admin
                    </Link>

                    <nav className="space-y-2">
                        <Link href="/admin" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                            Dashboard
                        </Link>

                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Products
                            </h3>
                            <Link href="/admin/products" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                All Products
                            </Link>
                            <Link href="/admin/products/add" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                Add Product
                            </Link>
                            <Link href="/admin/categories" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                Categories
                            </Link>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Orders
                            </h3>
                            <Link href="/admin/orders" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                All Orders
                            </Link>
                            <Link href="/admin/orders/pending" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                Pending Orders
                            </Link>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Users
                            </h3>
                            <Link href="/admin/users" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                All Users
                            </Link>
                            <Link href="/admin/users/customers" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                Customers
                            </Link>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Analytics
                            </h3>
                            <Link href="/admin/analytics" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                Reports
                            </Link>
                            <Link href="/admin/analytics/sales" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                                Sales Analytics
                            </Link>
                        </div>

                        <hr className="my-4" />

                        <Link href="/" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
                            View Store
                        </Link>
                        <Button variant="outline" className="w-full mt-4">
                            Logout
                        </Button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="dashboard-main">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Welcome, Admin!</span>
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-medium">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="dashboard-content">
                    {children}
                </main>
            </div>
        </div>
    );
}