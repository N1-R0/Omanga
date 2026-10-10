import Image from "next/image";
import type { CSSProperties } from "react";

import type { Object3D as ObjectName } from "@/content/home-v2.content";
import { cx } from "@/lib/cx";

export type Object3DProps = {
  name: ObjectName;
  /** Rendered width hint for `sizes`, in px at desktop. */
  size: number;
  className?: string;
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
  rotate = 0,
  preload = false,
}: Object3DProps) {
  // [CHANGED, 2026-10-10] Static, on the owner's instruction: the objects
  // used to bob on a 6s loop (`animate-float-3d`); they now stay put.
  const style: CSSProperties = { transform: `rotate(${rotate}deg)` };

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
        className,
      )}
      style={style}
    />
  );
}
