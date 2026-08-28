import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import type { ContactInfoCard as ContactInfoCardContent } from "@/content/contact-information.content";

/**
 * One contact route — spec § 5's card anatomy: heading, body line, contact action.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The card is not a control; the link inside it is.
 *
 * § 5 is explicit, and gives the reason: "Cards are static content blocks, not
 * buttons — the links inside them are the controls. Do not make the whole card
 * clickable here, or the email address stops being selectable text."
 *
 * That is the opposite of § 3's option cards in the hero, where the whole card is
 * a link. The difference is what each card is for: an option card routes you
 * somewhere, so the target is the card; an information card *is* the information,
 * and wrapping it in an anchor would stop a visitor selecting and copying the one
 * string they most often want to copy.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Text links, not buttons — including WhatsApp.
 *
 * § 5's CTA table lists all three actions at the same weight, and the grid reads
 * as one set only if they share a treatment. A solid brand button on the support
 * card beside two text links would make the other two routes look secondary,
 * which is not what a contact page wants to say about its published email address.
 *
 * The hero's WhatsApp control is a solid button and stays one — § Conversion notes
 * justifies that specifically, as the fastest exit for a customer arriving with a
 * failed transaction. This card is the second, calmer offer of the same link.
 */

/**
 * `product-secondary` is `--color-surface-light` at `--radius-sm` with ink text —
 * the system's light card, and what separates the grid from the page surface
 * without giving the band a second colour.
 */
const CARD_VARIANT = "product-secondary" as const;

export type ContactInfoCardProps = {
  card: ContactInfoCardContent;
};

export function ContactInfoCard({ card }: ContactInfoCardProps) {
  return (
    <Card
      variant={CARD_VARIANT}
      heading={
        /*
          `h3`, per § SEO's hierarchy — "H3 | Email us / Need support? / Where we
          operate | 5 — info cards" — under this section's `h2`.

          `measure="none"` because the card is already a narrow column and a `ch`
          cap inside it would be a second constraint on the same line length.
        */
        <Heading
          id={`contact-info-${card.id}-heading`}
          level="h3"
          role="column"
          measure="none"
        >
          {card.heading}
        </Heading>
      }
      body={<Text role="body">{card.body}</Text>}
      action={
        /*
          A row rather than the link alone, so the WhatsApp mark can sit to the
          left of the label where § 5's CTA table puts it. The mark is outside the
          `TextLink` deliberately: the link is underlined, and an underline running
          beneath a brand glyph reads as a rendering fault.

          `tone="light"` on the mark keeps the supplied black artwork, which is
          what this surface needs — the inverted white version belongs on the
          hero's brand fill.
        */
        <span className="inline-flex items-center gap-fluid-1">
          {card.hasWhatsAppMark === true && (
            <WhatsAppMark size="sm" tone="light" />
          )}

          <TextLink
            href={card.action.href}
            tone="light"
            isExternal={card.action.isExternal}
          >
            {card.action.label}
          </TextLink>
        </span>
      }
    />
  );
}
