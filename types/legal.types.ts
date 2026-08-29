import type { PageMetaContent } from "@/types/content.types";

/**
 * The shape of a legal document.
 *
 * Legal pages are the one part of this site where the content is longer than the
 * component that renders it, and where the wording is the deliverable. Modelling
 * them as data rather than as JSX buys three things that matter more here than
 * anywhere else:
 *
 *   one renderer      five documents cannot drift apart in their typography,
 *                     heading levels or link styling, because there is one
 *                     component and it has no per-document branches
 *   reviewable        a lawyer reviewing this reads `content/legal/*.content.ts`
 *                     and never opens a `.tsx` file
 *   auditable         `kind: "confirm"` callouts are greppable, so the set of
 *                     unverified claims on the site is a search rather than a
 *                     reading exercise
 *
 * ---------------------------------------------------------------------------
 * WHY INLINE CONTENT IS AN ARRAY AND NOT A STRING
 *
 * Legal prose links constantly — to the other four documents, to a processor's
 * own policy, to a regulator. A plain string cannot carry a link, and the usual
 * escapes are both worse than this: HTML in a content module means
 * `dangerouslySetInnerHTML` on text destined for a page about trust, and markdown
 * means shipping a parser to render five static documents.
 *
 * `readonly LegalInline[]` keeps the content as data, keeps every link's
 * destination type-checked at the point it is written, and renders through the
 * site's own `TextLink`. The cost is that a sentence with a link in the middle is
 * written as three array entries.
 */

export type LegalLink = {
  readonly text: string;
  readonly href: string;
  readonly isExternal?: boolean;
};

export type LegalInline = string | LegalLink;

export type LegalRichText = readonly LegalInline[];

/**
 * A row of the cookie inventory table.
 *
 * Its own block kind rather than a generic table, because the Cookie Policy's
 * table is not free-form: every row has exactly these six facts, and a policy
 * that omits one of them for one row is incomplete. The type is what makes that
 * impossible to do by accident.
 */
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
  /**
   * A fact that could not be established from the website, the codebase or a
   * verifiable public source, rendered visibly rather than guessed.
   *
   * Deliberately conspicuous. The alternative — inventing a company number, a
   * response time or an underwriter's name so the page reads smoothly — puts a
   * false statement on a page whose whole purpose is to be relied upon. A visible
   * gap is honest and gets fixed; an invented fact reads as finished and does not.
   */
  | {
      readonly kind: "confirm";
      readonly title: string;
      readonly content: LegalRichText;
    }
  /** Context that is true and useful but is not itself a term. */
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
  /** The page's one `h1`. */
  readonly title: string;
  /** One paragraph saying what this document is and who it binds. */
  readonly summary: string;
  /** ISO 8601 date. Rendered as a `<time>` element. */
  readonly effectiveDate: string;
  readonly intro?: readonly LegalBlock[];
  readonly sections: readonly LegalSection[];
};
