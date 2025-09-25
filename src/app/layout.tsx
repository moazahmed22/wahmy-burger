import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CategoryFilterProvider } from "./CategoryFilter-provider";
import AuthProvider from "./context/AuthProvider/AuthProvider";
import { CartProvider } from "./context/CartContext/CartContext";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "./context/WishlistContext/WishlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wahmy burger",
  description:
    "Wahmy Burger is a fast and convenient online ordering platform for one of the city’s favorite burger spots. The website brings the full restaurant menu to your fingertips, letting you browse delicious burgers, sides, drinks, and desserts in a clean and modern interface.",
  icons: {
    icon: "/identity/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Toaster position="top-right" reverseOrder={false} />
              <Navbar />
              <CategoryFilterProvider>{children}</CategoryFilterProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
