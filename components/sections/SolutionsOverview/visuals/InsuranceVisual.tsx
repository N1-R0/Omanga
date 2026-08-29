"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";

import { cx } from "@/lib/cx";
import { MOTION } from "@/lib/motion";

import { ArtBox } from "./ArtBox";
import {
  Bed,
  Building,
  Clock,
  Pill,
  Plane,
  Scan,
  Video,
} from "./MockupGlyphs";

/**
 * The insurance card visual: what the cover includes, as a list that scrolls
 * through itself with the active item held at the centre.
 *
 * Structure and geometry are the approved Figma frame's — `kyc-verification-stepper`,
 * node 2115:1111 and re-read 2026-08-29 as 2654:115547 — reproduced row for row:
 * seven rows sharing a centre line, the active one full width and sharp, the rest
 * receding above and below by scale, opacity and blur. Every measurement lives in
 * `styles/product-visuals.css` under INSURANCE; this file is structure and
 * behaviour only.
 *
 * [CHANGED, 2026-08-29] The tiles carry the frame's own palette. They were a
 * brand tile for the active row and flat grey for the rest; the frame's seven
 * hues were asked for instead. The colours, and why a hue belongs to an item
 * rather than to the slot it is passing through, are in `product-visuals.css`.
 *
 * ---------------------------------------------------------------------------
 * [CONTENT] The frame's rows are a KYC flow — "Bank account", "Ownership",
 * "Source of Funds", "Identity verification", "Representatives", "UBO", "AML
 * Screening". That is the reference's subject, not Omanga's.
 *
 * The seven rows below are Omanga's cover, and every one of them is traceable to
 * the plans page rather than written for this component:
 *
 *   Hospital access        `hospitalAccess`, Category A / A+B / A+B+C
 *   Emergency evacuation   Silver benefits
 *   Diagnostic scans       "CT Scans, MRI, Doppler Ultrasound scan"
 *   Inpatient care         "Admission", semi-private / private ward
 *   Telemedicine           "Virtual consultations with licensed doctors"
 *   Prescription drugs     "Prescription essential drugs"
 *   24/7 support           "Round-the-clock support when you need it"
 *
 * No figure, limit or duration is repeated here. The plans page carries those and
 * they differ per package, so stating one on a card that describes all three would
 * be a claim rather than a summary. **Confirm the seven labels with insurance.**
 *
 * ---------------------------------------------------------------------------
 * [DEVIATES FROM component-rules.md § Animation guidelines] "Motion is entrance,
 * state change, and feedback. Never decoration that runs continuously."
 *
 * Continuous decoration, added on request, and the page's second such case after
 * the partner marquee. It ships under the same conditions:
 *
 *   - Transform and opacity only, plus `filter`, which is GPU-composited and
 *     triggers no layout.
 *   - It never gates content: all seven rows are in the DOM at their resting
 *     positions, so with no script at all the list renders exactly as the frame
 *     draws it, with the first item active.
 *   - Reduced motion holds that composition — the interval never starts —
 *     and `data-motion="loop"` marks it for the CSS half of the same policy.
 */

/**
 * The seven rows, in the order the cover reads, each with its own tile hue.
 *
 * `tile` names a class in `styles/product-visuals.css`, which is where the two
 * colours behind each name live — this file names a hue and never states one.
 * That file also carries why the hue belongs to the item rather than to the slot
 * it currently occupies.
 *
 * The assignment is by fit, not by the frame's top-to-bottom order: sky for
 * telemedicine, green for drugs, rose for evacuation. Nothing depends on it, and
 * a colour can be swapped by editing one word here.
 */
const COVER = [
  { key: "hospital", label: "Hospital access", Glyph: Building, tile: "pv-tile-blue" },
  { key: "evacuation", label: "Emergency evacuation", Glyph: Plane, tile: "pv-tile-rose" },
  { key: "scans", label: "Diagnostic scans", Glyph: Scan, tile: "pv-tile-purple" },
  { key: "inpatient", label: "Inpatient care", Glyph: Bed, tile: "pv-tile-tan" },
  { key: "telemedicine", label: "Telemedicine", Glyph: Video, tile: "pv-tile-sky" },
  { key: "drugs", label: "Prescription drugs", Glyph: Pill, tile: "pv-tile-green" },
  { key: "support", label: "24/7 support", Glyph: Clock, tile: "pv-tile-sand" },
] as const satisfies readonly {
  key: string;
  label: string;
  Glyph: ComponentType;
  tile: string;
}[];

/**
 * Slot classes, top to bottom. The active row is index 3 — the frame's centre —
 * and each step away from it is one distance band.
 *
 * A fixed array rather than arithmetic on the index, because the bands are not
 * symmetric: the frame's rows overlap, so travelling up is not the mirror of
 * travelling down. The classes carry the measured values.
 */
const SLOT_CLASS = [
  "pv-step-d3-up",
  "pv-step-d2-up",
  "pv-step-d1-up",
  "pv-step-d0",
  "pv-step-d1-down",
  "pv-step-d2-down",
  "pv-step-d3-down",
] as const;

/** Which slot holds the active row. */
const ACTIVE_SLOT = 3;

export type InsuranceVisualProps = {
  /** Fed from `ImageAsset.alt`. Empty means ornamental — see `ArtBox`. */
  label?: string;
};

export function InsuranceVisual({ label }: InsuranceVisualProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cycle = (MOTION.durationTierHold + MOTION.durationTierMove) * 1000;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % COVER.length);
    }, cycle);

    return () => clearInterval(timer);
  }, []);

  return (
    <ArtBox label={label}>
      <div className="pv-stepper" data-motion="loop">
        {COVER.map((item, index) => {
          /*
            Advancing `activeIndex` moves every row up one slot and wraps the top
            row round to the bottom, so the list reads as scrolling through itself
            rather than as seven items independently changing state. The wrap
            happens between the two least visible slots, where both ends sit at
            0.32 opacity behind a blur.
          */
          const slot =
            (index - activeIndex + ACTIVE_SLOT + COVER.length) % COVER.length;
          const isActive = slot === ACTIVE_SLOT;

          return (
            <div key={item.key} className={cx("pv-step", SLOT_CLASS[slot])}>
              <span
                className={cx(
                  "pv-step-icon",
                  item.tile,
                  isActive ? "pv-step-icon-active" : "pv-step-icon-idle",
                )}
              >
                <span className="pv-icon-24">
                  <item.Glyph />
                </span>
              </span>

              <span className="pv-step-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </ArtBox>
  );
}
