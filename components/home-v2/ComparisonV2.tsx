import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";
import { cx } from "@/lib/cx";

import { Object3D } from "./Object3D";
import { V2Section } from "./V2Section";

/**
 * W1 · Old way vs Omanga split (Cake Equity, "Old school / New school").
 * One card, two halves. The "without" half stays plain white so the crimson
 * half is the only emphasis; each half carries one object breaking its edge.
 */
export function ComparisonV2() {
  const { heading, intro, groups } = homeV2Content.comparison;
  const [without, withOmanga] = groups;

  return (
    <V2Section labelledBy={HOME_V2_IDS.comparison}>
      <div className="flex flex-col items-center gap-fluid-7">
        <div className="flex flex-col items-center gap-fluid-3 text-center">
          <h2 id={HOME_V2_IDS.comparison} className="font-sans text-h2">
            {heading}
          </h2>
          <p className="font-sans text-large text-secondary measure-narrow">
            {intro}
          </p>
        </div>

        <div className="relative grid w-full max-w-[64rem] overflow-visible rounded-md border border-border-hairline tablet:grid-cols-2">
          {[without, withOmanga].map((group) => {
            const isPositive = group.sentiment === "positive";
            return (
              <div
                key={group.id}
                className={cx(
                  "relative flex flex-col gap-fluid-4 p-fluid-6",
                  isPositive
                    ? "rounded-b-md bg-[linear-gradient(150deg,var(--color-brand)_0%,var(--color-brand-deep)_100%)] text-on-dark tablet:rounded-r-md tablet:rounded-bl-none"
                    : "bg-surface-page",
                )}
              >
                <h3 className="font-sans text-h4">{group.title}</h3>
                <ul className="flex flex-col gap-fluid-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-fluid-2 font-sans text-main">
                      <span
                        aria-hidden="true"
                        className={cx(
                          "mt-[0.55em] size-2 shrink-0 rounded-full",
                          isPositive ? "bg-on-dark" : "bg-ink",
                        )}
                      />
                      <span className={isPositive ? "" : "text-secondary"}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Object3D
                  name={isPositive ? "success-check" : "card-declined"}
                  size={140}
                  float
                  delay={isPositive ? 0.8 : 0}
                  rotate={isPositive ? 10 : -10}
                  className={cx(
                    "absolute w-[clamp(4.5rem,9vw,8rem)]",
                    isPositive ? "-right-[4%] -bottom-[8%]" : "-left-[4%] -bottom-[8%]",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    </V2Section>
  );
}
