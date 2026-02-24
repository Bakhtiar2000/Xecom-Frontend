"use client";

import React from "react";
import { Facebook, Heart, Instagram, Mail, MapPin, Phone, X, Youtube } from "lucide-react";
import Link from "next/link";

// Type for social links
interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

// Type for quick links
interface QuickLink {
  name: string;
  path: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "https://facebook.com",
      color: "hover:text-blue-600",
    },
    {
      name: "X",
      icon: <X className="h-5 w-5" />,
      url: "https://x.com",
      color: "hover:text-black dark:hover:text-gray-300",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://instagram.com",
      color: "hover:text-pink-600",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://youtube.com",
      color: "hover:text-red-600",
    },
  ];

  const quickLinks: QuickLink[] = [
    { name: "FAQ", path: "/faq-section" },
    { name: "Home", path: "/" },
    { name: "Component", path: "/BrowseProperties" },
    { name: "More", path: "/become-host" },
  ];
  const shineStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    background: `linear-gradient(
    90deg,
    #000000 0%,
    #645f5f 20%,
    #504545 40%,
    #221f1f 60%,
    #3d3b3b 80%,
    #000000 100%
  )`,
    backgroundSize: "200%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "shine 10s linear infinite",
  };

  return (
    <div>
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 200%;
          }
          100% {
            background-position: -200%;
          }
        }
      `}</style>

      <div className="border-t-2 bg-gray-900 px-4 md:px-0">
        <div className="container pb-0!">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center gap-3">
                <div className="">
                  <h1 className="text-2xl font-bold">
                    <span className="merriweather-font text-gray-100">STEPS</span>
                  </h1>
                  <p className="text-sm text-gray-300">SOLE – Sneakers Simplified</p>
                </div>
              </div>

              <div>
                <p className="mb-6 leading-relaxed text-gray-300">
                  Minimal design. Maximum comfort. Sneakers made for everyday life with timeless
                  style.
                </p>

                {/* Social Media Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border-gray-700 bg-white/20 text-white transition-all duration-300 hover:border-emerald-300 hover:shadow-md ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="mb-4 text-lg font-semibold text-gray-200">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="group flex items-center gap-2 text-gray-300 transition-colors duration-300 hover:text-emerald-600"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Address */}
                <div className="flex cursor-pointer items-start gap-4 rounded-2xl border border-gray-700 p-4 transition-all duration-300 hover:border-emerald-200 dark:border-gray-700 dark:bg-gray-900">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-200">Our Location</h4>
                    <p className="text-sm leading-relaxed text-gray-300">
                      Sylhet, Bangladesh
                      <br />
                      Merrick Way, FL 12345
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex cursor-pointer items-start gap-4 rounded-2xl border border-gray-700 p-4 transition-all duration-300 hover:border-emerald-200 dark:border-gray-700 dark:bg-gray-900">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-200">Phone Number</h4>
                    <a
                      href="tel:+8801902042884"
                      className="text-sm text-gray-300 transition-colors duration-300 hover:text-emerald-600"
                    >
                      +880 1902-042884
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex cursor-pointer items-start gap-4 rounded-2xl border border-gray-700 p-4 transition-all duration-300 hover:border-emerald-200 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-emerald-800">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-200">Email Address</h4>
                    <a
                      href="mailto:endgameprogramm10@gmail.com"
                      className="text-sm text-gray-300 transition-colors duration-300 hover:text-emerald-600"
                    >
                      support@ezrent.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex cursor-pointer items-start gap-4 rounded-2xl border border-gray-700 p-4 transition-all duration-300 hover:border-emerald-200 dark:border-gray-700 dark:bg-gray-900">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                    <div className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-200">Business Hours</h4>
                    <p className="text-sm leading-relaxed text-gray-300">
                      Mon - Sun: 24/7
                      <br />
                      Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="w-full text-center text-[clamp(40px,10vw,250px)] font-bold">
            <span style={shineStyle} className="merriweather-font inline-block w-full px-2 md:px-4">
              STEPS SHOES
            </span>
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="container py-2! md:py-3!">
            <div className="flex flex-col items-center justify-between gap-2 text-sm md:flex-row">
              <div className="text-gray-300">
                © {new Date().getFullYear()} STEPS. All rights reserved.
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                Made with
                <Heart className="h-4 w-4 fill-current text-red-500" />
                by{" "}
                <a
                  href="#"
                  className="font-medium text-emerald-600 transition-colors duration-300 hover:underline"
                >
                  Md. Shakib Khan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
