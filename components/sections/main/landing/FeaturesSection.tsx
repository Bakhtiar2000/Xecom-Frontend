import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeaturesSection() {
  return (
    <section className="py-4 bg-muted">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
          Why Choose Xecom?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-accent">
                <svg
                  className="w-8 h-8 text-accent-foreground"
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
              <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-accent">
                <svg
                  className="w-8 h-8 text-accent-foreground"
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
                100% authentic products with quality guarantee and easy returns
                policy.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-accent">
                <svg
                  className="w-8 h-8 text-accent-foreground"
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
  );
}
