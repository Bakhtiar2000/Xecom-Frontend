"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, Navigation, User } from "lucide-react";
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
// import Image from "next/image";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartData } from "@/data/cart";
import CartSheet from "@/utils/CartSheet";

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
          <a  href="tel:+8801902042884" className="text-sm">
            Call Us: <span className="font-semibold">88019020-42884</span>
          </a>
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
          className={`flex justify-between  items-center max-w-11/12 mx-auto md:px-4`}
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
              ? "text-primary dark:text-white font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full dark:after:bg-white after:bg-primary"
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
              <NavigationMenuList className="hidden lg:flex  -ml-13 font-bold">
                {/* ================= MEN ================= */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Men</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-6 w-60">
                      <li>
                        <Link
                          href="/products"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          All Men&apos;s Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=men&sneakers"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Sneakers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=men&loafers"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Loafers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=men&boots"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Boots
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=men&sandals"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Sandals
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=men&formal"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Formal Shoes
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ================= WOMEN ================= */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-6 w-60">
                      <li>
                        <Link
                          href="/products?category=women"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          All Women&apos;s Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=women&sneakers"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Sneakers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=women&heels"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Heels
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=women&flats"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Flats
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=women&sandals"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Sandals
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products?category=women&boots"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Boots
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ================= CHILDREN ================= */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Children</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-6 w-60">
                      <li>
                        <Link
                          href="/children"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          All Children&apos;s Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/children?category=sneakers"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Sneakers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/children?category=school-shoes"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          School Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/children?category=sandals"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Sandals
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/children?category=sports"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Sports Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/children?category=casual"
                          className="block text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          Casual Wear
                        </Link>
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
              {/* {user ? (
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
              )} */}
              <Link
                href="/login"
                className="flex hover-button items-center gap-1 transition"
              >
                <User size={22} /> Sign In
              </Link>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden cursor-pointer hover-button p-4 rounded-md">
                <Menu size={24} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="z-100 w-75 sm:w-85 px-6 py-6">
              {/* Header / Brand */}
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-2xl  font-extrabold tracking-widest">
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
                <div className="mt-8 ml-3">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide">
                    Products
                  </p>

                  <Accordion type="single" collapsible className="w-full">
                    {/* ============ MEN ============ */}
                    <AccordionItem value="men">
                      <AccordionTrigger className="text-sm">
                        Men
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1 pl-2">
                          <Link href="/products" className="mobile-link">
                            All Men&apos;s Shoes
                          </Link>
                          <Link
                            href="/products?category=sneakers"
                            className="mobile-link"
                          >
                            Sneakers
                          </Link>
                          <Link
                            href="/products?category=loafers"
                            className="mobile-link"
                          >
                            Loafers
                          </Link>
                          <Link
                            href="/products?category=boots"
                            className="mobile-link"
                          >
                            Boots
                          </Link>
                          <Link
                            href="/products?category=sandals"
                            className="mobile-link"
                          >
                            Sandals
                          </Link>
                          <Link
                            href="/products?category=formal"
                            className="mobile-link"
                          >
                            Formal Shoes
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* ============ WOMEN ============ */}
                    <AccordionItem value="women">
                      <AccordionTrigger className="text-sm">
                        Women
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1 pl-2">
                          <Link href="/products?category=women" className="mobile-link">
                            All Women&apos;s Shoes
                          </Link>
                          <Link
                            href="/products?category=women&sneakers"
                            className="mobile-link"
                          >
                            Sneakers
                          </Link>
                          <Link
                            href="/products?category=women&heels"
                            className="mobile-link"
                          >
                            Heels
                          </Link>
                          <Link
                            href="/products?category=women&flats"
                            className="mobile-link"
                          >
                            Flats
                          </Link>
                          <Link
                            href="/products?category=women&sandals"
                            className="mobile-link"
                          >
                            Sandals
                          </Link>
                          <Link
                            href="/products?category=women&boots"
                            className="mobile-link"
                          >
                            Boots
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* ============ CHILDREN ============ */}
                    <AccordionItem value="children">
                      <AccordionTrigger className="text-sm">
                        Children
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1 pl-2">
                          <Link href="/products?category=children" className="mobile-link">
                            All Children&apos;s Shoes
                          </Link>
                          <Link
                            href="/products?category=children&sneakers"
                            className="mobile-link"
                          >
                            Sneakers
                          </Link>
                          <Link
                            href="/products?category=children&school-shoes"
                            className="mobile-link"
                          >
                            School Shoes
                          </Link>
                          <Link
                            href="/products?category=children&sandals"
                            className="mobile-link"
                          >
                            Sandals
                          </Link>
                          <Link
                            href="/products?category=children&sports"
                            className="mobile-link"
                          >
                            Sports Shoes
                          </Link>
                          <Link
                            href="/products?category=children&casual"
                            className="mobile-link"
                          >
                            Casual Wear
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
                <Link
                  href="/login"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  <User size={22} /> Sign In
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

                {/* {user ? (
                  <button
                    onClick={logOut}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm "
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
                )} */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
