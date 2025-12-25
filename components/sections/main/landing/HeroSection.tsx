import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground py-4">
      <div className="container">
        <h1 className="text-5xl font-bold mb-4 text-center animate-fade-in">
          Welcome to Xecom
        </h1>
        <p className="text-xl mb-4 max-w-2xl mx-auto text-center leading-relaxed">
          Discover amazing products at unbeatable prices. Shop from thousands of
          items and enjoy fast, reliable delivery right to your doorstep.
        </p>
        <div className="flex justify-center gap-4 animate-slide-up">
          <Link href="/products">
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              Join Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
