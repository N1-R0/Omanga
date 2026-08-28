import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

/**
 * The one button primitive. It covers every button and every button-styled
 * link on the site.
 *
 * button rules: "The rendered element follows semantics: `button` for actions,
 * `a` for navigation, chosen by prop, never by styling." That is why `as` is a
 * discriminant rather than a style choice — a link cannot be given `onClick`,
 * `disabled` or a loading state, because those are meaningless on navigation,
 * and the type makes them unreachable.
 *
 * Button owns no layout. There is no `fullWidth` prop: width is the parent's
 * decision, and a `Stack` with `align="stretch"` is how buttons go full-width
 * on mobile. There is no `className` passthrough either — if a caller needs to
 * position a button, it positions the button's container.
 */

/** design.md § 9. Closed set of three. */
type ButtonVariant = "primary" | "secondary" | "text";

type ButtonPresentation = {
  /**
   * The label. Verb-led, and passed in as content — the component never
   * composes or transforms label text.
   */
  children: ReactNode;
  variant: ButtonVariant;
  /**
   * The surface the button sits on. Selects the correct secondary treatment.
   * Passed explicitly; never inferred from a parent class.
   */
  tone: Tone;
  /**
   * Optional trailing icon at 16px, decorative and hidden from assistive tech.
   */
  trailingIcon?: ReactNode;
  /**
   * Optional leading icon at 16px, decorative and hidden from assistive tech.
   *
   * [ADDED] This slot said "leading icons are not supported: the design has
   * none, and adding a slot for a use case that does not exist is how a
   * primitive rots." The use case now exists and is specified rather than
   * inferred: the Contact page's § 2 requires "`Chat on WhatsApp`, solid button,
   * WhatsApp glyph left of label", and a channel's own mark to the left of the
   * verb is what tells a visitor which app is about to open.
   *
   * It stays a narrow slot. Both icons are decorative and neither may be the
   * control's only label — a button with an icon and no text is a different
   * component, and this one always renders `children`.
   */
  leadingIcon?: ReactNode;
};

export type ButtonProps =
  | (ButtonPresentation & {
      as: "button";
      type?: "button" | "submit" | "reset";
      onClick?: () => void;
      /**
       * A disabled button is never the only feedback for a blocked action.
       * The caller must also explain the block in text.
       */
      isDisabled?: boolean;
      /**
       * Loading state. Present means loading, and the announcement travels
       * with it — a loading button that says nothing to a screen reader is
       * not a state this type can express.
       *
       * `label` comes from a content module like every other string.
       */
      loading?: { readonly label: string };
    })
  | (ButtonPresentation & {
      as: "link";
      href: string;
      /** Adds the target and rel attributes. Internal links use `next/link`. */
      isExternal?: boolean;
    });

/**
 * Shared geometry. design.md § 9.
 *
 * [MEASURED] 16 × 24 padding and a body-size label at weight 400, replacing the
 * previous 12 × 20 at 14/600. The reference sets its buttons at body size in
 * regular weight, and the difference is not cosmetic: a 14px semibold pill reads
 * as a form control, an 18px regular pill reads as an invitation. This is the
 * single largest contributor to the buttons feeling small against the reference.
 *
 * `text-button` is `--text-main` at line-height 1, so the pill's height is set by
 * its padding alone rather than by the label's leading — which is what keeps the
 * two variants exactly the same height despite one carrying a border.
 *
 * Padding is fluid: `--space-3` (14 → 16) block, `--space-4` (20 → 24) inline, so
 * the control shrinks with the viewport instead of eating a third of a 320px
 * screen. `hit-area` holds the 44px WCAG floor underneath.
 */
const BASE_CLASS =
  "inline-flex items-center justify-center gap-fluid-1 font-sans text-button hit-area focus-ring transition-standard";

const SHAPE_CLASS = "rounded-pill py-fluid-3 px-fluid-4";

/**
 * Variant × tone.
 *
 * [MEASURED] Hover is an INVERSION, not a tint.
 *
 * The reference sends both its filled and its bordered button to the same place
 * on hover — an ink fill with a light label — so a button group reads as one
 * control set rather than as two controls that happen to sit together. The
 * previous behaviour (filled variants darken 8%, bordered variants fill at 10%
 * of their border colour) produced two unrelated hover states and neither was
 * strong enough to register as feedback.
 *
 * The brand tone is the exception, and necessarily: the band is already brand,
 * so the resting state is a white fill and hover goes to ink. Same inversion,
 * opposite starting point.
 *
 * [MEASURED] `secondary` on `dark` carries no resting fill. The dark tone's only
 * use is beside a primary over photography, and a white @20% fill lightens the
 * 55%-scrimmed sky enough to put the white label at 3.83:1 — an AA failure at
 * every breakpoint. Transparent, the same label sits on the scrim directly at
 * 6.01:1 and the 1px white border marks the control at 5.74:1. Do not restore
 * the fill without re-measuring.
 */
const VARIANT_CLASS: Readonly<Record<ButtonVariant, Record<Tone, string>>> = {
  primary: {
    light: "bg-brand text-on-dark hover:bg-ink",
    dark: "bg-brand text-on-dark hover:bg-ink",
    brand: "bg-surface-page text-brand hover:bg-ink hover:text-on-dark",
  },
  secondary: {
    light: "border border-ink text-ink hover:bg-ink hover:text-on-dark",
    dark: "border border-on-dark text-on-dark hover:border-ink hover:bg-ink",
    brand:
      "border border-on-dark text-on-dark hover:border-ink hover:bg-ink",
  },
  text: {
    light: "text-brand hover:text-ink",
    dark: "text-on-dark hover:text-secondary",
    brand: "text-on-dark hover:text-secondary",
  },
} as const;

/**
 * Disabled overrides every variant's fill, border and label at once, so the
 * disabled state looks identical wherever it appears.
 */
const DISABLED_CLASS =
  "bg-disabled-surface text-disabled-ink border-transparent hover:bg-disabled-surface";

export function Button(props: ButtonProps) {
  const { children, variant, tone, trailingIcon, leadingIcon } = props;

  // The text variant carries no fill or border, so horizontal padding would
  // push it out of alignment with the copy column it sits under.
  const shape = variant === "text" ? "rounded-pill" : SHAPE_CLASS;

  if (props.as === "link") {
    const { href, isExternal = false } = props;

    return (
      <Link
        href={href}
        className={cx(BASE_CLASS, shape, VARIANT_CLASS[variant][tone])}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </Link>
    );
  }

  const { type = "button", onClick, isDisabled = false, loading } = props;
  const isLoading = loading !== undefined;
  const isInoperable = isDisabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isInoperable}
      aria-busy={isLoading || undefined}
      className={cx(
        BASE_CLASS,
        shape,
        VARIANT_CLASS[variant][tone],
        isInoperable && DISABLED_CLASS,
      )}
    >
      {leadingIcon}
      {children}
      {/* The icon slot is reserved whether or not it is filled, so swapping in
          the spinner cannot change the button's width mid-submission. */}
      {isLoading ? <Spinner /> : trailingIcon}
      {isLoading && (
        <span role="status" className="visually-hidden">
          {loading.label}
        </span>
      )}
    </button>
  );
}

/**
 * Loading indicator. Rotation only — a transform, which is the one property
 * class the motion rules permit.
 *
 * Under `prefers-reduced-motion` the global policy stops the rotation. That is
 * intentional: the `role="status"` announcement, not the spinner, is what
 * actually communicates the pending state.
 */
function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
      focusable="false"
      data-motion="loop"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}
