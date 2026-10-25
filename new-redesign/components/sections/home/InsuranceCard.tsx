"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cx } from "@/lib/cx";
import { FeatureLottie } from "@/new-redesign/components/sections/home/FeatureLottie";
import { Card } from "@/new-redesign/components/ui/Card";
import { href } from "@/new-redesign/config/routes";
import { homeInsurance as copy, homePrices } from "@/new-redesign/content/home.content";

/**
 * Insurance in "Payments and insurance" (HomeProducts; home structure v2
 * § 4). One white parent Card, like the Payments card (owner, 2026-10-25):
 * same padding and box heights, with the photo box on the left and the chat
 * half on the right from 1024px. Below that the photo comes first, so the
 * pills sit above the chat they drive.
 *
 * Photo box, after the owner's "Trusted Across Borders" reference: a dark
 * fade up from its foot, the title (the H3) and sub, the three plans as pill
 * buttons (a radio group) and the picked plan's price on the right. The
 * picked pill is solid white, the others white outlines.
 *
 * Chat half: the picked plan's Jitter chat (customer asks, Omanga types and
 * replies, the plan row pops in) plays in the space above, remounted from
 * its first frame whenever the plan changes. Under it sit the plan's name,
 * description and buy link, plus its price and hospitals for screen readers,
 * since the chat is decorative.
 */
export function InsuranceCard() {
  const plans = homePrices.plans;
  const [picked, setPicked] = useState(plans.findIndex((p) => p.featured));
  const plan = plans[picked];
  const price = `$${plan.price} ${copy.perMonth}`;

  return (
    <article aria-labelledby="insurance-title">
      <Card className="grid gap-6 p-3 md:p-4 lg:grid-cols-2 lg:gap-0">
        <div className="relative isolate flex h-[486px] flex-col justify-end overflow-hidden rounded-sm text-text-inverse md:h-[540px] lg:h-[566px]">
          <Image src={copy.photo.src} alt="" fill sizes="(min-width: 1024px) 540px, 100vw" className="-z-20 object-cover" style={{ objectPosition: copy.photo.position }} />
          <span aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[rgb(20_4_9/0.85)] via-[rgb(20_4_9/0.45)] to-transparent" />

          <div className="flex flex-col gap-2 p-5 md:p-8">
            <h3 id="insurance-title" className="type-h3 text-[24px] leading-tight text-balance">
              {copy.title}
            </h3>
            <p className="type-p1 text-text-inverse/85">{copy.sub}</p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              <div role="radiogroup" aria-label={copy.plansLabel} className="flex flex-wrap gap-2">
                {plans.map((p, i) => {
                  const on = i === picked;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setPicked(i)}
                      className={cx(
                        "type-p3 rounded-full border px-4 py-2 uppercase tracking-[0.04em] transition-colors duration-[var(--duration-fast)]",
                        on ? "border-[#fff] bg-[#fff] text-text" : "border-[#fff]/70 text-text-inverse hover:bg-[#fff]/15",
                      )}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
              <p aria-hidden className="type-p3 uppercase tracking-[0.06em] tabular-nums">
                {price}
              </p>
            </div>
          </div>
        </div>

        <div aria-live="polite" className="flex flex-col px-3 pb-5 md:px-6 lg:px-10 lg:pb-6">
          <FeatureLottie key={plan.name} scene={copy.chats[plan.name]} active className="mx-auto aspect-[440/360] w-full max-w-[440px] lg:my-auto" />

          <div className="mt-4 flex flex-col gap-2">
            <p className="type-h3 text-[24px] leading-tight">{copy.planTitle(plan.name)}</p>
            <p className="type-p1 text-text-secondary">{plan.description}</p>
            <p className="sr-only">
              {price}. {copy.hospitals(plan.access)}.
            </p>
            <Link href={href(copy.path)} className="type-p3 mt-2 text-accent-text hover:underline">
              {copy.cta(plan.name)} →
            </Link>
          </div>
        </div>
      </Card>
    </article>
  );
}
