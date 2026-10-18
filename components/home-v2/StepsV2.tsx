import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";
import {
  type InsurancePlan,
  insurancePlansContent,
} from "@/content/insurance-plans.content";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";

import { AppText, ScreenshotPhone, StepPhone, u } from "./StepPhone";
import { V2Section } from "./V2Section";

/**
 * How it works.
 *
 * [CHANGED, 2026-10-18] Wise "Safe at every step" layout (owner reference):
 * centred heading, line and one action, then three square tiles each holding
 * an app screen, with the step's title and line set under its tile, not in
 * a card. Was the Norma bordered cards (mobbin 96f4183b, owner pick
 * 2026-10-15) with a closing line of funding-currency chips; the chips go,
 * and the action comes back because the reference has one.
 *
 * Tiles use the triad palette, one each, as Wise mixes a dark, a light and a
 * photo tile: plum (brand-deep), a teal tint (support) and blush. The phone
 * sits at the top of each tile and is cropped by its bottom edge.
 *
 * Screens, not photos or 3D: step 1 adds money, step 2 picks a plan, step 3 is
 * the app home screen. All sample figures. An ordered list, because the order
 * is the content.
 */
const TILE_SURFACE = [
  "bg-brand-deep",
  "bg-[color-mix(in_oklab,var(--color-support)_28%,white)]",
  "bg-blush-strong",
] as const;

export function StepsV2() {
  const { heading, intro, items, action } = homeV2Content.steps;

  return (
    <V2Section labelledBy={HOME_V2_IDS.steps}>
      <div className="flex flex-col gap-fluid-8">
        <div className="flex flex-col items-center gap-fluid-3 text-center">
          <h2
            id={HOME_V2_IDS.steps}
            className="font-heading text-h1 font-semibold text-balance"
          >
            {heading}
          </h2>
          <p className="font-sans text-large text-secondary measure-body">
            {intro}
          </p>
          <div className="pt-fluid-2">
            <Button
              as="link"
              href={action.href}
              isExternal={action.isExternal}
              variant="primary"
              tone="light"
            >
              {action.label}
            </Button>
          </div>
        </div>

        <ol className="grid gap-x-fluid-5 gap-y-fluid-7 tablet:grid-cols-2 desktop:grid-cols-3">
          {items.map((step, index) => (
            <li key={step.id} className="flex flex-col gap-fluid-5">
              <div
                className={cx(
                  "relative aspect-square overflow-hidden rounded-[1.75rem]",
                  TILE_SURFACE[index],
                )}
              >
                {/* [CHANGED, 2026-10-18] Copy audit: the app screens are
                    illustrations; hidden from assistive tech and the list's
                    text so the step reads as its title and line only. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-[12%] flex justify-center"
                >
                  {SCREENS[index]}
                </div>
              </div>
              <div className="flex flex-col gap-fluid-2">
                <h3 className="font-sans text-h4">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.heading}
                </h3>
                <p className="font-sans text-main text-secondary">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </V2Section>
  );
}

const PHONE_WIDTH = "w-[62%]";

/* -----------------------------------------------------------------------------
   Step screens. Sample figures only, in the same spirit as the hero's wallet.
   -------------------------------------------------------------------------- */

/*
  Insurance plan picker as a card carousel (Wise "Choose an option", owner
  pick 2026-10-15). The app has no insurance screen yet, so this one is drawn
  for the site only. One tall tinted card per plan with the next one peeking
  in; names, descriptions, prices and hospital access come from the plans
  content, so the screen cannot drift from /plans.
*/
const PLAN_TINT: Record<string, string> = {
  Silver: "#ECEEF1",
  Gold: "#F5E6C4",
  Diamond: "#FBEAEE",
};

function PlanCard({
  plan,
  peek = false,
}: {
  plan: InsurancePlan;
  peek?: boolean;
}) {
  return (
    <div
      className={cx(
        "flex shrink-0 flex-col",
        peek && "border-[3px] border-[#1E1E1E]",
      )}
      style={{
        width: u(300),
        height: u(360),
        borderRadius: u(22),
        background: PLAN_TINT[plan.name],
      }}
    >
      <div
        className="flex flex-1 flex-col"
        style={{ padding: u(22), gap: u(10) }}
      >
        <AppText
          size={40}
          weight={700}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: u(-1.2),
            lineHeight: 1,
          }}
        >
          {plan.name}
        </AppText>
        <AppText size={15} weight={400} color="#2B2B2B">
          {plan.description}
        </AppText>
        <span
          className="inline-flex items-center self-start rounded-full bg-white/70"
          style={{ padding: `${u(6)} ${u(12)}`, marginTop: u(6) }}
        >
          <AppText size={13} weight={600}>
            {plan.hospitalAccess} hospitals
          </AppText>
        </span>
      </div>
      <div
        className="border-t border-black/10"
        style={{ padding: `${u(18)} ${u(22)}` }}
      >
        <AppText size={17} weight={600}>
          ${plan.price} · Phillips HMO
        </AppText>
      </div>
    </div>
  );
}

function ChoosePlanScreen() {
  const [first, second] = insurancePlansContent.plans;

  return (
    <StepPhone className={PHONE_WIDTH}>
      <div style={{ padding: `${u(18)} ${u(20)} ${u(16)}` }}>
        <AppText size={26} weight={700} style={{ letterSpacing: u(-0.4) }}>
          Choose a plan
        </AppText>
      </div>
      <div className="flex" style={{ gap: u(14), paddingLeft: u(20) }}>
        <PlanCard plan={first} />
        <PlanCard plan={second} peek />
      </div>
      <div
        className="flex justify-center"
        style={{ gap: u(8), paddingTop: u(16) }}
      >
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className={cx(
              "block rounded-full",
              dot === 0 ? "bg-[#1E1E1E]" : "bg-[#C9C9C9]",
            )}
            style={{ width: u(8), height: u(8) }}
          />
        ))}
      </div>
    </StepPhone>
  );
}

const SCREENS = [
  // [CHANGED, 2026-10-15] The app's real Top up screen, captured from the
  // simulator (owner's request). It shows no account data.
  <ScreenshotPhone
    key="add"
    src="/app-screens/top-up.png"
    className={PHONE_WIDTH}
  />,
  <ChoosePlanScreen key="plan" />,
  // [CHANGED, 2026-10-15] The app's real home screen from the simulator. It
  // shows the owner's own test account; the owner approved its use.
  <ScreenshotPhone
    key="home"
    src="/app-screens/home.png"
    className={PHONE_WIDTH}
  />,
] as const;
