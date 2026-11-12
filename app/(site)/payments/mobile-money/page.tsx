import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import { FeaturePage } from "@/components/sections/payments/FeaturePage";
import { CountryGlobe } from "@/components/sections/wallet/CountryGlobe";
import { SectionHead } from "@/components/ui/SectionHead";
import { href } from "@/config/routes";
import { mobileMoney, mobileMoneyCountries } from "@/content/payments-features.content";
import { walletCountries } from "@/content/wallet.content";

export const metadata: Metadata = buildPageMetadata(mobileMoney.meta);

export default function MobileMoneyPage() {
  return (
    <FeaturePage page={mobileMoney}>
      <section id="countries" aria-label={mobileMoneyCountries.title} className="section-y bg-surface">
        <div className="container-page">
          <SectionHead title={mobileMoneyCountries.title} sub={mobileMoneyCountries.sub} />
          <CountryGlobe
            countries={walletCountries.countries}
            listLabel={walletCountries.listLabel}
            cta={{ label: walletCountries.cta.label, href: href(walletCountries.cta.path) }}
          />
        </div>
      </section>
    </FeaturePage>
  );
}
