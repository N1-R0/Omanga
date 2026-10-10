/**
 * App Store and Google Play badges under a "Coming soon" label.
 *
 * [ADDED, 2026-10-10] On the owner's instruction, matching the Wise reference
 * (Y6). The app is not in either store yet, so the badges are not links: they
 * render as plain black pills, and the label above them says why. When the
 * listings exist, wrap each badge in an external link and drop the label.
 *
 * The group carries one accessible name ("Coming soon to the App Store and
 * Google Play"); the logos are decorative.
 */
const APPLE =
  "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z";
const PLAY =
  "M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198 2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658 16.802 8.99l-2.303 2.303-8.635-8.635z";

function Badge({ icon, small, big }: { icon: string; small: string; big: string }) {
  return (
    <span className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-ink px-3.5 text-on-dark">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0" fill="currentColor">
        <path d={icon} />
      </svg>
      <span aria-hidden="true" className="flex flex-col font-sans leading-none">
        <span className="text-[0.625rem] font-medium tracking-[0.01em]">{small}</span>
        <span className="mt-0.5 text-[1.0625rem] font-semibold tracking-[-0.01em]">{big}</span>
      </span>
    </span>
  );
}

export function StoreBadges({ label, className }: { label: string; className?: string }) {
  return (
    <div role="group" aria-label={`${label} to the App Store and Google Play`} className={className}>
      <p aria-hidden="true" className="font-sans text-small font-semibold text-secondary">
        {label}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-2.5">
        <Badge icon={APPLE} small="Download on the" big="App Store" />
        <Badge icon={PLAY} small="GET IT ON" big="Google Play" />
      </div>
    </div>
  );
}
