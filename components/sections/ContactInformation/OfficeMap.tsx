import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { Stack } from "@/components/layout/Stack";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { WHATSAPP_URL } from "@/config/site";
import type { OfficeMapContent } from "@/content/contact-information.content";

import { MapFrame } from "./MapFrame";

/**
 * The office on an embedded Google map, with the address in text beneath it.
 *
 * ---------------------------------------------------------------------------
 * [REVERSES § 6] The spec removes the map "entirely. Not replaced."
 *
 * Added on instruction, and the reason § 6 gave has been overtaken rather than
 * overruled. § 6's argument was specifically that there was nothing to show:
 * "Omanga publishes no office addresses, so there is nothing to pin. A map showing
 * a single corporate marker, or worse a decorative map of Africa, would be pure
 * ornament — added page weight, a third-party script, a tile-loading cost on
 * mobile data, and an accessibility surface with no informational payload."
 *
 * An address now exists, so the last clause no longer holds — there is a payload,
 * and it is one real pin. The other three objections are real and are answered
 * rather than ignored:
 *
 *   page weight        one iframe, no script tag of our own, nothing bundled
 *   mobile data        `loading="lazy"`, so no tile is fetched until the frame is
 *                      near the viewport. On a page whose subject is the form
 *                      above, most visitors never pay for it.
 *   accessibility      the frame is titled, and the address is real text beneath
 *                      it. A map is not an accessible substitute for an address:
 *                      it is unreadable to a screen reader, unusable to a keyboard
 *                      user in any detail, and uncopyable. The text is the
 *                      information; the map is an illustration of it.
 *
 * ---------------------------------------------------------------------------
 * [RESOLVED — privacy] The frame contacted Google before anything asked.
 *
 * This note previously stood as an open blocker: "no cookie banner or consent
 * mechanism anywhere in the application", with two suggested fixes — gate the
 * frame behind a consent choice, or swap it for a static image.
 *
 * The first is now implemented. The `<iframe>` moved into `MapFrame`, which is a
 * client component behind the functional-cookie gate, so the request to
 * `maps.google.com` is not made at all until a visitor allows it. The Privacy
 * Policy and Cookie Policy that this note said were unpublished are now at
 * `/privacy-policy` and `/cookie-policy`, and both name Google as the recipient.
 *
 * What stays here: the address as real text beneath the frame, which is the
 * accessible carrier of the information and does not depend on the map loading.
 */

/**
 * `h-image-band` (280 → 525) is the site's one media-band height, reused rather
 * than a new token invented for a single caller. `--radius-md` is the token for a
 * large media plate, and `overflow-hidden` is what makes the iframe's square
 * corners take it.
 */
const FRAME_CLASS =
  "h-image-band w-full overflow-hidden rounded-md bg-surface-light";

export type OfficeMapProps = {
  content: OfficeMapContent;
  address: string;
};

export function OfficeMap({ content, address }: OfficeMapProps) {
  return (
    <Stack gap="lg" align="stretch">
      <div className={FRAME_CLASS}>
        {/*
          `title` is required, not optional. An untitled iframe is an unnamed frame
          in the accessibility tree — a screen-reader user reaches it and is told
          nothing about what they have entered. It is chrome rather than marketing
          copy, so it lives in the content module for the same reason the skip link
          label and the navigation landmark name do. It is passed through to
          `MapFrame` so the string still has exactly one owner.

          The frame itself, its `loading`, its `referrerPolicy` and the consent
          gate in front of all three now live in `MapFrame` — the gate has to read
          client state, and this component is a server component. The reasoning
          for each attribute moved with it.
        */}
        <MapFrame title={content.frameTitle} />
      </div>

      {/*
        The office block. The same `product-secondary` card the three routes above
        use, so it reads as a fourth contact route rather than a caption on the
        map — which is what asking for the address to be prominent amounts to.

        [OVERRIDES § 5] § 5 said "not as a fourth card, which would imply a
        visitable office Omanga has not confirmed." The office is confirmed and the
        map states it, so there is no longer an implication to avoid.

        Left-aligned, where the section's heading is centred: it is a card with
        three stacked lines, and centring an address makes the street and the city
        hard to read as one line. `Card` handles its own padding and radius.
      */}
      <Card
        variant="product-secondary"
        heading={
          /*
            An `h3`, a peer of the three card headings above it. It sits under this
            section's `h2` and skips no level.

            [ADDED to § SEO's hierarchy] The spec's heading table lists three
            `h3`s for § 5 because § 6 removed the map and § 5's address was a plain
            paragraph. This is a fourth, and the table wants updating with it.
          */
          <Heading
            id="contact-office-heading"
            level="h3"
            role="column"
            measure="none"
          >
            {content.officeHeading}
          </Heading>
        }
        body={
          <Stack gap="md" align="start">
            {/*
              The address as real text, at body size rather than the small
              secondary it was. It is the information the map illustrates, not a
              caption on it: WCAG requires information not be carried by a single
              means, and a map conveys nothing to a screen reader, nothing to a
              keyboard user in any detail, and cannot be copied into a taxi app.

              `address` is the correct element — HTML reserves it for the contact
              details of its nearest article or body, which on a contact page is
              the document. `not-italic` undoes the browser default, since the
              italic is a rendering convention rather than anything the address
              means.
            */}
            <address className="not-italic">
              <Text role="body" as="span">
                {address}
              </Text>
            </address>

            {/*
              The chat number, displayed in full and linked to WhatsApp.

              Displayed rather than hidden behind a label, for the reason § 5 gives
              about the email address: "a visible address is a trust signal and it
              lets people copy it." The same holds for the number a visitor may
              want to save.

              `wa.me`, never `tel:`. § 0 mandates that no phone number appears on
              this page, and that mandate replaces calling with chat — so this is
              the chat channel's identifier and there is no invitation to dial it.
              See `WHATSAPP_NUMBER_DISPLAY` for the `[VERIFY]` on its digits.
            */}
            <span className="inline-flex items-center gap-fluid-1">
              <WhatsAppMark size="sm" tone="light" />

              <TextLink href={WHATSAPP_URL} tone="light" isExternal>
                {content.whatsappNumber}
              </TextLink>
            </span>
          </Stack>
        }
      />
    </Stack>
  );
}
