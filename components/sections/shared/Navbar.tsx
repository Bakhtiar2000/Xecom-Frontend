"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, User, Navigation } from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartData } from "@/data/cart";
import CartSheet from "@/components/customComponents/ChartSheet";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const { user, logOut } = useAuth();
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

  const [language, setLanguage] = useState<"en" | "bn">("en");

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="w-full poppins-font bg-secondary">
      {/* Top Bar */}
      <div
        className={`hidden lg:flex w-11/12 mx-auto bg-primary text-white text-sm
    transition-all duration-300 ease-in-out
    ${
      isSticky
        ? "h-0 opacity-0 py-0 overflow-hidden"
        : "h-auto opacity-100 py-1 overflow-visible"
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
        className={`w-full  left-0  bg-secondary transition-all duration-300 ${
          isSticky
            ? "fixed top-0 z-100  shadow-md py-3"
            : "relative  py-3  shadow-sm"
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
              ? "text-primary dark:text-gray-300 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-primary"
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
                  <NavigationMenuTrigger> Category Shoes</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 w-sm list-none lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3 ">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/man_products"
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
                            href="/woman_products"
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
              <button
                className="flex cursor-pointer items-center gap-1"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart /> Cart ({cartItems.length})
              </button>
              <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
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
              {user ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center">
                      {user?.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt="User Avatar"
                          width={32}
                          height={32}
                          className="rounded-full object-cover border cursor-pointer"
                        />
                      ) : (
                        <Avatar className="w-8 h-8 cursor-pointer">
                          <AvatarImage src="/avatar.png" alt="User Avatar" />
                          <AvatarFallback>
                            {user?.email?.charAt(0).toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Logout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to log out of your account?
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          await logOut();
                        }}
                        className="bg-danger text-danger-foreground hover:bg-danger"
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Link
                  href="/login"
                  className="flex hover-button items-center gap-1 transition"
                >
                  <User size={22} /> Sign In
                </Link>
              )}
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden hover-button p-4 rounded-md">
                <Menu size={24} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="z-100 w-75 sm:w-85 px-6 py-6">
              {/* Header / Brand */}
              <SheetHeader className="border-b pb-4">
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
                      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
            ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }
          `}
                    >
                      {route.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Products Section */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide ">
                  Products
                </p>

                <div className="">
                  <Link
                    href="/man_products"
                    className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-primary"
                  >
                    1. Man Products
                  </Link>

                  <Link
                    href="/woman_products"
                    className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-primary"
                  >
                    2. Woman Products
                  </Link>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 border-t pt-6 space-y-1">
                <Link
                  href="/cart"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  <ShoppingCart size={18} />
                  <span>Cart (0)</span>
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

                {user ? (
                  <button
                    onClick={logOut}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500/10"
                  >
                    <User size={18} />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    <User size={18} />
                    Sign In
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
