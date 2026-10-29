import { Fragment } from "react";

import { TextLink } from "@/components/ui/TextLink";
import type { LegalRichText as LegalRichTextValue } from "@/types/legal.types";

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
