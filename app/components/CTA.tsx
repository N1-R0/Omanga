import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section
      id="contact"
      className="px-6 py-24 lg:px-10"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #cfe0f0 0%, #f3dfe6 45%, #f7ead9 100%)",
      }}
    >
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
          Ready to Experience Africa?
        </h2>
        <p className="max-w-xl text-base text-black/60">
          Join thousands of travelers who trust Omanga for their African
          adventures. The spirit of Ubuntu lives in us all — through our
          collective unity, we achieve great things.
        </p>

        <form className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="you@example.com"
            aria-label="Email address"
            className="w-full flex-1 rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-maroon/30"
          />
          <button
            type="submit"
            className="rounded-full bg-maroon-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            Get Started
          </button>
        </form>
      </Reveal>
    </section>
  );
}
