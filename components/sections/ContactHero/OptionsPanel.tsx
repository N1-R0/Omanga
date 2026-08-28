import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { CONTACT_EMAIL } from "@/config/site";
import { contactFormContent } from "@/content/contact-form.content";
import type { ContactOptionsContent } from "@/content/contact-options.content";

import { OptionCard } from "./OptionCard";
import { BackLink, TalkForm } from "./TalkForm";

/**
 * The contact options panel — spec § 3, rendered as the hero band's right column.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from node 2579:131893] The panel.
 *
 * `#f6f6f6` at radius 16, 24 inline padding and 40 block, with the `h2` at 28px
 * and the two cards stacked 12 apart, 24 below the heading. All tokens:
 * `--color-surface-light`, `--radius-md`, `--space-4`, `--space-6`, `--text-h4`,
 * `--space-2`.
 *
 * The block padding is larger than the inline padding, which is deliberate in the
 * node and worth keeping — the cards already carry 24 of their own inline
 * padding, so matching the panel's would put 48 of dead space either side of
 * their copy.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Two cards stacked, not a row.
 *
 * The node stacks them full-width, and § 3 asks for the same thing: "Cards widen
 * to fill the row rather than leaving a gap where `Get a demo` was." A `Grid`
 * with two columns would reproduce the gap the removed third card left.
 *
 * ---------------------------------------------------------------------------
 * [PENDING § 4] This panel is where the selected form renders, and the benchmark
 * settles how.
 *
 * § 4 says the form "replaces the options grid in place, in the same container,
 * at the same vertical position", and the benchmark's own markup — read from the
 * live page, 2026-08-27 — shows how it does it: the options grid and all three
 * forms are siblings inside this container, every one of them present in the
 * server HTML, with visibility toggled rather than mounted. Each form carries its
 * own `Go back` control, its `h2`, its fields and both its success and error
 * blocks.
 *
 * That resolves what looked like a contradiction in the spec. § 4 note 3 says
 * "only one form is ever mounted and visible. Never stack both", while § SEO says
 * "form H2s are present in the DOM but revealed on interaction — crawlable either
 * way, since the markup ships with the page." Both hold if "mounted" means
 * "visible": everything ships, one thing shows.
 *
 * So § 4 renders the cards and both forms here, with `?enquiry=` deciding which
 * block is `hidden` — see `OptionCard` for why the selection lives in the query.
 * That keeps it a Server Component, keeps both form headings in the crawled DOM
 * for § SEO's hierarchy, and means the routing works with JavaScript disabled.
 * Rendering only the selected form would have been simpler and would have cost
 * both `h2`s.
 *
 * Until then a card click sets the query and this panel re-renders unchanged,
 * which is the one loose end this stage leaves.
 */

const PANEL_CLASS =
  "rounded-md bg-surface-light px-fluid-4 py-fluid-6 text-ink focus-ring-on-light";

export type OptionsPanelProps = {
  content: ContactOptionsContent;
  headingId: string;
  /**
   * The selected option's `enquiry` value, read from the query string by the
   * page. `undefined` means no selection, which § 3 requires as the initial
   * state: "Do not default-open either form. The grid must be the initial state
   * so the choice is conscious."
   */
  selected?: string;
  /** The page's own path, for `Go back` and for the cards' hrefs. */
  path: string;
};

export function OptionsPanel({
  content,
  headingId,
  selected,
  path,
}: OptionsPanelProps) {
  const option = content.options.find((entry) => entry.enquiry === selected);

  return (
    <div className={PANEL_CLASS}>
      {/*
        `gap="lg"` (20 → 24) between the heading and the stack, which is the
        node's 24 and the system's heading-to-content step.
      */}
      <Stack gap="lg">
        {option === undefined ? (
          <>
            {/*
              An `h2`, per § SEO's hierarchy — "H2 | How can we help? | 3". It
              keeps that level even though the panel now sits inside the hero
              band: the level is the document outline, not a statement about
              nesting, and the cards' `h3`s sit beneath it without skipping.

              `role="feature"` is `--text-h4` (24 → 28), the node's 28px. Not
              `section` (32 → 42) — this heading titles a panel inside a band,
              not a band, and at 42 it would compete with the `h1` in the column
              beside it.
            */}
            <Heading id={headingId} level="h2" role="feature" measure="none">
              {content.heading}
            </Heading>

            {/*
              `gap="sm"` (10 → 12) — the node's 12. Tighter than any other card
              gap on the site, and correctly so: these two are one control set to
              choose between, not two separate offers.
            */}
            <Stack gap="sm">
              {content.options.map((entry) => (
                <OptionCard key={entry.id} option={entry} path={path} />
              ))}
            </Stack>
          </>
        ) : option.enquiry === "talk" ? (
          /*
            Form A. Its own `h2` replaces `How can we help?` — § 4: "H2 repeating
            the option name" — so the outline still has exactly one `h2` in this
            panel whichever state is showing, and § SEO's hierarchy lists both.
          */
          <TalkForm backHref={path} headingId={headingId} />
        ) : (
          <NotificationsInterim path={path} />
        )}
      </Stack>
    </div>
  );
}

/**
 * The Notifications option, held.
 *
 * [BLOCKER] § 4's Form B collects newsletter subscribers, and there is nowhere to
 * put them. The shared Route Handler sends one email per submission to the
 * business mailbox, which is an enquiry mechanism rather than a mailing list —
 * subscribing someone by emailing a human is not a subscription. § Open questions
 * 6 and 7 are unanswered too: whether double opt-in is implemented determines
 * § 4B's success message, and the real send frequency determines whether "two or
 * three emails a month" can be published at all.
 *
 * So the card stays — § 0 mandates two options and § 3 orders them — and
 * selecting it gets the section's approved copy plus the route § 4B's own error
 * state already names. That is the same shape § 5 specifies for the blocked
 * WhatsApp card: "the only acceptable interim is to replace the CTA with the email
 * address and a plain statement", never a dead control.
 *
 * Six fields, a consent checkbox and a privacy line land the moment a provider is
 * named. Nothing here is a placeholder for them: there is no disabled form and no
 * "coming soon".
 */
function NotificationsInterim({ path }: { path: string }) {
  return (
    <Stack gap="lg" align="start">
      {/*
        The same `Go back` the form has, so the two states behave identically.
        Imported from the form rather than re-implemented — it is the one control
        both share.
      */}
      <BackLink href={path} label={contactFormContent.backLabel} />

      <Heading
        id="contact-notifications-heading"
        level="h2"
        role="feature"
        measure="none"
      >
        Notifications
      </Heading>

      {/*
        ✏️ § 4B's intro, transcribed unchanged, minus its `[VERIFY frequency]`
        sentence — "Two or three emails a month, and one click to stop" is a
        publishable claim only once § Open question 7 is answered, and this is the
        interim precisely because it is not.
      */}
      <Text role="small" measure="none">
        Practical updates for travelling across Africa, plus news about Omanga
        payments and insurance.
      </Text>

      {/*
        [FLAGGED — needs approval] Four words of new copy: "To subscribe today,".
        Everything after it is § 4B's own error-state clause — "email
        info@omanga.biz and we'll add you manually" — which is approved copy for
        exactly this situation. The alternative was inventing a sentence about
        product state, which would be a claim rather than a route.
      */}
      <Text role="small" measure="none">
        To subscribe today,{" "}
        <TextLink href={`mailto:${CONTACT_EMAIL}`} tone="light">
          email {CONTACT_EMAIL}
        </TextLink>{" "}
        and we&apos;ll add you manually.
      </Text>
    </Stack>
  );
}
