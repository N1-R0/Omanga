import { Container } from "@/components/layout/Container";
import { FooterColumn } from "@/components/layout/FooterColumn";
import { Logo } from "@/components/layout/Logo";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import type { FooterLinkColumn, LinkTarget } from "@/types/content.types";

/**
 * The site footer.
 *
 * A Server Component with no interactivity. Every link is in the server HTML,
 * which matters more here than anywhere else on the page: the footer is where
 * most of the internal-linking budget lives.
 *
 * Layout from the Figma frame (node 1265:13178) and design.md § Grid
 * system: "Footer: brand column 322, then four equal link columns, 40 gap, 93
 * page gutter."
 *
 * ---------------------------------------------------------------------------
 * What is deliberately absent
 *
 * rule 13 lists the footer's template artifacts and forbids them. Two are drawn
 * in the Figma frame and are not reproduced: the "© Copyright Butler 2023" line
 * (a leftover from the template, replaced by the approved notice with a live
 * year) and the oversized "OMANGA" watermark across the base.
 *
 * Three content blocks are absent because their content is not approved, not
 * because they were forgotten: the social profiles (handles are an open
 * blocker, and a social URL cannot be derived the way a page slug can), the
 * regulatory disclosure (licensing entity and underwriter are open blockers),
 * and the registered-company trust block. Each is documented in
 * `content/footer.content.ts`. An absent element is the specified behaviour for
 * unverified content on a page like this one.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED] The 93 page gutter.
 *
 * design.md gives the footer a 93 gutter where every other band uses 100.
 * 93 is off the 4px grid and is not a distinguishable difference at any real
 * viewport width, so the footer uses the standard `Container` — which is also
 * what keeps the footer's link columns aligned with the content above them
 * rather than 7px inside it.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The footer's surface is dark.
 *
 * § Color roles assigns `#161717` to "dark section backgrounds" but never names
 * the footer, and the Figma frame draws it dark. Taking the dark section rhythm
 * (130 desktop) with it, since a footer set at the light rhythm would be the
 * shortest band on a page whose last section is the brand CTA.
 */

export type FooterProps = {
  columns: readonly FooterLinkColumn[];
  brandParagraph: string;
  contact: LinkTarget;
  copyright: string;
  wordmark: string;
  homeLabel: string;
};

export function Footer({
  columns,
  brandParagraph,
  contact,
  copyright,
  wordmark,
  homeLabel,
}: FooterProps) {
  return (
    <footer className="section-rhythm bg-ink text-on-dark focus-ring-on-dark">
      <Container>
        {/*
          Mobile is one column, tablet splits the four link columns into two, and
          the 322 + four-equal-columns track list arrives at desktop. Reading
          order in the DOM is brand first then Services → Company → Support →
          Legal at every width, because nothing is ever reordered.
        */}
        <div className="grid grid-cols-2 gap-x-fluid-4 gap-y-fluid-7 tablet:gap-fluid-6 desktop:grid-cols-footer">
          <div className="col-span-2 flex flex-col gap-fluid-4 desktop:col-span-1">
            <Logo wordmark={wordmark} label={homeLabel} />

            <Text role="body" measure="feature" isSecondary>
              {brandParagraph}
            </Text>

            {/*
              The contact address is a P0 defect on the current site — the
              existing footer links `mailto:info.omanga.biz`, which is not an
              address. Composed from one constant so there is a single place it
              can be wrong.
            */}
            <TextLink href={contact.href} tone="dark">
              {contact.label}
            </TextLink>

            {/*
              Caption role: Inter 12/20, which is the system's legal and metadata
              size. Placed in the brand column rather than in a full-width bar
              because that is where the Figma frame puts it.
            */}
            <Text role="small" isSecondary>
              {copyright}
            </Text>
          </div>

          {columns.map((column) => (
            <FooterColumn key={column.heading} column={column} />
          ))}
        </div>
      </Container>
    </footer>
  );
}
