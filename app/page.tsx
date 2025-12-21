import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-layout">
          <h1 className="hero-title">
            Welcome to Xecom
          </h1>
          <p className="hero-subtitle">
            Discover amazing products at unbeatable prices. Shop from thousands of items
            and enjoy fast, reliable delivery right to your doorstep.
          </p>
          <div className="hero-buttons">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="hero-secondary-btn">
                Join Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container-layout">
          <h2 className="section-title">
            Why Choose Xecom?
          </h2>

          <div className="features-grid">
            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon bg-blue-100">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get your orders delivered within 24-48 hours with our express delivery service.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon bg-green-100">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  100% authentic products with quality guarantee and easy returns policy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon bg-purple-100">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Competitive pricing with regular discounts and special offers for our customers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories-section">
        <div className="container-layout">
          <h2 className="section-title">
            Popular Categories
          </h2>

          <div className="categories-grid">
            {[
              { name: "Electronics", icon: "📱" },
              { name: "Fashion", icon: "👗" },
              { name: "Home & Garden", icon: "🏠" },
              { name: "Sports", icon: "⚽" },
              { name: "Books", icon: "📚" },
              { name: "Beauty", icon: "💄" },
              { name: "Toys", icon: "🧸" },
              { name: "Automotive", icon: "🚗" }
            ].map((category) => (
              <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`}>
                <Card className="category-card">
                  <CardContent className="category-content">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container-layout">
          <h2 className="cta-title">
            Ready to Start Shopping?
          </h2>
          <p className="cta-subtitle">
            Join thousands of satisfied customers and discover amazing deals today.
          </p>
          <div className="cta-buttons">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Create Account
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="cta-secondary-btn">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
