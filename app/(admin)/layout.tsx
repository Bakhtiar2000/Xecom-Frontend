import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted">
            {/* Sidebar */}
            <aside className="w-64 bg-background shadow-lg">
                <div className="p-4">
                    <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity block mb-4">
                        Xecom Admin
                    </Link>

                    <nav className="space-y-2">
                        <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                            Dashboard
                        </Link>

                        <div className="mt-4">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Products
                            </h3>
                            <Link href="/admin/products" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                All Products
                            </Link>
                            <Link href="/admin/products/add" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                Add Product
                            </Link>
                            <Link href="/admin/categories" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                Categories
                            </Link>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Orders
                            </h3>
                            <Link href="/admin/orders" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                All Orders
                            </Link>
                            <Link href="/admin/orders/pending" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                Pending Orders
                            </Link>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Users
                            </h3>
                            <Link href="/admin/users" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                All Users
                            </Link>
                            <Link href="/admin/users/customers" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                Customers
                            </Link>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Analytics
                            </h3>
                            <Link href="/admin/analytics" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                Reports
                            </Link>
                            <Link href="/admin/analytics/sales" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
                                Sales Analytics
                            </Link>
                        </div>

                        <hr className="my-4" />

                        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted">
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
                <header className="bg-background shadow-sm border-b px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-muted-foreground">Welcome, Admin!</span>
                            <div className="w-8 h-8 bg-danger rounded-full flex items-center justify-center text-primary-foreground font-medium">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}