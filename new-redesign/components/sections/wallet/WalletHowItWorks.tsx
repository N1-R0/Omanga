import Link from "next/link";

import { getNgnRates } from "@/lib/rates";
import { Flag } from "@/new-redesign/components/ui/Flag";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { href } from "@/new-redesign/config/routes";
import { walletLeftover } from "@/new-redesign/content/wallet.content";

/**
 * 8 · Leftover naira (design system § Leftover converter), as wireframed
 * (owner, 2026-10-23): the header and three steps beside a white card that
 * converts a fixed ₦50,000 into dollars at the live USD rate, from the same
 * hourly snapshot as section 6. A plain card, not the satin panel, so it
 * doesn't repeat section 6 two sections later.
 */
const naira = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const dollars = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export async function WalletLeftover() {
  const { eyebrow, title, sub, steps, cta, card } = walletLeftover;
  const { rates, date } = await getNgnRates();
  const usd = rates.USD;

  return (
    <Section id="leftover" label={eyebrow}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
          <ol className="border-b border-border">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 border-t border-border py-3.5">
                <span className="type-p3 pt-0.5 text-text-secondary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="type-p1">{s}</span>
              </li>
            ))}
          </ol>
          <Link href={href(cta.path)} className="type-p3 mt-8 inline-flex rounded-xs text-accent-text hover:underline hover:underline-offset-4">
            {cta.label} <span aria-hidden className="ml-1">→</span>
          </Link>
        </div>

        <figure className="rounded-xs border border-border bg-surface p-6">
          <figcaption className="type-p3 text-text-secondary">{card.label}</figcaption>
          {/* The two fields and the round convert icon on their seam, after the
              home hero converter (owner, 2026-10-23). Static here: the icon
              is decorative, not a swap button. */}
          <div className="relative mt-4 grid gap-2">
            <div className="flex items-center gap-3 rounded-md border border-border-strong px-4 py-3">
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="type-p2 text-text-secondary">{card.from.name}</span>
                <span className="type-h2 tabular-nums">₦{naira.format(card.naira)}</span>
              </div>
              <span className="type-p2 flex items-center gap-2">
                <Flag src={card.from.flag} size={24} />
                NGN
              </span>
            </div>

            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 z-10 inline-flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface text-text shadow-[0_2px_8px_rgb(20_4_9/0.08)]"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 3v13m0 0-3-3m3 3 3-3M13 17V4m0 0-3 3m3-3 3 3" />
              </svg>
            </span>

            <div className="flex items-center gap-3 rounded-md bg-surface-muted px-4 py-3">
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="type-p2 text-text-secondary">{card.to.name}</span>
                <span className="type-h2 tabular-nums">${dollars.format(card.naira / usd)}</span>
              </div>
              <span className="type-p2 flex items-center gap-2">
                <Flag src={card.to.flag} size={24} />
                USD
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
            <span className="type-p2 text-text-secondary">{card.rateLabel}</span>
            <span className="type-p3 whitespace-nowrap tabular-nums">$1 = ₦{naira.format(usd)}</span>
          </div>
          {/* Non-breaking hyphens, so the date never splits across lines on mobile. */}
          <p className="type-p3 mt-2 text-text-secondary">{card.note(date?.replaceAll("-", "‑") ?? null)}</p>
        </figure>
      </div>
    </Section>
  );
}
