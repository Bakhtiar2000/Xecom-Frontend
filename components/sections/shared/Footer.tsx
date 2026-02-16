"use client";

import React from "react";
import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  X,
  Youtube,
} from "lucide-react";
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
      icon: <Facebook className="w-5 h-5" />,
      url: "https://facebook.com",
      color: "hover:text-blue-600",
    },
    {
      name: "X",
      icon: <X className="w-5 h-5" />,
      url: "https://x.com",
      color: "hover:text-black dark:hover:text-gray-300",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://instagram.com",
      color: "hover:text-pink-600",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
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

      <div className="border-t-2 px-4 md:px-0 bg-gray-900 ">
        <div className="container pb-0!">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 ">
              <div className="flex   items-center gap-3 mb-6">
                <div className="">
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-100 merriweather-font">
                      STEPS
                    </span>
                  </h1>
                  <p className="text-sm text-gray-300">
                    SOLE – Sneakers Simplified
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Minimal design. Maximum comfort. Sneakers made for everyday
                  life with timeless style.
                </p>

                {/* Social Media Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white/20 border-gray-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:border-emerald-300 hover:shadow-md ${social.color}`}
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
              <h3 className="text-lg font-semibold text-gray-200 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-gray-300 hover:text-emerald-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="flex items-start cursor-pointer gap-4 p-4 dark:border-gray-700 dark:bg-gray-900 rounded-2xl border border-gray-700 hover:border-emerald-200 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">
                      Our Location
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Sylhet, Bangladesh
                      <br />
                      Merrick Way, FL 12345
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start cursor-pointer gap-4 p-4 dark:border-gray-700 dark:bg-gray-900 rounded-2xl border border-gray-700 hover:border-emerald-200 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">
                      Phone Number
                    </h4>
                    <a
                      href="tel:+8801902042884"
                      className="text-gray-300 text-sm hover:text-emerald-600 transition-colors duration-300"
                    >
                      +880 1902-042884
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start cursor-pointer gap-4 p-4 dark:bg-gray-900 rounded-2xl border border-gray-700 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">
                      Email Address
                    </h4>
                    <a
                      href="mailto:endgameprogramm10@gmail.com"
                      className="text-gray-300 text-sm hover:text-emerald-600 transition-colors duration-300"
                    >
                      support@ezrent.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start cursor-pointer dark:border-gray-700 gap-4 p-4 dark:bg-gray-900 rounded-2xl border border-gray-700 hover:border-emerald-200 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">
                      Business Hours
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Mon - Sun: 24/7
                      <br />
                      Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-[clamp(40px,10vw,250px)] w-full text-center font-bold">
            <span
              style={shineStyle}
              className="inline-block w-full px-2 md:px-4 merriweather-font"
            >
              STEPS SHOES
            </span>
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="container py-2! md:py-3!">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
              <div className="text-gray-300">
                © {new Date().getFullYear()} STEPS. All rights reserved.
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                Made with
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                by{" "}
                <a
                  href="#"
                  className="text-emerald-600 font-medium hover:underline transition-colors duration-300"
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
