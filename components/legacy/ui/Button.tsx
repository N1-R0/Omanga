import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

type ButtonVariant = "primary" | "secondary" | "text" | "white";

type ButtonSize = "main" | "compact";

type ButtonPresentation = {
  children: ReactNode;
  variant: ButtonVariant;
  tone: Tone;
  size?: ButtonSize;
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
};

export type ButtonProps =
  | (ButtonPresentation & {
      as: "button";
      type?: "button" | "submit" | "reset";
      onClick?: () => void;
      isDisabled?: boolean;
      loading?: { readonly label: string };
    })
  | (ButtonPresentation & {
      as: "link";
      href: string;
      isExternal?: boolean;
    });

const BASE_CLASS =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap  min-h-11 min-w-11  " +
  "transition-[background-color,color,border-color,opacity,transform] duration-300 ease-[cubic-bezier(0.15,0.5,0.5,1)] " +
  "active:scale-[0.98] motion-reduce:active:scale-100";

const SIZE_CLASS: Readonly<Record<ButtonSize, { text: string; shape: string }>> =
  {
    main: { text: "type-p3", shape: "h-11 px-6" },
    compact: { text: "type-p2", shape: "h-9 px-4" },
  } as const;

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
      {isLoading ? <Spinner /> : trailingIcon}
      {isLoading && (
        <span role="status" className="sr-only">
          {loading.label}
        </span>
      )}
    </button>
  );
}

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
