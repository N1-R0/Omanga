import Logo from "./Logo";
import Reveal from "./Reveal";
import { PAYMENTS_URL } from "../lib/links";

type FooterLink = { label: string; href: string; external?: boolean };

const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Omanga Payment Solution", href: PAYMENTS_URL, external: true },
      { label: "Travel insurance", href: "/insurance" },
      { label: "Plans", href: "/plans" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/contact" },
      { label: "Our Mission", href: "/contact" },
      { label: "Partners", href: "/contact" },
    ],
  },
  {
    title: "Contact",
    links: [{ label: "info.omanga.biz", href: "mailto:info.omanga.biz" }],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black px-6 pt-20 pb-10 text-white lg:px-10">
      <Reveal className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo className="h-12 w-12" />
            <p className="max-w-xs text-sm text-white/50">
              Travel tips, destination guides, and the infrastructure that
              makes African journeys seamless.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-white">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center text-sm text-white/50 transition-colors hover:text-white"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© 2026 Omanga. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/contact" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="/contact" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="/contact" className="transition-colors hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
