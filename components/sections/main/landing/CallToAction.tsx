import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-4 bg-primary text-primary-foreground">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Ready to Start Shopping?
        </h2>
        <p className="text-xl mb-4 max-w-2xl mx-auto text-center">
          Join thousands of satisfied customers and discover amazing deals
          today.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Create Account
            </Button>
          </Link>
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
