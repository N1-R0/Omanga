import type { Eyebrow, ImageAsset } from "@/types/content.types";

/**
 * Our Story — spec § 3.
 *
 * The emotional centre of the page: one uninterrupted narrative block with no
 * sub-headings, no bullets, no CTA and no image inside the copy column.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The layout reference is now a supplied Figma node, not Stayli.
 *
 * Spec § 3 mirrors Stayli's story panel: a narrow left column holding the
 * eyebrow, a wide right column holding the prose. The supplied reference
 * (`Super-App`, node 2578:131852) is a different arrangement — a centred copy
 * column with a photograph cropped off each side of the band — and it governs
 * the layout. The geometry read off that node is recorded in the section
 * component.
 *
 * What does not change: the copy, its order, and the two-tone fade. § 3 is
 * explicit that the fade is "a rendering decision only — no words change, no
 * order changes", and that holds whether the block is left-aligned or centred.
 *
 * ---------------------------------------------------------------------------
 * [NOT MOUNTED] The reference's CTA.
 *
 * The node carries a gradient pill reading `nous contacter` beneath the
 * paragraph. No CTA ships here. § 3: "Stayli's story panel has no exit and
 * neither does Omanga's — persuasion compounds instead of leaking." § 2's CTA
 * discipline says the same of §§ 3, 4 and 6 together and puts the page's two CTA
 * moments in the hero and the closer.
 *
 * That leaves a real problem to decide rather than a resolved one: the hero
 * stage dropped § 2's `Explore Omanga` pill because the screenshot governing it
 * had no button, so the page currently has no CTA at all before § 7. The fix is
 * to restore the hero's, not to open an exit here.
 *
 * [NOT MOUNTED] The reference's gradient. The node fills its pill with a
 * pink-to-blue gradient and draws a gradient border around each photograph.
 * Neither exists in this design system: design.md § 7 is explicit that the site
 * is flat, with separation from surface colour and 1px hairlines, and § 8 gives
 * one brand colour rather than a ramp. Reproducing the reference's palette would
 * make this band the only gradient on the site.
 */

/**
 * Which colour tier a paragraph belongs to.
 *
 * `emphasis` is the surface's own full-contrast foreground; `recede` is that
 * same colour at 80% opacity. Named for the job rather than for a colour —
 * "white" and "mid-grey" are § 3's words for how it looks on the dark panel, and
 * a field called `white` would be wrong the moment the panel is not dark.
 */
export type StoryTier = "emphasis" | "recede";

export type StoryParagraph = {
  readonly text: string;
  readonly tier: StoryTier;
};

/**
 * 🔒 LOCKED — approved Omanga copy, verbatim. § 3: "Do not rewrite, improve,
 * shorten or expand."
 *
 * 119 words across three paragraphs at 33 / 41 / 45. § 3 states the count and
 * instructs that "the layout adapts, not the copy" — so nothing here is cut to
 * fit a panel, and nothing is padded to fill the reference's slot.
 *
 * [FLAGGED — needs approval] § 5 item 3: the "Born from a vision…" sentence
 * currently sits in the About hero as a sub-line, and § 3 moves it to the head
 * of the story so the fade has an emphasis tier. No words change. § 5 asks for
 * the move to be confirmed and it has not been — shipped because § 3 specifies
 * it and the hero built at the previous stage does not carry the sentence, so
 * holding it would leave the line on no section at all.
 *
 * [NOTE] § 3 gives the recede tier as one quoted block containing two
 * paragraphs. They are two in the approved source and are kept as two: joining
 * them would run "…nothing short of extraordinary." into "Our platform is
 * designed…" as 86 unbroken words, which changes how the copy reads even though
 * no word moves.
 */
const PARAGRAPHS: readonly StoryParagraph[] = [
  {
    text: "Born from a vision to make African travel seamless and accessible, Omanga bridges the gap between wanderlust and reality, providing the financial tools and peace of mind needed to explore our beautiful continent.",
    tier: "emphasis",
  },
  {
    text: "At Omanga, we serve as your accessible gateway to affordable, high-quality services that make navigating different African destinations effortless. Whether you're visiting for business, leisure, or cultural exploration, we're committed to ensuring your journey is nothing short of extraordinary.",
    tier: "recede",
  },
  {
    text: "Our platform is designed for travelers visiting African locations for short periods, providing them with essential services that enhance their experience from arrival to departure. We believe that every visitor to our beautiful continent should leave with unforgettable memories and a smile on their face.",
    tier: "recede",
  },
] as const;

/**
 * The two flanking photographs.
 *
 * Both `alt` are empty, and this is the one place on the page where that is
 * unambiguous: each image is cropped by roughly half at the band edge, neither
 * carries text, and § 3 forbids an image "inside the panel" at all — these sit
 * outside the copy column as the band's atmosphere. A screen-reader user loses
 * nothing, and the hero one band above already carries the page's described
 * photograph.
 *
 * [ASSETS] Both are existing Omanga assets. The left is the one supplied for the
 * photographic band that this section replaces — the band is removed on
 * instruction, so the asset moves here rather than going unused.
 *
 * [FLAGGED] 6.2MB and 3.6MB against boxes that render at most ~680 wide.
 * § Image optimization: "Serve at the largest rendered size, not the source
 * size. Re-export oversized assets." `next/image` protects the browser; the
 * repository still carries the weight.
 *
 * [QUESTION] The right-hand asset is payments product photography — a woman
 * using her phone in a street — and was named for that job. It reads as a
 * traveller here, which is why it is usable, but it is the weaker of the two
 * against § 3's subject. It is also the last unused human asset in `public/`;
 * a third is worth sourcing if § 6 needs three of its own.
 */
export type AboutStoryImages = {
  readonly left: ImageAsset;
  readonly right: ImageAsset;
};

const IMAGES: AboutStoryImages = {
  left: {
    src: "/person-wearing-colorful-fashion.jpg",
    alt: "",
    width: 5376,
    height: 3584,
  },
  right: {
    src: "/spend more.jpg",
    alt: "",
    width: 3500,
    height: 2333,
  },
} as const;

export type AboutStoryContent = {
  readonly eyebrow: Eyebrow;
  /**
   * The section's `h2`. Rendered for the outline and for § 3.2's hierarchy, and
   * visually suppressed — see the section component for how, and § 3's note for
   * why: "It must not compete with the story text."
   */
  readonly heading: string;
  readonly paragraphs: readonly StoryParagraph[];
  readonly images: AboutStoryImages;
};

/**
 * No `action` field, and none should be added. See the CTA note at the top of
 * this file: the type has no slot for one, so a link cannot appear in this band
 * without deleting that note first.
 */
export const aboutStoryContent: AboutStoryContent = {
  // ♻️ REUSED. § 3, sentence case as written.
  eyebrow: "Our story",
  // ✏️ NEW. § 3 and § 3.2, transcribed unchanged.
  heading:
    "The story behind Africa's integrated destination services platform",
  paragraphs: PARAGRAPHS,
  images: IMAGES,
} as const;

export const ABOUT_STORY_HEADING_ID = "about-story-heading" as const;
