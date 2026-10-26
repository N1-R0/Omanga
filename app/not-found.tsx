import type { Metadata } from "next";
import Link from "next/link";

import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentedAnalytics } from "@/components/consent/ConsentedAnalytics";
import { ConsentPreferences } from "@/new-redesign/components/consent/ConsentPreferences";
import { CookieBanner } from "@/new-redesign/components/consent/CookieBanner";
import { Footer } from "@/new-redesign/components/layout/Footer";
import { Header } from "@/new-redesign/components/layout/Header";
import { Button } from "@/new-redesign/components/ui/Button";
import { fontVariables } from "@/new-redesign/config/fonts";
import { href } from "@/new-redesign/config/routes";
import { notFound } from "@/new-redesign/content/not-found.content";
import "@/new-redesign/styles/globals.css";

/**
 * The 404 page, in the new design (cutover, 2026-10-26).
 *
 * It carries its own `<html>` because the app has two root layouts and no
 * app/layout.tsx: an unmatched URL belongs to neither group, so Next renders
 * this file at the root with no layout around it. Next sends a real 404.
 *
 * `noindex, follow`: the footer's links are worth following from here.
 */
export const metadata: Metadata = {
  title: { absolute: notFound.meta.title },
  description: notFound.meta.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="relative flex min-h-full flex-col">
        <ConsentProvider>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1">
            <section className="pt-40 pb-24 md:pt-48 md:pb-32">
              <div className="container-page flex max-w-[640px] flex-col gap-8">
                <div className="flex flex-col gap-[var(--head-sub-gap)]">
                  <p className="type-p2 inline-flex items-center gap-2">
                    <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
                    {notFound.eyebrow}
                  </p>
                  <h1 className="type-h1">{notFound.title}</h1>
                  <p className="type-p1 text-text-secondary">{notFound.text}</p>
                </div>
                <div>
                  <Button href={href(notFound.action.path)}>{notFound.action.label}</Button>
                </div>
                <div className="border-t border-border pt-6">
                  <h2 className="type-p2 text-text-secondary">{notFound.linksTitle}</h2>
                  <ul className="mt-3 flex flex-col gap-1">
                    {notFound.links.map((l) => (
                      <li key={l.path}>
                        <Link href={href(l.path)} className="type-p1 text-accent-text hover:underline">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <CookieBanner />
          <ConsentPreferences />
          <ConsentedAnalytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
