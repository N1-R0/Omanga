import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { RATE_PAIRS } from "@/content/rates.content";
import { crossMatrix, formatRateDate, getNgnRates } from "@/lib/rates";
import { buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { RateHero } from "@/new-redesign/components/sections/rates/RateHero";
import { WalletClosing } from "@/new-redesign/components/sections/wallet/WalletClosing";
import { Flag } from "@/new-redesign/components/ui/Flag";
import { ratesHub } from "@/new-redesign/content/rates.content";

export const metadata: Metadata = buildPageMetadata(ratesHub.meta);

const FLAGS = { GBP: "/flags/united-kingdom.svg", USD: "/flags/united-states.svg", CAD: "/flags/canada.svg" } as const;

const nf = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 2 });

export default async function RatesHubPage() {
  const { rates, date } = await getNgnRates();
  const updated = formatRateDate(date) ?? "latest available";
  const matrix = crossMatrix(rates);

  return (
    <>
      <JsonLd
        graph={buildPageGraph(ratesHub.meta, {
          crumb: "Exchange rates",
          parent: { name: "Payments", path: "/payments" },
        })}
      />

      <RateHero
        headingId="rates-heading"
        heading={ratesHub.heading}
        note={ratesHub.note}
        code="USD"
        matrix={matrix}
        updated={updated}
      />

      <section aria-labelledby="rates-list" className="section-y">
        <div className="container-page flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 id="rates-list" className="type-h2">
              {ratesHub.listHeading}
            </h2>
            <p className="type-p1 text-text-secondary">
              Reference rates, {updated}. {ratesHub.listNote}
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {RATE_PAIRS.map((pair) => (
              <li key={pair.slug}>
                <Link
                  href={`/rates/${pair.slug}`}
                  className="flex h-full flex-col gap-6 rounded-[16px] bg-surface-muted p-6 transition-colors hover:bg-neutral-200"
                >
                  <span className="flex items-center gap-3">
                    <Flag src={FLAGS[pair.code]} size={28} />
                    <span className="type-p1">
                      {pair.plural.charAt(0).toUpperCase() + pair.plural.slice(1)} to naira
                    </span>
                  </span>
                  <span className="type-h3">
                    {pair.symbol}1 = ₦{nf.format(rates[pair.code])}
                  </span>
                  <span className="type-p2 text-accent-text underline underline-offset-4">
                    See the {pair.code} to NGN rate
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WalletClosing />
    </>
  );
}
