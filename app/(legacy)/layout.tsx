import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

/**
 * Root layout for the pre-redesign pages — LEGACY.
 *
 * One of two root layouts; the other is `app/(redesign)/layout.tsx`. There is
 * no `app/layout.tsx`, which is what makes both legal and keeps the old
 * stylesheet, fonts and chrome off the redesigned pages entirely.
 *
 * Next step in the migration: swap `Header` and `Footer` here for the new ones
 * once Phase 2 builds them, so navigation chrome is consistent across the site
 * while these page bodies are still being migrated.
 *
 * Nothing here should be extended. This whole group is deleted once the last
 * page moves into `(redesign)`.
 */


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
  icons: {
    icon: "/logo-omanga.svg",
    apple: "/logo-omanga.svg",
  },
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
      </body>
    </html>
  );
}
