"use client";

import Link from "next/link";
import { useState } from "react";

import { cx } from "@/lib/cx";
import { FeatureLottie } from "@/new-redesign/components/sections/home/FeatureLottie";
import { Card } from "@/new-redesign/components/ui/Card";
import { href } from "@/new-redesign/config/routes";
import { homeInsurance as copy, homePrices } from "@/new-redesign/content/home.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

export function InsuranceCard() {
  const plans = homePrices.plans;
  const [picked, setPicked] = useState(plans.findIndex((p) => p.featured));
  const plan = plans[picked];
  const price = `$${plan.price} ${copy.perMonth}`;

  return (
    <article aria-labelledby="insurance-title">
      <Card className="grid gap-6 p-3 md:p-4 lg:grid-cols-2 lg:gap-0">
        <div className="relative isolate flex h-[486px] flex-col justify-end overflow-hidden rounded-sm text-text-inverse md:h-[540px] lg:h-[566px]">
          <Photo src={copy.photo.src} alt="" fill sizes="(min-width: 1024px) 540px, 100vw" className="-z-20 object-cover" style={{ objectPosition: copy.photo.position }} />
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
