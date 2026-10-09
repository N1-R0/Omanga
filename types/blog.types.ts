import type { LinkTarget, PageMetaContent } from "@/types/content.types";
import type {
  LegalBlock,
  LegalRichText,
  LegalSection,
} from "@/types/legal.types";

/**
 * Blog and FAQ content shapes.
 *
 * Article bodies reuse the legal documents' block model (`LegalBlock`,
 * `LegalSection`) rather than introducing a second rich-text format: both are
 * long-form prose with headings, paragraphs, lists and inline links, and one
 * renderer means one place for link, list and note styling to live.
 */

export type FaqItem = {
  readonly question: string;
  /**
   * Plain text answer, mirrored into `FAQPage` structured data. Kept as a
   * string (not rich text) so the visible answer and the schema answer are the
   * same characters — Google treats a mismatch as a markup violation.
   */
  readonly answer: string;
};

export type FaqContent = {
  readonly heading: string;
  readonly intro?: string;
  readonly items: readonly FaqItem[];
};

export type BlogCategory = "Payments" | "Insurance" | "Travel";

export type BlogPost = {
  /** URL segment under `/blog/`. Never change once published. */
  readonly slug: string;
  readonly meta: PageMetaContent;
  readonly category: BlogCategory;
  readonly title: string;
  /** One or two sentences. Used as the standfirst and on the index card. */
  readonly summary: string;
  /** ISO date, `YYYY-MM-DD`. */
  readonly publishedDate: string;
  readonly updatedDate?: string;
  readonly readingMinutes: number;
  readonly intro: readonly LegalBlock[];
  readonly sections: readonly LegalSection[];
  readonly faq?: FaqContent;
  /** The product page this article supports. Rendered as the closing action. */
  readonly cta: LinkTarget & { readonly prompt: LegalRichText };
};
