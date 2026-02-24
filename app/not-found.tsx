import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-muted flex min-h-screen items-center justify-center">
      <div className="space-y-2 p-4 text-center">
        <div className="text-9xl">🔍</div>
        <h1 className="text-foreground text-6xl font-bold">404</h1>
        <h2 className="text-muted-foreground text-3xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground mx-auto max-w-md">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
