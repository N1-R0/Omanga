"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { PAYMENTS_URL } from "../lib/links";

const NAV_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Payments", href: PAYMENTS_URL, external: true },
  { label: "Insurance", href: "/insurance" },
  { label: "Plans", href: "/plans" },
  { label: "Contact", href: "/contact" },
];

const HERO_THRESHOLD = 560;
const HIDE_THRESHOLD = 80;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [solid, setSolid] = useState(!isHome);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      setSolid(!isHome || y > HERO_THRESHOLD || menuOpen);

      if (menuOpen) {
        setHidden(false);
      } else if (y > lastY.current && y > HIDE_THRESHOLD) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,box-shadow,border-color] duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        solid
          ? "border-white/10 bg-maroon-950/95 shadow-lg shadow-black/20 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="group flex items-center">
          <Logo className="h-12 w-12 transition-transform duration-300 group-hover:scale-105" />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-white/75 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group relative rounded-full px-4 py-2.5 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className={active ? "text-white" : ""}>
                  {link.label}
                </span>
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    active ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/insurance"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-maroon-950 transition-transform duration-200 hover:scale-105 hover:bg-white/90 active:scale-95 sm:inline-block"
          >
            Get Insurance
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
          >
            <span
              className={`h-px w-5 bg-white transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-white transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px w-5 bg-white transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-maroon-950/95 backdrop-blur transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-6 py-5">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/75 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/insurance"
            className="mt-3 rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-maroon-950 transition-transform active:scale-95"
          >
            Get Insurance
          </Link>
        </nav>
      </div>
    </header>
  );
}
