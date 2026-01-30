import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import Breadcrumbs from "@/components/nav/Breadcrumbs";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Header />
        <Breadcrumbs hideOnMicrosite />
        {children}
        <Footer />
      </body>
    </html>
  );
}
