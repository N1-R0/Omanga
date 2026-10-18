import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { V2Section } from "@/components/home-v2/V2Section";
import { Container } from "@/components/layout/Container";
import { RateConverterBar } from "@/components/rates/RateConverterBar";
import { RateMatrix } from "@/components/rates/RateMatrix";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { HERO_PRIMARY_ACTION } from "@/content/hero.content";
import {
  RATE_PAIRS,
  getRatePair,
  rateCopy,
  rateFaq,
  rateMeta,
} from "@/content/rates.content";
import { crossMatrix, getNgnRates } from "@/lib/rates";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

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

const formatDate = (iso: string | null) =>
  iso === null
    ? null
    : new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });

export default async function RatePage(props: PageProps<"/rates/[pair]">) {
  const { pair: slug } = await props.params;
  const pair = getRatePair(slug);
  if (pair === undefined) notFound();

  const { rates, date } = await getNgnRates();
  const rate = rates[pair.code];
  const updated = formatDate(date) ?? "latest available";
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

      {/*
        R1 (Wise currency converter, mobbin 669f7e5e): a short plum band with
        the h1, and the converter card laid across its bottom edge. The band's
        bottom padding and the card's negative margin are the same value, so
        the card sits half on the band and half on the page below.
      */}
      <section aria-labelledby={headingId} className="text-ink">
        <div className="bg-brand-deep pt-fluid-8 pb-[clamp(6rem,10vw,9rem)] text-on-dark">
          <Container>
            <div className="flex flex-col items-center gap-fluid-3 text-center">
              <p className="font-sans text-small font-semibold tracking-wide text-on-dark/80 uppercase">
                {copy.eyebrow}
              </p>
              <h1
                id={headingId}
                className="font-heading text-h1 font-semibold text-balance"
              >
                {copy.heading}
              </h1>
              <p className="max-w-[52ch] font-sans text-main text-on-dark/85">
                {copy.sourceNote}
              </p>
            </div>
          </Container>
        </div>
        <Container>
          <div className="-mt-[clamp(4.5rem,7vw,6.5rem)] mx-auto max-w-[64rem]">
            <RateConverterBar
              code={pair.code}
              rate={rate}
              updated={updated}
              action={HERO_PRIMARY_ACTION}
            />
          </div>
        </Container>
      </section>

      {/* [REMOVED, 2026-10-18] R2 30-day chart, on the owner's instruction. */}

      {/* M1 (Wise top currencies, mobbin b54e2297): the rate matrix. */}
      <V2Section
        labelledBy={`${headingId}-matrix`}
        className="bg-surface-light text-ink"
      >
        <div className="mx-auto flex max-w-[64rem] flex-col gap-fluid-5">
          <h2
            id={`${headingId}-matrix`}
            className="font-sans text-h2 text-balance"
          >
            {copy.matrixHeading}
          </h2>
          <RateMatrix
            matrix={crossMatrix(rates)}
            current={pair.code}
            caption={copy.matrixCaption}
          />
          <p className="font-sans text-small text-secondary">
            Mid-market rate, {updated}.
          </p>
        </div>
      </V2Section>

      <V2Section labelledBy={`${headingId}-steps`}>
        <div className="flex flex-col gap-fluid-6">
          <h2
            id={`${headingId}-steps`}
            className="font-sans text-h2 text-balance"
          >
            {copy.stepsHeading}
          </h2>
          <ol className="grid gap-fluid-5 desktop:grid-cols-3">
            {copy.steps.map((step, index) => (
              <li key={step.heading} className="flex flex-col gap-fluid-2">
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-pill bg-support-strong font-sans text-small text-on-dark"
                >
                  {index + 1}
                </span>
                <h3 className="font-sans text-h4">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.heading}
                </h3>
                <p className="font-sans text-main text-secondary">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-fluid-2 border-t border-border-hairline pt-fluid-6">
            <h2 className="font-sans text-h3">{copy.midMarketHeading}</h2>
            {copy.midMarketBody.map((line) => (
              <p
                key={line}
                className="font-sans text-main text-secondary measure-body"
              >
                {line}
              </p>
            ))}
          </div>

          <nav
            aria-labelledby={`${headingId}-other`}
            className="flex flex-col gap-fluid-2 border-t border-border-hairline pt-fluid-6"
          >
            <h2 id={`${headingId}-other`} className="font-sans text-h3">
              {copy.otherRatesHeading}
            </h2>
            <ul className="flex flex-wrap gap-fluid-2">
              {RATE_PAIRS.filter((other) => other.slug !== pair.slug).map(
                (other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/rates/${other.slug}`}
                      className="inline-flex rounded-pill bg-surface-light px-4 py-2 font-sans text-main text-ink underline-offset-4 hover:underline focus-ring"
                    >
                      {other.code} to NGN
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link
                  href="/payments"
                  className="inline-flex rounded-pill bg-surface-light px-4 py-2 font-sans text-main text-ink underline-offset-4 hover:underline focus-ring"
                >
                  About the Omanga wallet
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </V2Section>

      <Faq
        content={{ heading: copy.faqHeading, items: faqItems }}
        headingId={`${headingId}-faq`}
      />
    </>
  );
}
