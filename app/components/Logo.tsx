export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-sm ring-1 ring-black/5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-omanga.svg"
        alt="Omanga"
        className="h-full w-full object-contain"
      />
    </span>
  );
}
