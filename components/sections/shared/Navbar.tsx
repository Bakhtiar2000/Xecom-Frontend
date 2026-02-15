"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, Navigation, User, LogIn } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { mainRoutes } from "@/route/main.route";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CartData } from "@/data/cart";
import CartSheet from "@/components/sections/shared/CartSheet";
import { navbarConfig } from "@/constants/navbar.config";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const [cartItems, setCartItems] = useState(CartData);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      setLastScrollY(currentScrollY);
    };

    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="w-full bg-secondary">
      {/* Top Bar */}
      <div
        className={`container py-2! hidden lg:flex mx-auto bg-primary text-white text-sm transition-all duration-300 ease-in-out ${isSticky
          ? "h-0 opacity-0 overflow-hidden"
          : "h-auto opacity-100 py-2! overflow-visible"
          }`}
      >
        <div className="w-1/2 flex items-center justify-between">
          <p className="flex items-center gap-2">
            <span className="font-semibold flex gap-1">
              <Navigation size={20} /> 7 Days A Week
            </span>
            <span>From 9:00 AM To 7:00 PM</span>
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-end gap-4">
          <a href="tel:+8801902042884" className="text-sm">
            Call Us: <span className="font-semibold pl-2">88019020-42884</span>
          </a>
        </div>
      </div>

      <nav
        className={`w-full left-0 bg-secondary transition-all duration-300 ${isSticky
          ? "fixed top-0 z-40 shadow-md py-3"
          : "relative py-3 shadow-sm"
          }`}
      >
        <div
          className={`container py-0! flex justify-between items-center max-w-11/12 mx-auto md:px-4`}
        >
          <div className="flex justify-center items-center gap-20">
            <div className="text-3xl font-extrabold tracking-widest merriweather-font">
              STEPS
            </div>

            <div className="hidden items-start justify-start lg:flex gap-6">
              {mainRoutes.map((route) => {
                const isActive =
                  pathname === route.href ||
                  (route.href !== "/" && pathname.startsWith(route.href));

                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`relative font-thin text-sm transition-colors ${isActive
                      ? "text-primary dark:text-white font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full dark:after:bg-white after:bg-primary"
                      : "text-foreground hover:text-foreground"
                      }`}
                  >
                    {route.label}
                  </Link>
                );
              })}

              <NavigationMenu>
                <NavigationMenuList className="hidden lg:flex gap-6 -mt-0.5">
                  {navbarConfig.categories.map((category) => (
                    <NavigationMenuItem key={category.label}>
                      <NavigationMenuTrigger className="font-thin">{category.trigger}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-48">
                          {category.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="hidden lg:flex nav-bg-base justify-between items-center gap-6 text-sm rounded-lg">
            <div className="relative flex items-center flex-1"></div>

            <TooltipProvider>
              <div className="flex gap-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="flex cursor-pointer items-center gap-1"
                      onClick={() => setCartOpen(true)}
                    >
                      <ShoppingCart /> ({cartItems.length})
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cart</p>
                  </TooltipContent>
                </Tooltip>
                <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ThemeToggle />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle Theme</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/login"
                      className="flex hover-button items-center gap-1 transition"
                    >
                      <LogIn size={22} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sign In</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          {/* Mobile Actions */}
          <TooltipProvider>
            <div className="flex lg:hidden items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="flex cursor-pointer items-center gap-1"
                    onClick={() => setCartOpen(true)}
                  >
                    <ShoppingCart /> ({cartItems.length})
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cart</p>
                </TooltipContent>
              </Tooltip>
              <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ThemeToggle />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Theme</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/login"
                    className="flex hover-button items-center gap-1 transition"
                  >
                    <LogIn size={20} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign In</p>
                </TooltipContent>
              </Tooltip>

              <Sheet>
                <SheetTrigger asChild>
                  <Menu className="cursor-pointer" size={24} />
                </SheetTrigger>

                <SheetContent side="left" className="block lg:hidden z-100 w-75 sm:w-85 px-4">
                  {/* Header / Brand */}
                  <SheetHeader className="border-b">
                    <SheetTitle className="text-2xl font-extrabold tracking-widest">
                      STEPS
                    </SheetTitle>
                  </SheetHeader>

                  {/* Navigation */}
                  <nav className="mt-6 space-y-1">
                    {mainRoutes.map((route) => {
                      const isActive =
                        pathname === route.href ||
                        (route.href !== "/" && pathname.startsWith(route.href));

                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                          {route.label}
                        </Link>
                      );
                    })}
                  </nav>


                  {/* Products Section */}
                  <div className="mt-5 ml-3">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest">
                      Products
                    </p>

                    <NavigationMenu>
                      <NavigationMenuList className="flex gap-6">
                        {navbarConfig.categories.map((category) => (
                          <NavigationMenuItem key={category.label}>
                            <NavigationMenuTrigger className="">
                              {category.trigger}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid w-48">
                                {category.items.map((item) => (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </TooltipProvider>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
