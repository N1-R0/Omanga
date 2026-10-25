import { InsuranceCard } from "@/new-redesign/components/sections/home/InsuranceCard";
import { PaymentsCard } from "@/new-redesign/components/sections/home/PaymentsCard";
import { homeProducts } from "@/new-redesign/content/home.content";

/**
 * 3 · Payments and insurance (home structure v2 §§ 3–4 in one section, owner
 * 2026-10-25). A centred head after the owner's "Send Money Anywhere"
 * reference: the eyebrow with its crimson marker, the H2, a two-line sub.
 * Under it, the Payments card, a metrics strip (owner, 2026-10-25) and the
 * Insurance cards. The cards' titles are H3s under this H2.
 *
 * Metrics strip: a small uppercase label, then three figures with hairline
 * dividers between them, after the owner's "Growing every day" reference.
 * The figure is H1-sized, its "+" smaller and raised. Below 768px they
 * stack with rules between them.
 */
export function HomeProducts() {
  const { eyebrow, title, sub, metricsLabel, metrics } = homeProducts;

  return (
    <section id="products" aria-labelledby="products-title" className="section-y bg-bg">
      <div className="container-page">
        <div className="mx-auto mb-[var(--section-head)] flex max-w-[640px] flex-col items-center gap-[var(--head-gap)] text-center">
          <p className="type-p2 inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
          <div className="flex flex-col gap-[var(--head-sub-gap)]">
            <h2 id="products-title" className="type-h2 text-balance">
              {title}
            </h2>
            <p className="type-p1 mx-auto max-w-[480px] text-text-secondary">{sub}</p>
          </div>
        </div>

        <div className="flex flex-col gap-[var(--grid-gap)]">
          <PaymentsCard />

          <div className="py-10 md:py-14">
            <p className="type-p2 mb-8 text-center uppercase tracking-[0.08em] text-text-secondary md:mb-10">{metricsLabel}</p>
            <dl className="grid divide-y divide-border-strong md:grid-cols-3 md:divide-x md:divide-y-0">
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse items-center gap-2 py-6 text-center md:py-2">
                  <dt className="type-p1 text-text-secondary">{m.label}</dt>
                  <dd className="type-h1 tabular-nums">
                    {m.value}
                    {m.suffix ? <span className="ml-1 align-[0.35em] text-[0.55em]">{m.suffix}</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <InsuranceCard />
        </div>
      </div>
    </section>
  );
}
