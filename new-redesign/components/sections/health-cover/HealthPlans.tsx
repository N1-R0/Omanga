import { PLAN_CHECKOUT_URLS } from "@/config/site";
import { cx } from "@/lib/cx";
import { Button } from "@/new-redesign/components/ui/Button";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { href } from "@/new-redesign/config/routes";
import { healthPlans } from "@/new-redesign/content/health-cover.content";

/**
 * 3 · Choose your plan, after the owner's Vercel reference (2026-10-26,
 * Mobbin 1671eb10): the three plans as columns of one bordered panel, split
 * by hairlines. The popular plan (Gold) is the only white column, with a dark
 * "Popular" tab sitting on the panel's top edge and the one filled button;
 * Silver and Diamond stay on the page grey with secondary buttons. Each
 * column runs name, line, price, hospital category, then the benefits, with
 * the button pinned to its foot so the three line up. A row across the
 * panel's foot links to the full comparison.
 *
 * Buy buttons go straight to that plan's Paystack page. Below 1024px the
 * columns stack, split by horizontal hairlines, and the tab moves inline
 * beside the plan name.
 */
function Tick() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 text-text-secondary">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 10.2l2 2 4-4.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HealthPlans() {
  const { eyebrow, title, sub, popular, perMonth, hospitals, plans, foot, link } = healthPlans;

  return (
    <Section id="plans" label={eyebrow}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />

      <div className="rounded-xs border border-border lg:mt-6">
        <ul className="grid lg:grid-cols-3">
          {plans.map((plan, i) => (
            <li
              key={plan.name}
              className={cx(
                "relative flex flex-col p-6 md:p-8",
                i > 0 && "border-t border-border lg:border-t-0 lg:border-l",
                plan.featured && "bg-surface",
                i === 0 && "rounded-t-xs lg:rounded-tr-none lg:rounded-l-xs",
              )}
            >
              {plan.featured ? (
                <span className="type-p3 absolute bottom-full left-[-1px] hidden rounded-t-[8px] bg-surface-inverse px-3 py-1 text-text-inverse lg:block">{popular}</span>
              ) : null}

              <h3 className="type-h3 flex items-center gap-2.5">
                {plan.name}
                {plan.featured ? <span className="type-p3 rounded-full bg-surface-inverse px-2.5 py-0.5 text-text-inverse lg:hidden">{popular}</span> : null}
              </h3>
              <p className="type-p2 mt-2 text-text-secondary">{plan.description}</p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-[36px] leading-none font-medium tracking-[-0.03em] tabular-nums">${plan.price}</span>
                <span className="type-p2 text-text-secondary">{perMonth}</span>
              </p>
              <p className="type-p3 mt-3 self-start rounded-full bg-surface-muted px-3 py-1">{hospitals(plan.access)}</p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                {plan.included.map((item) =>
                  item.endsWith(":") ? (
                    <li key={item} className="type-p2 text-text-secondary">
                      {item}
                    </li>
                  ) : (
                    <li key={item} className="type-p2 flex gap-2.5">
                      <Tick />
                      {item}
                    </li>
                  ),
                )}
              </ul>

              <div className="mt-8 pt-0 lg:mt-auto lg:pt-8 [&>a]:w-full">
                <Button href={PLAN_CHECKOUT_URLS[plan.name]} external variant={plan.featured ? "primary" : "secondary"}>
                  {plan.action} <span aria-hidden className="ml-2">→</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 border-t border-border p-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="type-p1">{foot}</p>
          <Button href={href(link.path)} variant="secondary">
            {link.label} <span aria-hidden className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </Section>
  );
}
