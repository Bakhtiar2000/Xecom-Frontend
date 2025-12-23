import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Xecom
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              Deals
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Xecom</h3>
              <p className="text-gray-400 leading-relaxed">
                Your trusted e-commerce platform for all your shopping needs.
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/books"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Books
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teachers"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Teachers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/login"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customer/profile"
                    className="hover:text-white transition-colors duration-200"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customer/orders"
                    className="hover:text-white transition-colors duration-200"
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Xecom. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
