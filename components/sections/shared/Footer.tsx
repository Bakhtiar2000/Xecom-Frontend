import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Xecom</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted e-commerce platform for all your shopping needs.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/books"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/teachers"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Teachers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/help"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/customer/profile"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/customer/orders"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-4 pt-4 text-center text-muted-foreground">
          <p>&copy; 2025 Xecom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
