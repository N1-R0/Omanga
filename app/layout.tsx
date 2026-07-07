import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-[#1c1013]">
        <Header />
        <div className="flex flex-1 flex-col pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
