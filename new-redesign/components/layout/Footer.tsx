import Image from "next/image";
import Link from "next/link";

import { Button } from "@/new-redesign/components/ui/Button";
import { href } from "@/new-redesign/config/routes";
import { footer } from "@/new-redesign/content/footer.content";

/**
 * Global footer (sitemap § 5, LOCKED; layout after Asset's footer, design
 * system § Final CTA and footer).
 *
 * Left: logo, blurb and the app row (#download, where the header's Download
 * lands). Right: the six locked link columns in a 3 × 2 grid. Under a rule:
 * who provides what, then © and socials.
 *
 * The year is read at render; these pages are static, so it's fixed at build.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-10 md:py-12">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[264px_1fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Link href={href("/")} aria-label={footer.homeLabel} className="self-start rounded-xs">
              <Image src="/logo-omanga-horizontal.svg" alt="" width={110} height={31} />
            </Link>
            <p className="type-p2 text-text-secondary">{footer.blurb}</p>

            <div id={footer.app.id} className="mt-4 flex scroll-mt-24 flex-col gap-3 rounded-md bg-surface-muted p-4">
              <p className="type-h3">{footer.app.title}</p>
              <p className="type-p2 text-text-secondary">{footer.app.text}</p>
              <span>
                <Button href={footer.app.action.href} external variant="secondary">
                  {footer.app.action.label}
                </Button>
              </span>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-10 md:grid-cols-3">
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

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="type-p2 text-text-secondary">{footer.whosWho}</p>
            <p className="type-p2 text-text-secondary">{footer.copyright(year)}</p>
          </div>
          <ul className="flex gap-4">
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
