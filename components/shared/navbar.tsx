import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="border-b bg-background shadow-sm sticky top-0 z-50">
      <div className="container flex justify-between items-center gap-4">
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          Xecom
        </Link>

        <nav className="hidden md:flex gap-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            Categories
          </Link>
          <Link
            href="/deals"
            className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            Deals
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
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
  );
}
