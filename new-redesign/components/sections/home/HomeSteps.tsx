import { WALLET_URL } from "@/config/site";
import { StepsRail } from "@/new-redesign/components/sections/home/StepsRail";
import { Button } from "@/new-redesign/components/ui/Button";
import { Card } from "@/new-redesign/components/ui/Card";
import { Flag } from "@/new-redesign/components/ui/Flag";
import { homeSteps } from "@/new-redesign/content/home.content";

/**
 * 4 · Set up at home before you fly (home structure v2 § 4), built from the
 * owner-approved wireframe (design-lab/home-steps-v2.html, 2026-10-25).
 *
 * A centred head with the pill CTA under the sub (owner, 2026-10-25), then
 * the journey rail (StepsRail) and three white Cards.
 *
 * Pinned scrolling (owner, 2026-10-25): on screens at least 1024 × 800 (the
 * `pin` variant) the section is 260vh tall and its content sticks to the
 * viewport, so scrolling flies the plane from Home to Lagos before the page
 * moves on. Smaller screens scroll normally.
 *
 * The middle card sits `dip` px lower from 1024px, so the rail's dotted path
 * curves down to its stop. Each card's top well shows a third of the
 * Payments card's mountain photo (owner asked for it here), so the row reads
 * as one landscape, with a small app screen in the glass frame on it (owner:
 * the screens sit on glass). Below 1024px the cards stack, the rail hides
 * and each title carries its number instead.
 */
const SLICE = ["0%", "50%", "100%"];

export function HomeSteps() {
  const { eyebrow, title, sub, from, to, dip, photo, steps, stepOf, cta } = homeSteps;

  return (
    <section id="steps" aria-labelledby="steps-title" className="bg-bg pin:h-[260vh]">
      <div className="section-y pin:sticky pin:top-0 pin:flex pin:h-svh pin:items-center pin:py-0">
      <div className="container-page">
        <div className="mx-auto mb-16 flex max-w-[640px] flex-col items-center gap-[var(--head-gap)] text-center">
          <p className="type-p2 inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
          <div className="flex flex-col gap-[var(--head-sub-gap)]">
            <h2 id="steps-title" className="type-h2 text-balance">
              {title}
            </h2>
            <p className="type-p1 mx-auto max-w-[480px] text-text-secondary">{sub}</p>
          </div>
          <div className="mt-2">
            <Button href={WALLET_URL} external>
              {cta.label}
            </Button>
          </div>
        </div>

        <StepsRail from={from} to={to} count={steps.length} dip={dip} />

        <ol className="grid gap-[var(--grid-gap)] lg:grid-cols-3">
          {steps.map((step, i) => {
            const s = step.screen;
            return (
              <li key={step.title} style={{ "--dip": `${i === Math.floor(steps.length / 2) ? dip : 0}px` } as React.CSSProperties} className="lg:translate-y-(--dip)">
                <Card className="flex h-full flex-col p-3">
                  <div
                    aria-hidden
                    className="relative grid h-[200px] place-items-center overflow-hidden rounded-sm bg-cover"
                    style={{ backgroundImage: `url(${photo})`, backgroundSize: "300% auto", backgroundPosition: `${SLICE[i]} 62%` }}
                  >
                    <div className="glass w-[72%] max-w-[260px] rounded-[24px]">
                    <div className="flex flex-col gap-2.5 rounded-[16px] bg-surface p-3.5 text-[12px]">
                      <p className="flex justify-between text-[13px] font-semibold">
                        {s.title}
                        <span className="font-normal text-text-secondary">{stepOf(i + 1, steps.length)}</span>
                      </p>
                      {s.kind === "signup" ? (
                        <span className="flex flex-col gap-0.5 rounded-[10px] border border-border-strong px-3 py-2">
                          <span className="text-[11px] text-text-secondary">{s.label}</span>
                          {s.value}
                        </span>
                      ) : null}
                      {s.kind === "add" ? (
                        <span className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2">
                            <Flag src={s.flag} size={20} />
                            {s.wallet}
                          </span>
                          <span className="text-[22px] font-semibold tracking-[-0.03em]">{s.amount}</span>
                        </span>
                      ) : null}
                      {s.kind === "plan" ? (
                        <>
                          <span className="flex gap-1.5">
                            {s.plans.map((p) => (
                              <span
                                key={p}
                                className={
                                  p === s.picked
                                    ? "flex-1 rounded-full border border-text bg-text py-1.5 text-center text-[12px] font-medium text-text-inverse"
                                    : "flex-1 rounded-full border border-border-strong py-1.5 text-center text-[12px] font-medium"
                                }
                              >
                                {p}
                              </span>
                            ))}
                          </span>
                          <span className="flex items-center gap-2.5 rounded-full bg-accent-subtle py-2 pr-3 pl-2">
                            <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-accent">
                              <svg width="14" height="14" viewBox="0 0 24 24" className="fill-on-accent">
                                <path d="M12 1 3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5z" />
                              </svg>
                            </span>
                            <span className="flex flex-col">
                              <span className="font-medium text-accent-text">{s.row}</span>
                              <span className="text-[11px] text-text-secondary">{s.sub}</span>
                            </span>
                          </span>
                        </>
                      ) : null}
                      {"action" in s ? <span className="rounded-full bg-text py-2 text-center font-medium text-text-inverse">{s.action}</span> : null}
                    </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 px-3 pt-6 pb-3">
                    <h3 className="type-h3 flex items-center gap-2.5 text-[20px] leading-tight">
                      <span className="type-p3 grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-border-strong lg:hidden">{i + 1}</span>
                      {step.title}
                    </h3>
                    <p className="type-p1 text-text-secondary">{step.text}</p>
                  </div>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
      </div>
    </section>
  );
}
