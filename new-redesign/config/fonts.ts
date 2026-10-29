import { Host_Grotesk, Inter } from "next/font/google";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-host-grotesk",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-app",
  preload: false,
});

export const fontVariables = `${hostGrotesk.variable} ${inter.variable}`;
