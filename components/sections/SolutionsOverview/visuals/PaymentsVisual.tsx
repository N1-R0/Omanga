"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/cx";
import { MOTION } from "@/lib/motion";

import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  Ellipsis,
  Eye,
  User,
} from "./MockupGlyphs";
import { ArtBox } from "./ArtBox";

/**
 * The payments card visual.
 *
 * Structure, geometry and styling are the approved Figma frame's — node
 * 2081:1153, whose `main-glass-container` is 2081:1221 — reproduced element for
 * element: title bar, glass balance card, uppercase label, 48px figure,
 * gradient Send, Request, overflow control, and the transaction pill clipped by
 * the card's lower edge exactly as the frame draws it. Every measurement lives in
 * `styles/product-visuals.css`; this file is structure and behaviour only.
 *
 * On top of the frame's one resting state, it runs one sequence on first view —
 * the balance counts up, Send is pressed, a confirmation replaces the controls —
 * and then stops.
 *
 * `"use client"` sits here, in the leaf, not on the section. `SolutionsOverview`
 * and `SolutionCard` stay Server Components, so every word of the card's copy is
 * still in the server HTML. This is the boundary `Reveal` already establishes.
 *
 * ---------------------------------------------------------------------------
 * [SCOPE] Three steps, in order, once. Nothing else moves.
 *
 * No hover state, no parallax, no floating elements, no idle loop. Every control
 * is a `div`, not a `button`: they are pictures of controls inside an image, so
 * making them focusable would put keyboard stops on things that cannot be
 * operated and would contradict the `role="img"` on the box.
 *
 * ---------------------------------------------------------------------------
 * [REDUCED MOTION] The final *content* state, not the final animation state.
 *
 * design.md § 11 principle 4 removes "counting motion" and holds the final state.
 * Read literally that would mean opening on the confirmation row, which shows a
 * user who asked for less movement a "Payment sent" receipt for a payment they
 * never saw sent — a claim, not a still frame. So the static branch is the
 * counted balance with the controls at rest, which is also exactly the frame.
 */

/**
 * The balance the counter lands on. The frame's own figure.
 *
 * [APPROVED] `solutions.content.ts` records the previous mockup's baked-in
 * figures as an open blocker precisely because they were pixels no reviewer could
 * diff. This one is a number in source: greppable, reviewable in a pull request,
 * and changed by editing one line rather than re-exporting an asset. It is also
 * never announced — see `ArtBox`.
 */
const BALANCE_TARGET = 21_530.86;

/**
 * The reveal threshold, matching `Reveal`: the sequence starts as the box's top
 * edge clears the bottom of the viewport, not once a tenth of it is showing.
 */
const VIEWPORT_MARGIN = "0px 0px -10% 0px";

const formatBalance = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/**
 * Where the sequence is.
 *
 *   counting   balance rising, controls at rest
 *   pressed    Send depressed
 *   sent       confirmation in place of the controls
 *
 * `pressed` is a state rather than a transition because both of its signals — the
 * 0.96 scale and the swap from lift to inner shadow — have to be true at the same
 * time for the press to read as a press rather than as a colour change.
 */
type Phase = "counting" | "pressed" | "sent";

/**
 * The confirmation pour.
 *
 * Twelve pieces, each pairing a column class from `product-visuals.css` — which
 * carries its entry point, drift, spin, delay and duration — with a colour.
 *
 * Fixed, not random. `Math.random()` here would produce different values on the
 * server and the client and hydration would mismatch, and a pour that differs
 * between two people looking at the same page is an accident rather than a design.
 *
 * Colours are the section's own — brand, the three tier accents and success — so
 * the pour cannot introduce a colour the page does not already use.
 */
const CONFETTI = [
  { column: "pv-confetti-1", color: "bg-brand" },
  { column: "pv-confetti-2", color: "bg-tier-gold" },
  { column: "pv-confetti-3", color: "bg-success" },
  { column: "pv-confetti-4", color: "bg-tier-diamond" },
  { column: "pv-confetti-5", color: "bg-brand" },
  { column: "pv-confetti-6", color: "bg-tier-silver" },
  { column: "pv-confetti-7", color: "bg-success" },
  { column: "pv-confetti-8", color: "bg-tier-gold" },
  { column: "pv-confetti-9", color: "bg-brand" },
  { column: "pv-confetti-10", color: "bg-tier-diamond" },
  { column: "pv-confetti-11", color: "bg-success" },
  { column: "pv-confetti-12", color: "bg-tier-silver" },
] as const;

export type PaymentsVisualProps = {
  /** Fed from `ImageAsset.alt`. Empty means ornamental — see `ArtBox`. */
  label?: string;
};

