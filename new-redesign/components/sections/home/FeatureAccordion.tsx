"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import { cx } from "@/lib/cx";
import { CardTitle } from "@/new-redesign/components/ui/Card";
import { FeatureLottie } from "@/new-redesign/components/sections/home/FeatureLottie";
import { FeatureScreen } from "@/new-redesign/components/sections/home/FeatureScreen";
import { href } from "@/new-redesign/config/routes";
import { homeFeatures } from "@/new-redesign/content/home.content";

/**
 * Accordion and app-screen panel (img 2; design system § Feature accordion
 * and panel).
 *
 * One row is open at a time, and the first is open on load. Each header is a
 * button with aria-expanded/aria-controls, so it works from the keyboard.
 *
 * From 1024px the open row's screen shows on the U2 texture panel to the
 * right, cross-fading as rows change. Below that there's no side panel; the
 * screen sits inside the open row on a slice of the same texture.
 *
 * Items with a `lottie` (owner, 2026-10-22) play their Jitter motion scene
 * over the texture in place of glass + screen; the Lottie has no satin of its
 * own. The v2 MP4 scenes (`video`) were retired once all five had a Lottie.
 */
export function FeatureAccordion({ gbpToNgn }: { gbpToNgn: number }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();
  const { items, texture } = homeFeatures;

  return (
    // Asset: list and panel 24px apart (16 when stacked); rows 16px apart
    // (8 on mobile); rows padded 20 left, 32 right, 20 bottom, with 24 on
    // top of the open row and 12 between its title and description.
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-[var(--grid-gap-wide)]">
      <ul className="flex flex-col gap-2 lg:gap-4">
        {items.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${baseId}-${i}`;
          return (
            <li
              key={item.title}
              className={cx(
                // No border (owner, 2026-10-21): the open row is set apart by
                // its white fill against the grey closed rows.
                "rounded-md transition-colors duration-[var(--duration-base)] ease-standard",
                isOpen ? "bg-surface" : "bg-surface-muted hover:bg-neutral-200",
              )}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(i)}
                  // flex, so the 17.6px H3 sets the height rather than the
                  // 24px line box: closed rows are 58px tall, as on Asset.
                  className={cx("flex w-full rounded-md pr-8 pl-5 text-left", isOpen ? "pt-6 pb-0" : "py-5")}
                >
                  {isOpen ? <CardTitle>{item.title}</CardTitle> : <span className="type-h3">{item.title}</span>}
                </button>
              </h3>
              {/* grid-rows 0fr → 1fr animates to the content's own height. */}
              <div
                id={panelId}
                className={cx(
                  "grid transition-[grid-template-rows] duration-[var(--duration-base)] ease-standard",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  <div className="pt-3 pr-8 pb-5 pl-5">
                    <p className="type-p2 text-text-secondary">{item.text}</p>
                    <Link href={href(item.link.path)} className="type-p3 mt-3 inline-flex text-accent-text hover:underline">
                      {item.link.label} →
                    </Link>
                    {/* Below 1024: the screen lives inside the open row. */}
                    {/* -mr-3 evens the row's 20 / 32 side padding so the panel is centred. */}
                    {/* 360 from 640: at tablet widths 260 was too short for the scene's card. */}
                    <div className="relative mt-4 -mr-3 flex h-[260px] items-center sm:h-[360px] justify-center overflow-hidden rounded-sm lg:hidden">
                      <Image src={texture.src} alt="" fill sizes="(max-width: 1024px) 100vw, 0px" className="object-cover" />
                      {/* Scenes are zoomed 1.35× here: at phone width the scene's card is
                          only half the panel, so its type is too small to read without it. */}
                      {"lottie" in item && item.lottie ? (
                        <FeatureLottie scene={item.lottie} active={isOpen} className="absolute inset-0" style={{ scale: item.lottie.phoneZoom ?? 1.35 }} />
                      ) : (
                        // items[i], not item: every item has a scene today, so TS narrows
                        // item to never here. The static screen stays as the fallback.
                        <div className="glass relative w-[88%] max-w-[320px]">
                          <FeatureScreen screen={items[i].screen} gbpToNgn={gbpToNgn} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* From 1024: one texture panel, screens stacked and cross-faded. */}
      <div aria-hidden className="relative hidden min-h-[380px] overflow-hidden rounded-sm lg:block">
        <Image src={texture.src} alt="" fill sizes="(min-width: 1024px) 540px, 0px" className="object-cover" />
        {items.map((item, i) => (
          <div
            key={item.title}
            className={cx(
              "absolute inset-0 flex items-center justify-center transition-[opacity,translate] duration-[var(--duration-base)] ease-standard",
              open === i ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {"lottie" in item && item.lottie ? (
              <FeatureLottie scene={item.lottie} active={open === i} className="absolute inset-0" />
            ) : (
              <div className="glass w-[72%] max-w-[320px]">
                <FeatureScreen screen={items[i].screen} gbpToNgn={gbpToNgn} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
