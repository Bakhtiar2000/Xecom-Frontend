// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import ThemeToggle from "@/components/sections/shared/ThemeToggle";
// import { mainRoutes } from "@/route/main.route";

// export default function Navbar() {
//   return (
//     <header className="border-b bg-background shadow-sm sticky top-0 z-50">
//       <div className="container flex justify-between items-center gap-4">
//         <Link
//           href="/"
//           className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity"
//         >
//           Xecom
//         </Link>

// <nav className="hidden md:flex gap-4">
//   {mainRoutes.map((route) => (
//     <Link
//       key={route.href}
//       href={route.href}
//       className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
//     >
//       {route.label}
//     </Link>
//   ))}
// </nav>

//         <div className="flex items-center space-x-4">
//           <ThemeToggle />
//           <Link href="/login">
//             <Button variant="outline" size="sm">
//               Login
//             </Button>
//           </Link>
//           <Link href="/register">
//             <Button size="sm">Sign Up</Button>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }



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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { mainRoutes } from "@/route/main.route";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isSticky, setIsSticky] = useState(false);
  const toggleLanguage = () => setLanguage((prev) => (prev === "EN" ? "BN" : "EN"));



  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);
  const changeLanguage = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="w-full poppins-font">
      {/* Top Bar */}
      <div className="hidden w-11/12 mx-auto lg:flex  text-sm">
        <div className="bg-primary  text-primary w-1/2 flex items-center justify-between px-8 py-1">
          <p className="flex items-center gap-2">
            <span className="font-semibold flex gap-1">
              <Navigation size={20} /> 7 Days A Week
            </span>
            <span>From 9:00 AM To 7:00 PM</span>
          </p>
        </div>

        <div className="bg-primary text-primary w-1/2 flex items-center justify-end gap-4 py-1 pr-8">
          <div className="text-sm">
            Call Us: <span className="font-semibold">610-403-403</span>
          </div>
          <div className="relative" ref={dropdownRef}>
            {/*  Main Button */}
            <button
              onClick={toggleDropdown}
              className="flex items-center hover-button gap-1 px-3 py-1 text-sm bg-primary transition-colors"
            >
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}  {language === "EN" ? "English" : "বাংলা"}
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute z-100 right-0 mt-2 w-32 bg-primary border rounded-md shadow-lg ">
                <button
                  onClick={() => changeLanguage("EN")}
                  className={`block hover-button w-full text-left px-3 py-2 text-sm hover:bg-primary ${language === "EN" ? "font-semibold bg-primary" : ""
                    }`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("BN")}
                  className={`block w-full hover-button text-left px-3 py-2 text-sm  ${language === "BN" ? "font-semibold bg-primary" : ""
                    }`}
                >
                  বাংলা
                </button>
              </div>
            )}
          </div>

          <ThemeToggle />

        </div>
      </div>


      <nav
        className={`w-full  left-0 z-50 transition-all duration-300 ${isSticky ? "fixed top-0 bg-secondary shadow-md py-3" : "relative bg-transparent py-3  shadow-sm"
          }`}
      >

        <div className={`flex justify-between  items-center ${isSticky ? "px-6" : "px-6 lg:px-16 "}`}>
          <div className="text-3xl font-extrabold tracking-widest merriweather-font">STEPS</div>

          <nav className="hidden md:flex gap-4">
            {mainRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {route.label}
              </Link>
            ))}
          </nav>


          <div className="hidden px-4 font-bold py-4 w-[40%] lg:flex nav-bg-base justify-between items-center gap-6 text-sm rounded-lg">
            <div className="relative flex items-center flex-1">
              <Search size={18} className="absolute left-3" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent w-full"
              />
            </div>

            <div className="flex gap-6">
              <Link href="/SignIn" className="flex hover-button items-center gap-1 hover:text-primary transition">
                <User size={22} /> Sign In
              </Link>
              <Link href={'/Cart'} className="flex hover-button items-center gap-1 hover:text-primary transition">
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

            <button
              className="flex hover-button items-center gap-1 px-3 py-1 text-sm border rounded-md hover-secondary transition-colors"
              onClick={toggleLanguage}
            >
              🌐 {language === "EN" ? "English" : "বাংলা"}
            </button>

            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