export function PaymentsVisual({ label }: PaymentsVisualProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(boxRef, { once: true, margin: VIEWPORT_MARGIN });
  const isReducedMotion = useReducedMotion();

  const amount = useMotionValue(0);
  const balance = useTransform(amount, formatBalance);
  const [phase, setPhase] = useState<Phase>("counting");

  useEffect(() => {
    if (isReducedMotion === true) {
      amount.set(BALANCE_TARGET);
      return;
    }

    if (!isInView) {
      return;
    }

    /*
      One chain, one cancellation path. The timer is cleared on unmount so a route
      change mid-sequence cannot call `setPhase` on a gone component, and
      `animate` is stopped for the same reason.
    */
    const timers: ReturnType<typeof setTimeout>[] = [];

    const controls = animate(amount, BALANCE_TARGET, {
      duration: MOTION.durationBalanceCount,
      ease: MOTION.easeEntrance,
      onComplete: () => {
        /*
          A beat between the count settling and the press, so the two read as
          cause and effect rather than as one continuous animation. Then the press
          holds long enough to be seen before the confirmation replaces it.
        */
        timers.push(
          setTimeout(() => {
            setPhase("pressed");
            timers.push(
              setTimeout(
                () => setPhase("sent"),
                (MOTION.durationPress * 2 + MOTION.durationSettle) * 1000,
              ),
            );
          }, MOTION.durationPressDelay * 1000),
        );
      },
    });

    return () => {
      controls.stop();
      timers.forEach(clearTimeout);
    };
  }, [amount, isInView, isReducedMotion]);

  const isPressed = phase === "pressed";
  const isSent = phase === "sent";

  return (
    <ArtBox label={label}>
      <div ref={boxRef} className="pv-panel">
        <div className="pv-nav">
          <span className="pv-control-lg">
            <span className="pv-icon-24">
              <User />
            </span>
          </span>

          <span className="pv-overview">Overview</span>

          <span className="pv-control-lg">
            <span className="pv-icon-24">
              <Bell />
            </span>
          </span>
        </div>

        {/*
          The balance card keeps its authored size and position in both states —
          the frame does not change, only its contents. Rule 1 holds: nothing here
          animates a layout property, the two states are exclusive siblings inside
          a box whose geometry is fixed by `pv-balance-card`.
        */}
        <div className="pv-balance-card">
          {isSent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: MOTION.durationStandard,
                ease: MOTION.easeStandard,
              }}
              className="pv-success"
            >
              {/*
                Plain elements, not `motion` ones: the fall is a CSS keyframe so
                its travel can be expressed in `--pv` and scale with the mockup.
                Motion cannot interpolate a container-query unit inside a
                transform, and a pixel travel would be relatively twice as far on
                a 247-wide card as on a 400-wide one.
              */}
              <div className="pv-confetti" aria-hidden>
                {CONFETTI.map((piece) => (
                  <span
                    key={piece.column}
                    className={cx("pv-confetti-piece", piece.column, piece.color)}
                  />
                ))}
              </div>

              <motion.span
                className="pv-success-mark"
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: MOTION.durationEmphasis,
                  ease: MOTION.easeDropdown,
                }}
              >
                <span className="pv-icon-40">
                  <Check />
                </span>
              </motion.span>

              <span className="pv-success-title">Sent</span>
              <span className="pv-success-sub">$21,530.86 on its way</span>
            </motion.div>
          ) : (
            <>
              <p className="pv-balance-label">Account balance:</p>

              <div className="pv-balance-row">
                {/*
                  A MotionValue rendered as text, so the count updates on the
                  animation frame without re-rendering this component a hundred
                  times over 2200ms.
                */}
                <motion.span className="pv-balance-value">{balance}</motion.span>

                <span className="pv-control-sm">
                  <span className="pv-icon-20">
                    <Eye />
                  </span>
                </span>
              </div>

              <div className="pv-action-row">
                <motion.div
                  animate={{ scale: isPressed ? MOTION.pressScale : 1 }}
                  transition={{
                    duration: MOTION.durationPress,
                    ease: MOTION.easeStandard,
                  }}
                  className={cx("pv-send", isPressed && "pv-send-pressed")}
                >
                  <span className="pv-icon-12">
                    <ArrowUpRight />
                  </span>
                  Send
                </motion.div>

                <span className="pv-request">Request</span>

                <span className="pv-control-md">
                  <span className="pv-icon-20">
                    <Ellipsis />
                  </span>
                </span>
              </div>
            </>
          )}
        </div>

        <div className="pv-history-wrap">
          <span className="pv-history-pill">
            Transaction History
            <span className="pv-icon-16">
              <ChevronRight />
            </span>
          </span>
        </div>
      </div>
    </ArtBox>
  );
}
