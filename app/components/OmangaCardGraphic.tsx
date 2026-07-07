import { Wifi } from "lucide-react";

export default function OmangaCardGraphic({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl ${className}`}
      style={{
        backgroundImage: "linear-gradient(135deg, #f7a94a 0%, #eb5757 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 rounded-full border border-white/30"
      />

      <div className="relative flex items-center justify-between">
        <span className="text-sm font-bold tracking-[0.15em]">OMANGA</span>
        <span
          aria-hidden
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20"
        >
          <Wifi className="h-4 w-4 rotate-90" strokeWidth={2.25} />
        </span>
      </div>

      <p className="relative mt-8 font-mono text-lg tracking-[0.2em] text-white/90">
        •••• •••• •••• 4821
      </p>

      <div className="relative mt-6 flex items-end justify-between">
        <span className="text-xs font-medium text-white/80">
          Your Omanga Card
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Afrigo
        </span>
      </div>
    </div>
  );
}
