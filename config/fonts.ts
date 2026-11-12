import localFont from "next/font/local";

const hostGrotesk = localFont({
  src: "../styles/fonts/host-grotesk-latin.woff2",
  weight: "400 500",
  display: "swap",
  variable: "--font-host-grotesk",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const inter = localFont({
  src: "../styles/fonts/inter-latin.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-app",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const fontVariables = `${hostGrotesk.variable} ${inter.variable}`;
