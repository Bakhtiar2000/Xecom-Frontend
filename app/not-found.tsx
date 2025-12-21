import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-6 p-8">
                <div className="text-9xl">🔍</div>
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700">Page Not Found</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                    <Link href="/">
                        <Button size="lg">
                            Go Home
                        </Button>
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
