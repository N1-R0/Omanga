export default function InsuranceCardGraphic({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-maroon-950 p-6 text-white shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Travel Insurance</span>
        <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-black">
          Gold
        </span>
      </div>
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/50">
            Policy Holder
          </p>
          <p className="mt-1 text-base font-medium">John Doe</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-white/50">
            Validity
          </p>
          <p className="mt-1 text-base font-medium">25/03/2027</p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-full bg-white py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90">
        Renew / Extend
      </button>
    </div>
  );
}
