import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="mx-auto px-4 py-8 max-w-7xl">
          <h1 className="text-5xl font-bold mb-6 text-center animate-fade-in">
            Welcome to Xecom
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-center leading-relaxed">
            Discover amazing products at unbeatable prices. Shop from thousands
            of items and enjoy fast, reliable delivery right to your doorstep.
          </p>
          <div className="flex justify-center space-x-4 animate-slide-up">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Join Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto px-4 py-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Xecom?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-blue-100">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get your orders delivered within 24-48 hours with our express
                  delivery service.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-green-100">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  100% authentic products with quality guarantee and easy
                  returns policy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-purple-100">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Competitive pricing with regular discounts and special offers
                  for our customers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <div className="mx-auto px-4 py-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Popular Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", icon: "📱" },
              { name: "Fashion", icon: "👗" },
              { name: "Home & Garden", icon: "🏠" },
              { name: "Sports", icon: "⚽" },
              { name: "Books", icon: "📚" },
              { name: "Beauty", icon: "💄" },
              { name: "Toys", icon: "🧸" },
              { name: "Automotive", icon: "🚗" },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase()}`}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 duration-300">
                  <CardContent className="text-center py-8">
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
      <section className="py-16 bg-blue-600 text-white">
        <div className="mx-auto px-4 py-8 max-w-7xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-center">
            Join thousands of satisfied customers and discover amazing deals
            today.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Create Account
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
