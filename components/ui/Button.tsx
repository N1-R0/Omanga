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

/** design.md § 9. Closed set of four. */
type ButtonVariant = "primary" | "secondary" | "text" | "white";

/**
 * How much room the control takes, independent of what it looks like.
 *
 * `main` is the measured default described above and is what every button on
 * the page uses. `compact` exists for the header bar and is not a general
 * "small button": the bar is a fixed 4rem, its nav sits at `--text-small`, and
 * a `--text-main` pill beside those labels is the one place the measured size
 * reads as oversized rather than as an invitation.
 *
 * Two sizes, and the second one justified by a specific container. A `sm | md |
 * lg` scale would invite every caller to pick a size by eye, which is how a
 * page ends up with four button heights and no rule.
 */
type ButtonSize = "main" | "compact";

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
  /** Defaults to `main`. Only the header bar passes `compact`. */
  size?: ButtonSize;
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
 * Shared geometry.
 *
 * [CHANGED, 2026-10-15] Revolut's button standard, measured on revolut.com at
 * 1440: a 42px pill, 10 × 24 padding, Aeonik 16 / 500 with normal tracking,
 * background and colour easing over 0.3s on cubic-bezier(0.15, 0.5, 0.5, 1),
 * and hover as the same fill at 85% opacity rather than a colour change.
 *
 * Here: Geist (`font-heading`, the Aeonik stand-in) 16 / 500, a fixed 44px
 * height (Revolut's 42 rounded up to the WCAG touch floor) and fixed 24px
 * inline padding. A fixed height, not padding, sets the size, so a bordered
 * button and a filled one are always exactly the same height. A slight press
 * (`active:scale-[0.98]`) confirms the tap.
 *
 * Replaces the 2026-08 geometry (fluid 14–16 × 20–24 padding, Inter) and the
 * ink-inversion hover.
 */
const BASE_CLASS =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap  min-h-11 min-w-11  " +
  "transition-[background-color,color,border-color,opacity,transform] duration-300 ease-[cubic-bezier(0.15,0.5,0.5,1)] " +
  "active:scale-[0.98] motion-reduce:active:scale-100";

/**
 * Size × label and box. `compact` is the header bar's button only: 36px tall
 * at `--text-small`, still with the 44px hit area underneath from `hit-area`.
 */
const SIZE_CLASS: Readonly<Record<ButtonSize, { text: string; shape: string }>> =
  {
    main: { text: "type-p3", shape: "h-11 px-6" },
    compact: { text: "type-p2", shape: "h-9 px-4" },
  } as const;

/**
 * Variant × tone.
 *
 * [CHANGED, 2026-10-15] Revolut's three treatments, with Omanga's crimson kept
 * as the primary fill on light surfaces so the brand colour survives:
 *
 *   primary     brand fill, white label (white fill, brand label on brand)
 *   white       white fill, ink label — over photography
 *   secondary   2px border; over dark or photo also a 10% white fill, as
 *               Revolut's outline button
 *   text        unchanged: a coloured label, no box
 *
 * Hover on every boxed variant is the same fill at 85% opacity (Revolut),
 * so a button group hovers as one control set.
 */
const HOVER = "hover:opacity-85";

const VARIANT_CLASS: Readonly<Record<ButtonVariant, Record<Tone, string>>> = {
  primary: {
    light: `bg-accent text-text-inverse ${HOVER}`,
    dark: `bg-accent text-text-inverse ${HOVER}`,
    brand: `bg-bg text-accent-text ${HOVER}`,
  },
  secondary: {
    light: `border-2 border-text text-text ${HOVER}`,
    dark: `border-2 border-text-inverse bg-neutral-0/10 text-text-inverse ${HOVER}`,
    brand: `border-2 border-text-inverse bg-neutral-0/10 text-text-inverse ${HOVER}`,
  },
  white: {
    light: `bg-bg text-text ${HOVER}`,
    dark: `bg-bg text-text ${HOVER}`,
    brand: `bg-bg text-text ${HOVER}`,
  },
  text: {
    light: "text-accent-text hover:text-text",
    dark: "text-text-inverse hover:opacity-80",
    brand: "text-text-inverse hover:opacity-80",
  },
} as const;

/**
 * Disabled overrides every variant's fill, border and label at once, so the
 * disabled state looks identical wherever it appears.
 */
const DISABLED_CLASS =
  "bg-neutral-200 text-neutral-400 border-transparent hover:bg-neutral-200 hover:opacity-100 active:scale-100";

export function Button(props: ButtonProps) {
  const {
    children,
    variant,
    tone,
    size = "main",
    trailingIcon,
    leadingIcon,
  } = props;

  const { text, shape: padding } = SIZE_CLASS[size];

  // The text variant carries no fill or border, so a fixed box would push it
  // out of alignment with the copy column it sits under.
  const shape = variant === "text" ? "rounded-full" : cx("rounded-full", padding);

  if (props.as === "link") {
    const { href, isExternal = false } = props;

    return (
      <Link
        href={href}
        className={cx(BASE_CLASS, text, shape, VARIANT_CLASS[variant][tone])}
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
        text,
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
        <span role="status" className="sr-only">
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
