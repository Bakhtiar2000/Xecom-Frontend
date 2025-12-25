import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ThemeToggle from "@/components/sections/shared/ThemeToggle";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-background shadow-lg">
        <div className="p-4">
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity block mb-4"
          >
            Xecom
          </Link>

          <nav className="space-y-2">
            <Link
              href="/customer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted"
            >
              Dashboard
            </Link>
            <Link
              href="/customer/profile"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted"
            >
              Profile
            </Link>
            <Link
              href="/customer/orders"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted"
            >
              My Orders
            </Link>
            <Link
              href="/customer/wishlist"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted"
            >
              Wishlist
            </Link>
            <Link
              href="/customer/addresses"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted"
            >
              Addresses
            </Link>
            <Link
              href="/customer/settings"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted"
            >
              Settings
            </Link>

            <hr className="my-4" />

            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium block py-2 px-4 rounded-md hover:bg-muted"
            >
              Back to Store
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
            <h1 className="text-2xl font-semibold text-foreground">
              Customer Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-muted-foreground">
                Welcome back, Customer!
              </span>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                C
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
