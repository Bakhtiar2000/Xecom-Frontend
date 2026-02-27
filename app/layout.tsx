import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Xecom | Your Trusted E-commerce Platform",
    template: "%s | Xecom",
  },

  description:
    "Discover amazing products at unbeatable prices. Shop from thousands of items with fast delivery on Xecom.",

  keywords: [
    "Xecom",
    "E-commerce Platform",
    "Sneakers",
    "Buy Products Online",
    "Shoes",
    "Online Shopping",
  ],

  icons: {
    icon: "/favicon.ico",
  },

  metadataBase: new URL("https://xecom.com"),

  openGraph: {
    title: "Xecom",
    description: "Your trusted destination for online shopping and great deals.",
    url: "https://xecom.com",
    siteName: "Xecom",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xecom E-commerce Platform",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Xecom",
    description: "Shop smarter with Xecom U+2013 quality products, best prices.",
    creator: "@xecom",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
