export default function Logo({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo-omanga.svg" alt="Omanga" className={className} />;
}
