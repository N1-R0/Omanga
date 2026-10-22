"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import { PLAN_CHECKOUT_URLS } from "@/config/site";
import { cx } from "@/lib/cx";
import { Button } from "@/new-redesign/components/ui/Button";
import { href } from "@/new-redesign/config/routes";
import { homePrices as copy } from "@/new-redesign/content/home.content";

/**
 * Trip-length switch and the three plan cards (design system § Plan cards).
 *
 * The switch is a radiogroup of two options. It only multiplies the monthly
 * price to show a trip total. Gold is featured: the dark-fabric texture
 * under a scrim with white text and the white button. Silver and Diamond
 * use the secondary button, so the hero keeps the page's crimson primary.
 * Below 1024 the cards stack with Gold first.
 */
const usd = (n: number) => `$${n.toLocaleString("en-GB")}`;

export function PlanCards() {
  const [months, setMonths] = useState<number>(copy.trips[0].months);
  const groupId = useId();

  return (
    <>
      <div role="radiogroup" aria-labelledby={groupId} className="mb-6 flex items-center gap-3">
        <span id={groupId} className="type-p2 text-text-secondary">
          {copy.tripLabel}
        </span>
        <span className="inline-flex rounded-md bg-surface-muted p-1">
          {copy.trips.map((t) => (
            <button
              key={t.months}
              type="button"
              role="radio"
              aria-checked={months === t.months}
              onClick={() => setMonths(t.months)}
              className={cx(
                "type-p3 rounded-md px-3 py-2 transition-colors duration-[var(--duration-fast)]",
                months === t.months ? "bg-surface text-text shadow-[0_1px_3px_rgb(20_4_9/0.08)]" : "text-text-secondary hover:text-text",
              )}
            >
              {t.label}
            </button>
          ))}
        </span>
      </div>

      <ul className="grid grid-gap lg:grid-cols-3">
        {copy.plans.map((plan) => {
          const featured = plan.featured;
          return (
            <li
              key={plan.name}
              className={cx(
                "relative isolate flex flex-col gap-8 overflow-hidden rounded-xs border px-6 pt-6 pb-8",
                featured ? "order-first border-transparent text-text-inverse lg:order-none" : "border-border bg-surface",
              )}
            >
              {featured ? (
                <>
                  <Image src={copy.featuredTexture} alt="" fill sizes="(min-width: 1024px) 350px, 100vw" className="-z-20 object-cover" />
                  <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(20_4_9/0.5),rgb(20_4_9/0.7))]" />
                </>
              ) : null}

              <div className="flex flex-1 flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="type-h3 flex h-[18px] items-center gap-2">
                    {plan.name}
                    {featured ? (
                      // -my-1 keeps the tag from making this title taller than the others.
                      <span className="type-p2 -my-1 rounded-full border border-neutral-0/40 bg-neutral-0/15 px-2 py-0.5">{copy.popular}</span>
                    ) : null}
                  </h3>
                  {/* Two lines reserved from 1024 so the three prices line up. */}
                  <p className={cx("type-p2 lg:min-h-[42px]", featured ? "text-text-inverse/85" : "text-text-secondary")}>{plan.description}</p>
                </div>

                <div>
                  <p className="flex items-baseline gap-2">
                    <span className="type-h2">{usd(plan.price)}</span>
                    <span className={cx("type-p2", featured ? "text-text-inverse/85" : "text-text-secondary")}>{copy.perMonth}</span>
                  </p>
                  <p aria-live="polite" className={cx("type-p2 mt-1", featured ? "text-text-inverse/85" : "text-text-secondary")}>
                    {copy.totalFor(usd(plan.price * months), months)}
                  </p>
                </div>

                <div className={cx("border-t pt-5", featured ? "border-neutral-0/25" : "border-border")}>
                  <p className="type-p3">
                    {copy.accessLabel}: {plan.access}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {plan.included.map((item) =>
                      // "Everything in Silver, plus:" introduces the list; it gets no tick.
                      item.endsWith(":") ? (
                        <li key={item} className={cx("type-p2", featured ? "text-text-inverse/85" : "text-text-secondary")}>
                          {item}
                        </li>
                      ) : (
                        <li key={item} className="type-p2 flex items-start gap-2">
                          <Tick className={featured ? "text-text-inverse" : "text-accent-text"} />
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <span className="[&>a]:w-full">
                <Button href={PLAN_CHECKOUT_URLS[plan.name]} external variant={featured ? "inverse" : "secondary"}>
                  {plan.action}
                </Button>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="type-p2 text-text-secondary">{copy.footnote}</p>
        <Link href={href(copy.link.path)} className="type-p3 shrink-0 text-accent-text hover:underline">
          {copy.link.label} →
        </Link>
      </div>
    </>
  );
}

function Tick({ className }: { className: string }) {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className={cx("mt-0.5 shrink-0", className)}>
      <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
