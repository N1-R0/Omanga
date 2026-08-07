/**
 * The contract every content module must satisfy.
 *
 * project-context.md: "Copy is data, never markup. Every string comes from a
 * typed content module traceable to the approved copy doc." These types are
 * what make that enforceable — a renamed or missing field fails the build
 * rather than rendering an empty element in production.
 *
 * Everything is `readonly`. Content is static, authored data; nothing mutates
 * it at runtime.
 *
 * Note on absent content: there is no `string | undefined` fallback anywhere
 * that would let a placeholder through. Where a fact is unverified, the whole
 * optional block is omitted and the section renders without that element
 * (coding-guidelines.md: "Missing or unverified content renders nothing rather
 * than a placeholder, an empty container, or invented data").
 */

/**
 * An internal or external destination.
 *
 * `label` is the anchor text and is required. SEO expectations forbid
 * "learn more" and "click here", so the label always describes the target —
 * the type cannot enforce that, but nothing else may supply the text.
 */
export type LinkTarget = {
  readonly label: string;
  readonly href: string;
  /** Set only for links that leave the site. Adds rel/target at render time. */
  readonly isExternal?: boolean;
  /**
   * The label is approved but the route it points at does not exist yet.
   *
   * The link still renders as a real, descriptive anchor — the approved
   * information architecture stays reviewable, and a stub route is a routing
   * task rather than a copy question. Setting this emits a
   * `data-route-pending` attribute, so the outstanding stubs are greppable in
   * the source and auditable in the rendered DOM instead of living only in a
   * handoff note.
   *
   * Every flag here must be cleared before launch; each one is a 404.
   */
  readonly isRoutePending?: boolean;
};

/**
 * A call to action.
 *
 * Separate from `LinkTarget` because a CTA carries hierarchy: exactly one
 * `primary` per section is permitted (design.md § Component
 * consistency rules, rule 3).
 */
export type CallToAction = LinkTarget & {
  readonly emphasis: "primary" | "secondary" | "text";
};

/**
 * An image asset.
 *
 * `alt` is required and has no default. A decorative image passes an explicit
 * empty string, which is a deliberate statement rather than an omission
 * (component-rules.md § Image component rules).
 *
 * `width` and `height` are the intrinsic dimensions and are required so every
 * media box can reserve its space before load, protecting the CLS budget.
 */
export type ImageAsset = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

/**
 * A titled column of links in the footer.
 *
 * `heading` is a visible heading, not an `aria-label`: the four column titles
 * are approved copy and are what name each list to a screen reader.
 *
 * Shared by the footer content module, `FooterColumn` and `Footer`, which is
 * what puts it here rather than beside a component.
 */
export type FooterLinkColumn = {
  readonly heading: string;
  readonly links: readonly LinkTarget[];
};

/**
 * The short pill label that sits above a section heading.
 * Plain text: eyebrow pills share one geometry everywhere and carry no markup.
 */
export type Eyebrow = string;

/**
 * The fixed structure of a section's content.
 *
 * component-rules.md § Section rules: "Structure is fixed: optional eyebrow,
 * one heading, optional intro, content, optional action." That shape is
 * encoded here so a section module cannot introduce a second heading or a
 * differently named intro field.
 *
 * `TContent` is the section-specific payload — cards, steps, tabs. Each
 * section module narrows it to its own type.
 */
export type SectionContent<TContent> = {
  readonly eyebrow?: Eyebrow;
  readonly heading: string;
  readonly intro?: string;
  readonly content: TContent;
  readonly action?: CallToAction;
};

/**
 * Metadata for a route, consumed by the App Router Metadata API.
 *
 * Deliberately minimal: only the fields the SEO spec requires. Open Graph and
 * Twitter values are derived from these at the route level rather than
 * duplicated per page, so a title can never drift between the tag and the
 * card.
 */
export type PageMetaContent = {
  readonly title: string;
  readonly description: string;
  /** Path only, relative to the site origin. The canonical URL is composed. */
  readonly path: string;
  readonly ogImage?: ImageAsset;
};
