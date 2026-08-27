/**
 * Mission & Vision — spec § 4.
 *
 * Two directional statements on a scroll-tracked rail, replacing the live page's
 * side-by-side Vision/Mission cards.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The rail is the homepage's, not a new build.
 *
 * § 4 specifies Clarity's scrolling timeline: "a vertical progress rail down the
 * left edge of the content well … the active phase marker fills, its label scales
 * up and reaches full contrast, the inactive phase dims." The homepage's How
 * Omanga works section is already that pattern, measured off the same benchmark
 * and built on instruction. It ships here rather than a second rail being
 * written — the same arrangement `WhyOmanga` and `CTA` already have across pages.
 *
 * Three things § 4 asks for that the shared rail does not do, and none is added:
 *
 *   - The rail runs down the *centre* above desktop, not the left edge, with the
 *     phases alternating either side of it. That is the homepage's measured
 *     layout and it is what the supplied reference draws. § 4's "left edge" is
 *     Clarity's arrangement, and the instruction here is to use this template.
 *   - The active label does not scale up and the inactive one does not dim. The
 *     rail's brand fill is the position readout instead — see
 *     `TimelineConnector`, which does the whole thing with one `position: sticky`
 *     and no JavaScript. Scaling a heading on scroll would be the scroll-linked
 *     animation `styles/animations.css` rule 2 rules out, and it would be the
 *     site's only instance.
 *   - Generous per-phase height. § 4: "give each phase generous vertical height
 *     (a full viewport is appropriate) so the scroll transition has room to
 *     register." The shared rail spaces its entries with `--space-8` and sets no
 *     minimum height. With two phases the section is short and the fill has
 *     little to travel, which is the cost § 4 anticipated. Adding a per-entry
 *     minimum would change the homepage's three steps too, so it is raised
 *     rather than taken.
 *
 * ---------------------------------------------------------------------------
 * [NOTE] Order is Mission then Vision, inverted from the live page.
 *
 * § 4: "The live page shows Vision on the left and Mission on the right… The
 * brief specifies Phase One = Mission, Phase Two = Vision. In a timeline, phase
 * order implies sequence, and mission → vision reads correctly: what we do now,
 * leading to what we become." Both statements remain verbatim; only their order
 * changes, and it changes on the brief's instruction.
 *
 * The rail alternates sides starting on the end side, so Mission renders right of
 * the rail and Vision left of it above desktop. Below desktop both read left to
 * right in this order, which is what § 4's sequence requires.
 *
 * [NOT ADDED] A third phase. § 4: "Do not add a third phase to fill space, and do
 * not invent dates." The section is short and § 4 says plainly that this "is
 * correct and intentional".
 *
 * [NOT ADDED] An eyebrow. The supplied reference — the homepage's own rail —
 * carries a `Simple process` pill above its heading, and § 4's copy list has no
 * eyebrow for this section. There is no approved string to put there, and
 * coding-guidelines.md is explicit that missing content renders nothing rather
 * than a placeholder. The section's own type has no slot for one.
 *
 * [NOT ADDED] A CTA. § 4: "Clarity's timeline carries no CTA; preserve that."
 * § 2's CTA discipline says the same of §§ 3, 4 and 6 together.
 *
 * [BLOCKER] § 3.4 sends the hero's `Explore Omanga` pill to `#mission-vision`,
 * an in-page anchor. This section is named by its heading's id
 * (`about-mission-vision-heading`) and carries no `id` of its own, because
 * `Section` sets `aria-labelledby` and takes no `id` prop. The anchor is
 * unresolved either way: the hero stage did not mount that CTA. Both land
 * together or neither does.
 */

export type MissionVisionPhase = {
  readonly id: string;
  readonly heading: string;
  readonly body: string;
};

/**
 * 🔒 LOCKED — approved Omanga copy, verbatim. § 4: "Do not rewrite or optimise."
 *
 * Mission is 38 words, Vision 22. § 4 states both counts against Clarity's
 * 20–60 word range and concludes "No padding required and none should be added."
 *
 * The two labels are ♻️ REUSED and keep their Title Case. § 3.2 sets sentence
 * case for new headings and exempts these by name: "the timeline phase labels
 * `Our Mission` and `Our Vision` … Casing consistency does not override the
 * locked-copy rule."
 */
const PHASES: readonly MissionVisionPhase[] = [
  {
    id: "our-mission",
    heading: "Our Mission",
    body: "To deliver exceptional and personalized destination services that connect travelers to the continent. We are committed to promoting curated experiences, empowering local communities, and partnering with clients to create memorable journeys that reflect Africa's true spirit and hospitality.",
  },
  {
    id: "our-vision",
    heading: "Our Vision",
    body: "To be a leading destination services company, showcasing the continent's rich diversity, culture, and natural beauty through authentic, sustainable, and transformative experiences.",
  },
] as const;

export type AboutMissionVisionContent = {
  readonly heading: string;
  readonly intro: string;
  readonly phases: readonly MissionVisionPhase[];
};

export const aboutMissionVisionContent: AboutMissionVisionContent = {
  // ✏️ NEW. § 4 and § 3.2, transcribed unchanged. Sentence case per § 3.2.
  heading: "Our mission and vision",
  // ✏️ NEW. § 4's section sub-line, transcribed unchanged including its full stop.
  intro: "Where Omanga is going, and what gets us there.",
  phases: PHASES,
} as const;

export const ABOUT_MISSION_VISION_HEADING_ID =
  "about-mission-vision-heading" as const;
