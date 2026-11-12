import Image from "next/image";
import Link from "next/link";

import { CookieSettingsButton } from "@/new-redesign/components/consent/CookieSettingsButton";
import { href } from "@/new-redesign/config/routes";
import { footer } from "@/new-redesign/content/footer.content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-10 md:py-12">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[264px_1fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Link href={href("/")} aria-label={footer.homeLabel} className="self-start rounded-[16px]">
              <Image src="/logo-omanga-2026.svg" alt="" width={109} height={22} />
            </Link>
            <p className="type-p2 text-text-secondary">{footer.blurb}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-10 md:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <p className="type-p3">{col.heading}</p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"external" in l && l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="type-p2 text-text-secondary hover:text-text">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="type-p2 text-text-secondary hover:text-text">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-3">
            <p className="type-p2 max-w-[720px] text-text-secondary">{footer.whosWho}</p>
            <p className="type-p2 text-text-secondary">{footer.copyright(year)}</p>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 lg:shrink-0">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="type-p3 text-text hover:text-accent-text">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="type-p3 text-text hover:text-accent-text" />
            </li>
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="type-p3 text-text hover:text-accent-text">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
