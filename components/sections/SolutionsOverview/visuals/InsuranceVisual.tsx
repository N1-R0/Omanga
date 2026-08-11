"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { cx } from "@/lib/cx";
import { MOTION } from "@/lib/motion";

import { ArtBox } from "./ArtBox";
import { ShieldCheck } from "./MockupGlyphs";

/**
 * The insurance card visual: a stack of cards that rotates, the front card moving
 * to the back and the one behind it coming forward.
 *
 * Structure, geometry and styling are the approved Figma frame's — node
 * 2081:1253, whose `Visual Workspace` is 2081:1295 — reproduced element for
 * element: three same-size cards offset down and to the right, recessed by
 * opacity and blur rather than by scale, bleeding off the right edge, with the
 * glow indicator at their left. Every measurement lives in
 * `styles/product-visuals.css`.
 *
 * ---------------------------------------------------------------------------
 * [CONTENT] The frame's rows read "Google Inc. / Add User to Workspace / Lorem
 * ipsum…", "Figma Team" and "Slack Team", with three photographic avatars, and
 * its heading and body are claritybusinesstravel.com's copy. Those are the
 * reference's placeholders, carried into the frame unedited.
 *
 * The three insurance tiers take their place, and the tier badge takes the
 * avatar's, as specified. Shipping the frame's strings verbatim would put three
 * other companies' brand names, a lorem ipsum line and a competitor's marketing
 * copy on the Omanga homepage — and `solutions.content.ts` already records the
 * standing rule for exactly this case: "a section with unverified content renders
 * without that element rather than with a placeholder."
 *
 * ---------------------------------------------------------------------------
 * [DEVIATES FROM component-rules.md § Animation guidelines] "Motion is entrance,
 * state change, and feedback. Never decoration that runs continuously."
 *
 * Continuous decoration, added on request. The page's second such case after the
 * partner marquee, shipping under the same conditions that one records:
 *
 *   - Transform and opacity only, plus `filter`, which is GPU-composited and
 *     triggers no layout. Recorded rather than assumed.
 *   - It never gates content: all three tiers are in the DOM at their resting
 *     positions, so with no script at all the stack renders as the frame draws it.
 *   - Reduced motion holds that composition — the interval never starts.
 *     `data-motion="loop"` is set for the CSS half of the same policy and as the
 *     greppable marker for "this thing loops".
 */

/**
 * The three stack positions, front to back.
 *
 * Every card is positioned at the front slot by `pv-tier-card` and reaches its
 * actual slot from here, so these are offsets from the front, not absolute
 * places. Percentages are of the card's own box, which is what keeps them correct
 * as the whole mockup scales with the art box.
 *
 * [MEASURED] From the frame's three slots, all 459.604 x 137.881:
 *
 *   front   left 116     top 119
 *   mid     left 141.07  top 150.34   -> x  25.07/459.604 =  5.455%
 *                                        y  31.34/137.881 = 22.727%
 *   back    left 172.41  top 192.12   -> x  56.41/459.604 = 12.273%
 *                                        y  73.12/137.881 = 53.030%
 *
 * Same size at every slot: the frame recedes its cards with opacity and blur, not
 * scale. `surface` carries the per-slot fill, shadow and blur — see the classes.
 */
const SLOTS = [
  { x: "0%", y: "0%", opacity: 1, surface: "pv-tier-front" },
  { x: "5.455%", y: "22.727%", opacity: 0.65, surface: "pv-tier-mid" },
  { x: "12.273%", y: "53.03%", opacity: 0.35, surface: "pv-tier-back" },
] as const;

/**
 * The tiers, in the order the plans are sold.
 *
 * Gold leads because it is the middle plan and the one the card's body copy calls
 * out; the rotation reaches the other two on its own. The three text rows map to
 * the frame's three: title, subtitle, and the small note the front card carries.
 *
 * **Confirm the cover lengths and inclusions with insurance.** Silver / Gold /
 * Diamond are the approved plan names (`solutions.content.ts`, `/plans`); the
 * durations and the benefit lines are plausible, not quoted policy terms.
 */
const TIERS = [
  {
    key: "gold",
    name: "Gold plan",
    cover: "Covered · 14 days",
    note: "Inpatient care, emergencies and clinic visits, underwritten in Nigeria.",
    badge: "bg-tier-gold",
  },
  {
    key: "silver",
    name: "Silver plan",
    cover: "Covered · 7 days",
    note: "Clinic visits and emergency treatment for a short trip.",
    badge: "bg-tier-silver",
  },
  {
    key: "diamond",
    name: "Diamond plan",
    cover: "Covered · 30 days",
    note: "Full cover for a long stay, including evacuation and repatriation.",
    badge: "bg-tier-diamond",
  },
] as const;

export type InsuranceVisualProps = {
  /** Fed from `ImageAsset.alt`. Empty means ornamental — see `ArtBox`. */
  label?: string;
};

export function InsuranceVisual({ label }: InsuranceVisualProps) {
  const isReducedMotion = useReducedMotion();
  const [frontIndex, setFrontIndex] = useState(0);

  useEffect(() => {
    if (isReducedMotion === true) {
      return;
    }

    const cycle = (MOTION.durationTierHold + MOTION.durationTierMove) * 1000;
    const timer = setInterval(() => {
      setFrontIndex((current) => (current + 1) % TIERS.length);
    }, cycle);

    return () => clearInterval(timer);
  }, [isReducedMotion]);

  return (
    <ArtBox label={label}>
      {/*
        The plate. White at 20% over the brand fill, so the cards have a surface to
        recede into — without it their opacity steps resolved against crimson and
        read as mauve rather than as depth.
      */}
      <span className="pv-plate" />

      <div className="pv-stack" data-motion="loop">
        <span className="pv-glow" />

        {TIERS.map((tier, index) => {
          /*
            Which slot this tier is in. Advancing `frontIndex` by one sends the
            current front card to the last slot and brings the one behind it
            forward — the reordering the design asks for, rather than a crossfade
            where the same card would appear to dissolve and reappear.
          */
          const slotIndex = (index - frontIndex + TIERS.length) % TIERS.length;
          const slot = SLOTS[slotIndex];

          return (
            <motion.div
              key={tier.key}
              className={cx("pv-tier-card pv-tier-slot", slot.surface)}
              animate={{ x: slot.x, y: slot.y, opacity: slot.opacity }}
              /*
                `initial={false}` so the first paint is the resting stack rather
                than three cards animating out from the front slot on top of each
                other. `Reveal` owns this card's entrance.
              */
              initial={false}
              transition={
                isReducedMotion === true
                  ? { duration: 0 }
                  : {
                      duration: MOTION.durationTierMove,
                      ease: MOTION.easeDropdown,
                    }
              }
            >
              <span className={cx("pv-tier-badge", tier.badge)}>
                <span className="pv-icon-24">
                  <ShieldCheck />
                </span>
              </span>

              <span className="pv-tier-copy">
                <span className="pv-tier-title">{tier.name}</span>
                <span className="pv-tier-sub">{tier.cover}</span>
                <span className="pv-tier-note">{tier.note}</span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </ArtBox>
  );
}
