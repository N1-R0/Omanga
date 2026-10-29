import type { PageMetaContent } from "@/types/content.types";

export type LegalLink = {
  readonly text: string;
  readonly href: string;
  readonly isExternal?: boolean;
};

export type LegalInline = string | LegalLink;

export type LegalRichText = readonly LegalInline[];

export type LegalCookieRow = {
  readonly name: string;
  readonly provider: string;
  readonly purpose: string;
  readonly category: string;
  readonly duration: string;
  readonly consent: string;
};

export type LegalBlock =
  | { readonly kind: "paragraph"; readonly content: LegalRichText }
  | {
      readonly kind: "list";
      readonly style: "bullet" | "number";
      readonly items: readonly LegalRichText[];
    }
  | {
      readonly kind: "definitions";
      readonly items: readonly {
        readonly term: string;
        readonly description: LegalRichText;
      }[];
    }
  | {
      readonly kind: "cookieTable";
      readonly caption: string;
      readonly rows: readonly LegalCookieRow[];
    }
  | {
      readonly kind: "confirm";
      readonly title: string;
      readonly content: LegalRichText;
    }
  | {
      readonly kind: "note";
      readonly title: string;
      readonly content: LegalRichText;
    };

export type LegalSubsection = {
  readonly id: string;
  readonly heading: string;
  readonly blocks: readonly LegalBlock[];
};

export type LegalSection = {
  readonly id: string;
  readonly heading: string;
  readonly blocks: readonly LegalBlock[];
  readonly subsections?: readonly LegalSubsection[];
};

export type LegalDocumentContent = {
  readonly meta: PageMetaContent;
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly effectiveDate: string;
  readonly intro?: readonly LegalBlock[];
  readonly sections: readonly LegalSection[];
};
