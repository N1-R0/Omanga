import Image from "next/image";
import Link from "next/link";

import { getNgnRates } from "@/lib/rates";
import { Flag } from "@/new-redesign/components/ui/Flag";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { href } from "@/new-redesign/config/routes";
import { walletRates } from "@/new-redesign/content/wallet.content";

/**
 * 6 · Rate honesty (design system § Rate explainer): three plain points beside
 * a live rate card on the U2 satin in the glass frame, the same panel as
 * section 3. The card is the site's own UI, not an app screen (the app's
 * review screen currently prints GBP → NGN as "1 NGN = £0.0006").
 *
 * Rates come from the hourly public snapshot the hero and the rate pages use.
 */
const SATIN = "/photos/brand/bg-flowing-waves-u2.jpg";
const ngn = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export async function WalletRates() {
  const { eyebrow, title, sub, points, cta, card } = walletRates;
  const { rates, date } = await getNgnRates();

  return (
    <Section id="rates" label={eyebrow}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
          <ul className="flex flex-col gap-5">
            {points.map((p) => (
              <li key={p.title} className="border-t border-border pt-4">
                <h3 className="type-h3">{p.title}</h3>
                <p className="type-p2 mt-2 text-text-secondary">{p.text}</p>
              </li>
            ))}
          </ul>
          <Link href={href(cta.path)} className="type-p3 mt-8 inline-flex rounded-xs text-accent-text hover:underline hover:underline-offset-4">
            {cta.label} <span aria-hidden className="ml-1">→</span>
          </Link>
        </div>

        <div className="relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-sm">
          <Image src={SATIN} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-10 object-cover" />
          <div className="glass w-[76%]">
            <div className="rounded-md bg-surface p-5">
              <h3 className="type-h3">{card.title}</h3>
              <dl className="mt-3">
                {card.rows.map((r) => (
                  <div key={r.code} className="flex items-center justify-between gap-4 border-t border-border py-3.5">
                    <dt className="type-p2 flex items-center gap-3">
                      <Flag src={r.flag} size={24} />
                      <span>
                        {r.label} <span className="text-text-secondary">{r.code}</span>
                      </span>
                    </dt>
                    <dd className="type-h3 tabular-nums">₦{ngn.format(rates[r.code])}</dd>
                  </div>
                ))}
              </dl>
              <p className="type-p3 mt-2 text-text-secondary">{card.note(date)}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
