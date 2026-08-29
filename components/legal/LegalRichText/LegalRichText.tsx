import { Fragment } from "react";

import { TextLink } from "@/components/ui/TextLink";
import type { LegalRichText as LegalRichTextValue } from "@/types/legal.types";

/**
 * Renders one run of legal prose, with its links.
 *
 * Links go through the site's own `TextLink`, so a link inside a policy looks and
 * behaves exactly like a link anywhere else on the site — same colour, same
 * underline, same focus ring, and the same `target="_blank"` plus
 * `rel="noopener noreferrer"` on external destinations.
 *
 * `tone` is fixed to `light`: every legal page is a light surface, and passing it
 * down from each caller would be a prop that is never anything else.
 */

export type LegalRichTextProps = {
  content: LegalRichTextValue;
};

export function LegalRichText({ content }: LegalRichTextProps) {
  return (
    <>
      {content.map((piece, index) => (
        <Fragment key={index}>
          {typeof piece === "string" ? (
            piece
          ) : (
            <TextLink
              href={piece.href}
              tone="light"
              isExternal={piece.isExternal ?? false}
            >
              {piece.text}
            </TextLink>
          )}
        </Fragment>
      ))}
    </>
  );
}
