import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CustomerLayout({
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
            Xecom
          </Link>

          <nav className="space-y-2">
            <Link href="/customer" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
              Dashboard
            </Link>
            <Link href="/customer/profile" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
              Profile
            </Link>
            <Link href="/customer/orders" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
              My Orders
            </Link>
            <Link href="/customer/wishlist" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
              Wishlist
            </Link>
            <Link href="/customer/addresses" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
              Addresses
            </Link>
            <Link href="/customer/settings" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
              Settings
            </Link>

            <hr className="my-4" />

            <Link href="/" className="nav-link block py-2 px-4 rounded-md hover:bg-gray-100">
              Back to Store
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
            <h1 className="text-2xl font-semibold text-gray-900">Customer Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome back, Customer!</span>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                C
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
