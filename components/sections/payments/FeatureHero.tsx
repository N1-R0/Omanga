import Link from "next/link";

import { WALLET_URL } from "@/config/site";
import { FeatureScreen } from "@/components/sections/home/FeatureScreen";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { href } from "@/config/routes";
import type { PaymentsFeature } from "@/content/payments-features.content";
import { walletHero } from "@/content/wallet.content";

export function FeatureHero({ crumb, hero }: Pick<PaymentsFeature, "crumb" | "hero">) {
  const { photo } = walletHero;

  return (
    <section aria-labelledby="feature-hero-title" className="bg-bg">
      <div className="container-page grid items-center gap-10 pt-[calc(76px+48px)] pb-12 md:pb-16 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-16 lg:pt-[calc(76px+72px)] lg:pb-20">
        <div className="flex flex-col items-start">
          <nav aria-label="Breadcrumb">
            <ol className="type-p2 flex items-center gap-2 text-text-secondary">
              <li>
                <Link href={href("/payments")} className="hover:text-text hover:underline">
                  Payments
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li aria-current="page" className="text-text">
                {crumb}
              </li>
            </ol>
          </nav>
          <h1 id="feature-hero-title" className="type-h1 mt-5 max-w-[14ch] text-balance">
            {hero.title}
          </h1>
          <p className="type-p1 mt-5 max-w-[460px] text-text-secondary">{hero.sub}</p>
          <div className="mt-8">
            <Button href={WALLET_URL} external>
              {hero.cta} <span aria-hidden className="ml-2">→</span>
            </Button>
          </div>
        </div>

        <div className="relative isolate -mx-4 flex justify-center px-4 py-12 md:mx-0 md:px-10 md:py-16">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden md:rounded-sm">
            <Photo src={photo.src} alt="" fill preload sizes="(min-width: 1024px) 500px, 100vw" className="object-cover" style={{ objectPosition: photo.position }} />
          </div>
          <div className="glass w-full max-w-[340px]">
            <FeatureScreen screen={hero.screen} gbpToNgn={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
