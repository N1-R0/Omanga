import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { V2Section } from "@/components/home-v2/V2Section";
import { RateMatrix } from "@/components/rates/RateMatrix";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  RATE_PAIRS,
  getRatePair,
  rateCopy,
  rateFaq,
  rateMeta,
} from "@/content/rates.content";
import { crossMatrix, formatRateDate, getNgnRates } from "@/lib/rates";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { RateHero } from "@/new-redesign/components/sections/rates/RateHero";
import { WalletClosing } from "@/new-redesign/components/sections/wallet/WalletClosing";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { OLD_PAGE_FAQ_SUB, oldPageFaq } from "@/new-redesign/content/old-pages.content";

/**
 * [ADDED, 2026-10-18] Live exchange-rate pages: /rates/pounds-to-naira,
 * /rates/dollars-to-naira, /rates/canadian-dollars-to-naira. Copy and the
 * reasons for them are in `content/rates.content.ts`.
 *
 * Statically generated, then refreshed in the background: `getNgnRates`
 * fetches with `revalidate: 3600`, so each page is rebuilt at most hourly
 * (ISR, the previous caching model; Cache Components is off). Only the three
 * pairs exist; any other /rates/* path 404s.
 *
 * No animation and no client-only content: every figure, table and answer is
 * in the server HTML, so crawlers see the rate (owner's crawlability rule).
 * The converter is the one interactive part and it renders with a value.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return RATE_PAIRS.map((pair) => ({ pair: pair.slug }));
}

export async function generateMetadata(
  props: PageProps<"/rates/[pair]">,
): Promise<Metadata> {
  const { pair: slug } = await props.params;
  const pair = getRatePair(slug);
  return pair === undefined ? {} : buildPageMetadata(rateMeta(pair));
}

export default async function RatePage(props: PageProps<"/rates/[pair]">) {
  const { pair: slug } = await props.params;
  const pair = getRatePair(slug);
  if (pair === undefined) notFound();

  const { rates, date } = await getNgnRates();
  const rate = rates[pair.code];
  const updated = formatRateDate(date) ?? "latest available";
  const copy = rateCopy(pair);
  const meta = rateMeta(pair);
  const faqItems = rateFaq(pair, rate, updated);
  const headingId = `rate-${pair.slug}-heading`;

  return (
    <>
      <JsonLd
        graph={buildPageGraph(meta, {
          crumb: copy.heading,
          parent: { name: "Payments", path: "/payments" },
          nodes: [buildFaqPage(meta, faqItems)],
        })}
      />

      <RateHero
        headingId={headingId}
        eyebrow={copy.eyebrow}
        heading={copy.heading}
        note={copy.sourceNote}
        code={pair.code}
        matrix={crossMatrix(rates)}
        updated={updated}
      />

      {/* [REMOVED, 2026-10-18] R2 30-day chart, on the owner's instruction. */}

      {/* M1 (Wise top currencies, mobbin b54e2297): the rate matrix. */}
      <V2Section
        labelledBy={`${headingId}-matrix`}
        className="bg-surface text-text"
      >
        <div className="mx-auto flex max-w-[64rem] flex-col gap-8">
          <h2
            id={`${headingId}-matrix`}
            className="font-sans type-h2 text-balance"
          >
            {copy.matrixHeading}
          </h2>
          <RateMatrix
            matrix={crossMatrix(rates)}
            current={pair.code}
            caption={copy.matrixCaption}
          />
          <p className="font-sans type-p2 opacity-80">
            Reference rate, {updated}. Your exact rate is shown in the app before you confirm.
          </p>
        </div>
      </V2Section>

      <V2Section labelledBy={`${headingId}-steps`}>
        <div className="flex flex-col gap-10">
          <h2
            id={`${headingId}-steps`}
            className="font-sans type-h2 text-balance"
          >
            {copy.stepsHeading}
          </h2>
          <ol className="grid gap-8 lg:grid-cols-3">
            {copy.steps.map((step, index) => (
              <li key={step.heading} className="flex flex-col gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-full bg-brand-700 font-sans type-p2 text-text-inverse"
                >
                  {index + 1}
                </span>
                <h3 className="font-sans type-h3">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.heading}
                </h3>
                <p className="font-sans type-p1 opacity-80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>


          <nav
            aria-labelledby={`${headingId}-other`}
            className="flex flex-col gap-3 border-t border-border pt-10"
          >
            <h2 id={`${headingId}-other`} className="font-sans type-h3">
              {copy.otherRatesHeading}
            </h2>
            <ul className="flex flex-wrap gap-3">
              {RATE_PAIRS.filter((other) => other.slug !== pair.slug).map(
                (other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/rates/${other.slug}`}
                      className="inline-flex rounded-full bg-surface px-4 py-2 font-sans type-p1 text-text underline-offset-4 hover:underline "
                    >
                      {other.code} to NGN
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link
                  href="/payments"
                  className="inline-flex rounded-full bg-surface px-4 py-2 font-sans type-p1 text-text underline-offset-4 hover:underline "
                >
                  About the Omanga wallet
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </V2Section>

      <FaqSection {...oldPageFaq(copy.faqHeading, OLD_PAGE_FAQ_SUB.rates, faqItems)} />

      <WalletClosing />
    </>
  );
}
