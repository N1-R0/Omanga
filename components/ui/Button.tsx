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

/** design-system.md § Button variants. Closed set of three. */
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
   * Leading icons are not supported: the design has none, and adding a slot
   * for a use case that does not exist is how a primitive rots.
   */
  trailingIcon?: ReactNode;
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
 * Shared geometry: pill radius, Inter SemiBold 14/17, 20 × 12 padding, 8 gap to
 * the trailing icon, and a 44px minimum hit area enforced here rather than by
 * callers.
 */
const BASE_CLASS =
  "inline-flex items-center justify-center gap-2 font-ui text-ui hit-area focus-ring transition-standard";

const SHAPE_CLASS = "rounded-pill px-5 py-3";

/**
 * Variant × tone.
 *
 * Hover behaviour follows the state rule: filled variants darken 8%, bordered
 * variants fill at 10% of their border colour. Both are precomputed tokens, so
 * no opacity modifier appears in a class string.
 *
 * [DECISION] `primary` on `brand` is not specified. A brand fill on the brand
 * band would be invisible, and design-system.md's ⚠ note requires the band to
 * carry "one filled primary instead of two outlined siblings". Resolved as a
 * white fill with a brand label (measured 7.4:1). Pending design confirmation.
 *
 * [MEASURED] `secondary` on `dark` drops its resting fill. See the inline note —
 * the specified white @20% fails AA over photography, which is the only place the
 * dark tone is used. Do not restore the fill without re-measuring.
 *
 * [NORMALISED] `secondary` on `brand` is drawn with a 0.5px border in Figma.
 * Sub-pixel borders render inconsistently across devices and disappear
 * entirely at some zoom levels, so it ships at 1px like every other border.
 */
const VARIANT_CLASS: Readonly<Record<ButtonVariant, Record<Tone, string>>> = {
  primary: {
    light: "bg-brand text-on-dark hover:bg-brand-hover",
    dark: "bg-brand text-on-dark hover:bg-brand-hover",
    brand: "bg-surface-page text-brand hover:bg-surface-light",
  },
  secondary: {
    light: "border border-ink text-ink hover:bg-ink-hover",
    // [MEASURED] No resting fill on the dark tone. design-system.md specifies
    // "White @ 20%" here, but the dark tone's real use is "beside a primary over
    // photography" — and measured against the actual hero photograph, a white
    // @20% fill lightens the 60%-scrimmed sky to ~rgb(133 133 133), putting the
    // white label at 3.83:1 and failing AA at every breakpoint. Transparent, the
    // same label sits on the scrim directly at 6.01:1, and the 1px white border
    // still marks the control at 5.74:1 against its background.
    //
    // The hover fill is retained: hover is transient, is never the only way to
    // identify the control, and the label is legible in both states.
    dark: "border border-on-dark text-on-dark hover:bg-overlay-strong-hover",
    brand: "border border-on-dark bg-overlay-soft text-on-dark hover:bg-overlay-soft-hover",
  },
  text: {
    light: "text-brand hover:text-brand-hover",
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
  const { children, variant, tone, trailingIcon } = props;

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
