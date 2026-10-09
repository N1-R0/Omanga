import Image from "next/image";
import type { CSSProperties } from "react";

import type { Object3D as ObjectName } from "@/content/home-v2.content";
import { cx } from "@/lib/cx";

export type Object3DProps = {
  name: ObjectName;
  /** Rendered width hint for `sizes`, in px at desktop. */
  size: number;
  className?: string;
  float?: boolean;
  /** Seconds. Staggers sibling objects so they don't bob in step. */
  delay?: number;
  rotate?: number;
  preload?: boolean;
};

/**
 * One glossy 3D object from public/3d/web.
 *
 * Always decorative (`alt=""`): every object sits beside a heading or label
 * that already says what it stands for, so announcing "crimson wallet" too
 * would only add noise for screen reader users.
 *
 * Width is set by the caller's class, height follows the 1:1 source.
 */
export function Object3D({
  name,
  size,
  className,
  float = false,
  delay = 0,
  rotate = 0,
  preload = false,
}: Object3DProps) {
  const style = {
    "--float-delay": `${delay}s`,
    "--float-rotate": `${rotate}deg`,
    transform: float ? undefined : `rotate(${rotate}deg)`,
  } as CSSProperties;

  return (
    <Image
      src={`/3d/web/${name}.webp`}
      alt=""
      width={512}
      height={512}
      sizes={`${size}px`}
      preload={preload}
      draggable={false}
      className={cx(
        "pointer-events-none h-auto select-none",
        float && "animate-float-3d",
        className,
      )}
      style={style}
    />
  );
}
