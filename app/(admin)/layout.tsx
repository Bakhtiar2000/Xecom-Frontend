import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity block mb-8">
                        Xecom Admin
                    </Link>

                    <nav className="space-y-2">
                        <Link href="/admin" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                            Dashboard
                        </Link>

                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Products
                            </h3>
                            <Link href="/admin/products" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                All Products
                            </Link>
                            <Link href="/admin/products/add" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                Add Product
                            </Link>
                            <Link href="/admin/categories" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                Categories
                            </Link>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Orders
                            </h3>
                            <Link href="/admin/orders" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                All Orders
                            </Link>
                            <Link href="/admin/orders/pending" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                Pending Orders
                            </Link>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Users
                            </h3>
                            <Link href="/admin/users" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                All Users
                            </Link>
                            <Link href="/admin/users/customers" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                Customers
                            </Link>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Analytics
                            </h3>
                            <Link href="/admin/analytics" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                Reports
                            </Link>
                            <Link href="/admin/analytics/sales" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                                Sales Analytics
                            </Link>
                        </div>

                        <hr className="my-4" />

                        <Link href="/" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-gray-100">
                            View Store
                        </Link>
                        <Button variant="outline" className="w-full mt-4">
                            Logout
                        </Button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b px-6 py-4">
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
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}