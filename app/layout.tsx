import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Omanga — Your Seamless Gateway to African Adventures",
  description:
    "Omanga powers seamless travel across 52 African countries with instant insurance and multi-currency payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-[#1c1013]">
        <Header />
        <div className="flex flex-1 flex-col pt-20">{children}</div>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
