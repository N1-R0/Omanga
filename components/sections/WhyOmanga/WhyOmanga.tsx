import { Object3D } from "@/components/home-v2/Object3D";
import { V2Section } from "@/components/home-v2/V2Section";
import type { WhyOmangaContent } from "@/content/why-omanga.content";
import { cx } from "@/lib/cx";

/**
 * "Why Omanga" — the site-wide comparison band.
 *
 * [CHANGED, 2026-10-10] Every page now uses the home page's design (W1, built
 * as `ComparisonV2`), on the owner's instruction: a centred heading and intro,
 * then one bordered panel split in two — the problem side on white, the Omanga
 * side as a crimson gradient — with a static 3D object tucked into each
 * panel's outer corner. The dark band with cards it replaces is gone.
 *
 * Each page still passes its own copy; only the UI is shared.
 */
export type WhyOmangaProps = {
  content: WhyOmangaContent;
  headingId: string;
};

export function WhyOmanga({ content, headingId }: WhyOmangaProps) {
  const { heading, intro, groups } = content;

  return (
    <V2Section labelledBy={headingId}>
      <div className="flex flex-col items-center gap-fluid-7">
        <div className="flex flex-col items-center gap-fluid-3 text-center">
          <h2 id={headingId} className="font-sans text-h2 text-balance measure-heading">
            {heading}
          </h2>
          <p className="font-sans text-large text-secondary measure-narrow">{intro}</p>
        </div>

        <div className="relative grid w-full max-w-[64rem] overflow-visible rounded-md border border-border-hairline tablet:grid-cols-2">
          {groups.map((group) => {
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
