"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart, User, X, Navigation } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { mainRoutes } from "@/route/main.route";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [language, setLanguage] = useState<"en" | "bn">("en");

  return (
    <div className="w-full poppins-font bg-secondary">
      {/* Top Bar */}
      <div
        className={`hidden lg:flex w-11/12 mx-auto bg-primary text-white text-sm
  transition-all duration-300 ease-in-out overflow-hidden
  ${
    isSticky
      ? "max-h-0 opacity-0 -translate-y-4"
      : "max-h-20 opacity-100 translate-y-0"
  }`}
      >
        <div className="w-1/2 flex items-center justify-between px-8 py-1">
          <p className="flex items-center gap-2">
            <span className="font-semibold flex gap-1">
              <Navigation size={20} /> 7 Days A Week
            </span>
            <span>From 9:00 AM To 7:00 PM</span>
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-end gap-4 py-1 pr-8">
          <div className="text-sm">
            Call Us: <span className="font-semibold">610-403-403</span>
          </div>
        </div>
      </div>

      <nav
        className={`w-full  left-0 z-100 bg-secondary transition-all duration-300 ${
          isSticky ? "fixed top-0  shadow-md py-3" : "relative  py-3  shadow-sm"
        }`}
      >
        <div
          className={`flex justify-between  items-center max-w-11/12 mx-auto px-4`}
        >
          <div className="flex justify-center items-center gap-20">
            <div className="text-3xl font-extrabold tracking-widest merriweather-font">
              STEPS
            </div>

            <div className="hidden items-start justify-start md:flex gap-6">
              {mainRoutes.map((route) => {
                const isActive =
                  pathname === route.href ||
                  (route.href !== "/" && pathname.startsWith(route.href));

                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`relative font-thin text-sm transition-colors
          ${
            isActive
              ? "text-primary dark:text-gray-300 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary"
              : "text-foreground hover:text-foreground"
          }
        `}
                  >
                    {route.label}
                  </Link>
                );
              })}
            </div>
            <NavigationMenu>
              <NavigationMenuList className="hidden   -ml-18 lg:flex gap-6 font-bold">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 w-sm list-none lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3 ">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/manProducts"
                            className="flex flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 md:p-6 no-underline outline-none transition-all duration-200 hover:shadow-md"
                          >
                            <h1 className="mb-2 text-lg font-medium sm:mt-4">
                              Man
                            </h1>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="row-span-3 ">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/womanProducts"
                            className=" justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 md:p-6 no-underline outline-none transition-all duration-200 hover:shadow-md"
                          >
                            <h1 className="mb-2 text-lg font-medium sm:mt-4">
                              Woman
                            </h1>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden px-4 font-bold py-4 w-[40%] lg:flex nav-bg-base justify-between items-center gap-6 text-sm rounded-lg">
            <div className="relative flex items-center flex-1"></div>

            <div className="flex gap-6">
              <Select
                value={language}
                onValueChange={(value) => setLanguage(value as "en" | "bn")}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                </SelectContent>
              </Select>

              <ThemeToggle />
              <Link
                href="/SignIn"
                className="flex hover-button items-center gap-1  transition"
              >
                <User size={22} /> Sign In
              </Link>
              <Link
                href={"/Cart"}
                className="flex hover-button items-center gap-1  transition"
              >
                <ShoppingCart size={22} /> Cart(0)
              </Link>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden hover-button p-4 rounded-md"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-secondary border-t">
          <div className="border-t px-6 py-3 space-y-3">
            <button className="flex hover-button items-center gap-1 text-sm hover-button">
              <Search size={18} /> Search
            </button>
            <button className="flex  hover-button items-center gap-1 text-sm hover-button">
              <User size={18} /> My Profile
            </button>
            <Link
              href={"/ChartsProducts"}
              className="flex hover-button items-center gap-1 text-sm hover-button"
            >
              <ShoppingCart size={18} /> Cart(0)
            </Link>

            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as "en" | "bn")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Language" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="bn">বাংলা</SelectItem>
              </SelectContent>
            </Select>

            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
