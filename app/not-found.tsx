import type { Metadata } from "next";
import Link from "next/link";

import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentedAnalytics } from "@/components/consent/ConsentedAnalytics";
import { ConsentPreferences } from "@/components/consent/ConsentPreferences";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { fontVariables } from "@/config/fonts";
import { href } from "@/config/routes";
import { notFound } from "@/content/not-found.content";
import "@/styles/globals.css";

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
