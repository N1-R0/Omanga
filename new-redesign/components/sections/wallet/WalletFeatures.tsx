import Image from "next/image";

import { cx } from "@/lib/cx";
import { getNgnRates } from "@/lib/rates";
import { APP, Glyph } from "@/new-redesign/components/sections/wallet/AppUi";
import { Button } from "@/new-redesign/components/ui/Button";
import { Flag } from "@/new-redesign/components/ui/Flag";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { href } from "@/new-redesign/config/routes";
import { walletFeatures } from "@/new-redesign/content/wallet.content";

/**
 * 3 · What you can do, after the owner's reference (2026-10-22; structure
 * only, on the page grey): the section header, then three rows that alternate
 * a panel and the text (design system § Feature rows).
 *
 * Panel: the U2 satin (still, so the page runs one animation, the hero's),
 * holding an app card in the glass frame that the panel's bottom edge cuts
 * off. The cards use the app's own look, like the hero phone.
 *
 * Text: an H3 set in the H2 style (the reference sets row titles a step
 * under the section title, and the system has no step between), the line in
 * P1 secondary, and a secondary button, so the hero keeps the page's one
 * primary.
 */
const SATIN = "/photos/brand/bg-flowing-waves-u2.jpg";

export async function WalletFeatures() {
  const { eyebrow, title, sub, rows } = walletFeatures;
  const { rates } = await getNgnRates();

  return (
    <Section id="what-you-can-do" label={eyebrow}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <div className="flex flex-col gap-16 lg:gap-24">
        {rows.map((row, i) => (
          <div key={row.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div
              className={cx(
                "relative isolate flex aspect-[4/3] justify-center overflow-hidden rounded-sm pt-8 md:pt-12",
                i % 2 === 1 && "lg:order-2",
              )}
            >
              <Image src={SATIN} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-10 object-cover" />
              {/* At least 110% of the panel tall, so the edge always cuts it,
                  however short the card's content. */}
              <div className="glass flex min-h-[110%] w-[76%] flex-col">
                <div className="flex-1 rounded-md bg-[#fff] p-4 text-left text-[#191617]" style={{ fontFamily: "var(--font-app)" }}>
                  <FeatureCard id={row.id} gbpToNgn={rates.GBP} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="type-h2">{row.title}</h3>
              <p className="type-p1 mt-5 max-w-[440px] text-text-secondary">{row.text}</p>
              <div className="mt-8">
                <Button href={href(row.cta.path)} variant="secondary">
                  {row.cta.label}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** One illustrative app card, in the app's type, colours and row scale. */
function FeatureCard({ id, gbpToNgn }: { id: "hold" | "convert" | "send"; gbpToNgn: number }) {
  const { cards } = walletFeatures;

  if (id === "hold") {
    const c = cards.hold;
    return (
      <>
        <CardHead title={c.title} meta={c.meta} />
        <ul className="mt-3 flex flex-col gap-2">
          {c.wallets.map((w) => (
            <li key={w.code} className="flex items-center gap-3 rounded-[12px] px-3 py-2.5" style={{ background: APP.card }}>
              <Flag src={w.flag} size={28} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[15px] leading-5 font-medium">{w.code}</span>
                {/* Names drop below 640, where "British pound" would truncate. */}
                <span className="hidden truncate text-[13px] leading-[18px] sm:block" style={{ color: APP.secondary }}>
                  {w.name}
                </span>
              </span>
              <span className="text-[15px] leading-5 font-semibold tabular-nums">{w.balance}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (id === "convert") {
    const c = cards.convert;
    const ngn = Math.round(c.gbp * gbpToNgn).toLocaleString("en-US");
    const rows: [string, string, boolean?][] = [
      [c.from, `£${c.gbp.toFixed(2)}`],
      [c.rate, `£1 = ₦${gbpToNgn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
      [c.to, `₦${ngn}`, true],
    ];
    return (
      <>
        <CardHead title={c.title} />
        <dl className="mt-3 rounded-[16px] border px-4" style={{ borderColor: APP.hairline, background: APP.card }}>
          {rows.map(([label, value, strong], i) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-4 py-3.5"
              style={i > 0 ? { borderTop: `1px solid ${APP.hairline}` } : undefined}
            >
              <dt className="text-[14px] leading-5" style={{ color: APP.secondary }}>
                {label}
              </dt>
              <dd className={strong ? "text-[20px] leading-6 font-bold tracking-[-0.3px]" : "text-[15px] leading-5 font-medium"}>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[13px] leading-[18px]" style={{ color: APP.tertiary }}>
          {c.note}
        </p>
        <span className="mt-4 flex h-12 items-center justify-center rounded-full text-[16px] font-semibold text-[#fff]" style={{ background: APP.accent }}>
          {c.action}
        </span>
      </>
    );
  }

  const c = cards.send;
  return (
    <>
      <CardHead title={c.title} />
      <ul className="mt-3 rounded-[16px] border px-4" style={{ borderColor: APP.hairline, background: APP.card }}>
        {c.rows.map((r, i) => (
          <li key={`${r.title}-${i}`}>
            {i > 0 ? <div className="-mr-4 ml-[52px] h-px" style={{ background: APP.hairline }} /> : null}
            <div className="flex items-center gap-3 py-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full" style={{ background: APP.fillStrong }}>
                <Glyph name="north-east" size={20} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-[15px] leading-5 font-medium">{r.title}</span>
                <span className="truncate text-[13px] leading-[18px]" style={{ color: APP.secondary }}>
                  {r.time}
                </span>
              </span>
              <span className="text-[15px] leading-5 font-medium">{r.amount}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function CardHead({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-1">
      <span className="text-[17px] leading-[22px] font-semibold tracking-[-0.3px]">{title}</span>
      {meta ? (
        <span className="text-[13px]" style={{ color: APP.tertiary }}>
          {meta}
        </span>
      ) : null}
    </div>
  );
}
