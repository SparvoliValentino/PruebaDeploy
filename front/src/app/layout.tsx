import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";

//Contexto
import { CartProvider } from "@/context/CartContext";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-backgroundLayout">
        <CartProvider>
          <NavBar/>
          {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}
