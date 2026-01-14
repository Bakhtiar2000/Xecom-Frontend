"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Navigation,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { mainRoutes } from "@/route/main.route";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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
      <div className="hidden w-11/12 mx-auto lg:flex bg-primary text-white text-sm">
        <div className="   w-1/2 flex items-center justify-between px-8 py-1">
          <p className="flex items-center gap-2">
            <span className="font-semibold flex gap-1">
              <Navigation size={20} /> 7 Days A Week
            </span>
            <span>From 9:00 AM To 7:00 PM</span>
          </p>
        </div>

        <div className="  w-1/2 flex items-center justify-end gap-4 py-1 pr-8">
          <div className="text-sm">
            Call Us: <span className="font-semibold">610-403-403</span>
          </div>



        </div>
      </div>


      <nav
        className={`w-full  left-0 z-50 bg-secondary transition-all duration-300 ${isSticky ? "fixed top-0  shadow-md py-3" : "relative  py-3  shadow-sm"
          }`}
      >

        <div className={`flex justify-between  items-center ${isSticky ? "px-6" : "px-6 lg:px-16 "}`}>
          <div className="flex justify-center items-center gap-20">
            <div className="text-3xl font-extrabold tracking-widest merriweather-font">STEPS</div>

            <div className="hidden items-start justify-start md:flex gap-6">
              {mainRoutes.map((route) => {
                const isActive =
                  pathname === route.href ||
                  (route.href !== "/" && pathname.startsWith(route.href));

                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`relative font-thin transition-colors
          ${isActive
                        ? "text-primary dark:text-gray-300 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary"
                        : "text-muted-foreground hover:text-foreground"
                      }
        `}
                  >
                    {route.label}
                  </Link>
                );
              })}
            </div>
          </div>


          <div className="hidden px-4 font-bold py-4 w-[40%] lg:flex nav-bg-base justify-between items-center gap-6 text-sm rounded-lg">
            <div className="relative flex items-center flex-1">


            </div>

            <div className="flex gap-6">
              <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "bn")}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                </SelectContent>
              </Select>

              <ThemeToggle />
              <Link href="/SignIn" className="flex hover-button items-center gap-1  transition">
                <User size={22} /> Sign In
              </Link>
              <Link href={'/Cart'} className="flex hover-button items-center gap-1  transition">
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
            <Link href={'/ChartsProducts'} className="flex hover-button items-center gap-1 text-sm hover-button">
              <ShoppingCart size={18} /> Cart(0)
            </Link>

            <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "bn")}>
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

