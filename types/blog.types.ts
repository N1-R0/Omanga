import type {
  ImageAsset,
  LinkTarget,
  PageMetaContent,
} from "@/types/content.types";
import type {
  LegalBlock,
  LegalRichText,
  LegalSection,
} from "@/types/legal.types";

export type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type FaqContent = {
  readonly heading: string;
  readonly intro?: string;
  readonly items: readonly FaqItem[];
};

export type BlogCategory = "Payments" | "Insurance" | "Travel";

export type BlogPost = {
  readonly slug: string;
  readonly meta: PageMetaContent;
  readonly category: BlogCategory;
  readonly title: string;
  readonly summary: string;
  readonly publishedDate: string;
  readonly updatedDate?: string;
  readonly readingMinutes: number;
  readonly image: ImageAsset;
  readonly imageCredit?: { readonly name: string; readonly url: string };
  readonly intro: readonly LegalBlock[];
  readonly sections: readonly LegalSection[];
  readonly faq?: FaqContent;
  readonly cta: LinkTarget & { readonly prompt: LegalRichText };
};
