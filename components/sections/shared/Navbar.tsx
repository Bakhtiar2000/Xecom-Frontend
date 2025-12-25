import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/sections/shared/ThemeToggle";
import { mainRoutes } from "@/route/main.route";

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
          {mainRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
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
