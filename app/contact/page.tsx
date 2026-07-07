import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Contact — Omanga",
  description:
    "Get in touch with the Omanga team for questions about payments, insurance, or partnerships.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're here to help."
        description="Our Africa travel specialists are available 24/7 to help you choose the right plan or resolve any issue."
      />

      <section className="bg-white px-6 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-black/10 bg-cream p-8">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50">
                  Email
                </h2>
                <a
                  href="mailto:info.omanga.biz"
                  className="mt-1 block text-lg font-medium text-maroon"
                >
                  info.omanga.biz
                </a>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50">
                  Support
                </h2>
                <p className="mt-1 text-base text-black/70">
                  24/7 dedicated contact centre for payments and insurance.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50">
                  Coverage
                </h2>
                <p className="mt-1 text-base text-black/70">
                  Serving travelers across 52 African countries.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form className="flex h-full flex-col gap-4 rounded-2xl border border-black/10 bg-white p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-black/70">
                  <span>Name</span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="rounded-lg border border-black/15 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-maroon/30"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-black/70">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-lg border border-black/15 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-maroon/30"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-black/70">
                <span>Subject</span>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="rounded-lg border border-black/15 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-maroon/30"
                />
              </label>
              <label className="flex flex-1 flex-col gap-1.5 text-sm font-medium text-black/70">
                <span>Message</span>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us more about your question..."
                  className="flex-1 resize-none rounded-lg border border-black/15 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-maroon/30"
                />
              </label>
              <button
                type="submit"
                className="mt-2 rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-maroon-dark active:scale-95"
              >
                Send message
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
