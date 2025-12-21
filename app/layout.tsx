import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xecom - Your Trusted E-commerce Platform",
  description: "Discover amazing products at unbeatable prices. Shop from thousands of items with fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* Header */}
          <header className="site-header">
            <div className="header-container">
              <Link href="/" className="site-logo">
                Xecom
              </Link>

              <nav className="main-nav">
                <Link href="/" className="nav-link">
                  Home
                </Link>
                <Link href="/products" className="nav-link">
                  Products
                </Link>
                <Link href="/categories" className="nav-link">
                  Categories
                </Link>
                <Link href="/about" className="nav-link">
                  About
                </Link>
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </nav>

              <div className="auth-buttons">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="main-content">
            {children}
          </main>

          {/* Footer */}
          <footer className="site-footer">
            <div className="footer-container">
              <div className="footer-grid">
                <div>
                  <h3 className="footer-title">Xecom</h3>
                  <p className="footer-description">
                    Your trusted e-commerce platform for all your shopping needs.
                  </p>
                </div>

                <div>
                  <h4 className="footer-subtitle">Quick Links</h4>
                  <ul className="footer-links">
                    <li><Link href="/products" className="footer-link">Products</Link></li>
                    <li><Link href="/categories" className="footer-link">Categories</Link></li>
                    <li><Link href="/deals" className="footer-link">Deals</Link></li>
                    <li><Link href="/new-arrivals" className="footer-link">New Arrivals</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="footer-subtitle">Support</h4>
                  <ul className="footer-links">
                    <li><Link href="/help" className="footer-link">Help Center</Link></li>
                    <li><Link href="/shipping" className="footer-link">Shipping Info</Link></li>
                    <li><Link href="/returns" className="footer-link">Returns</Link></li>
                    <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="footer-subtitle">Account</h4>
                  <ul className="footer-links">
                    <li><Link href="/login" className="footer-link">Login</Link></li>
                    <li><Link href="/register" className="footer-link">Register</Link></li>
                    <li><Link href="/customer/profile" className="footer-link">My Account</Link></li>
                    <li><Link href="/customer/orders" className="footer-link">My Orders</Link></li>
                  </ul>
                </div>
              </div>

              <div className="footer-bottom">
                <p>&copy; 2025 Xecom. All rights reserved.</p>
              </div>
            </div>
          </footer>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
