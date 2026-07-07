"use client";

import { useState } from "react";
import { MessageCircleQuestion, ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

const QUESTIONS = [
  {
    q: "What is Omanga and who is it for?",
    a: "Omanga is an integrated destination services platform for travelers to Africa, combining a multi-currency payment wallet with short-term holiday insurance — built for anyone visiting the continent for business, leisure, or family.",
  },
  {
    q: "How do I sign up for the payments and insurance services?",
    a: "Create an Omanga account in minutes, fund your wallet in your home currency, and choose an insurance plan that fits your trip — everything happens on one platform.",
  },
  {
    q: "Is there a mobile app?",
    a: "Yes — the Omanga mobile app lets you manage your wallet, card, and insurance policy, and file claims on the go.",
  },
  {
    q: "Which hospitals and clinics are covered?",
    a: "Omanga partners with top-tier hospitals and HMOs, including phillips.hmo, across major cities so you get quality care wherever you travel.",
  },
  {
    q: "What currencies can I fund my wallet with?",
    a: "You can fund your Omanga wallet in USD, GBP, CAD, and more, with transparent, real-time exchange rates and no hidden fees.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-cream px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/50">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Frequently asked questions.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <div className="hover-lift flex h-full flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-maroon"
              >
                <MessageCircleQuestion className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-black">
                Still have questions?
              </h3>
              <p className="text-sm text-black/60">
                Our Africa travel specialists are available 24/7 to help you
                choose the right plan or resolve any issue.
              </p>
              <a
                href="/contact"
                className="mt-2 inline-block rounded-full bg-black px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-black/85"
              >
                Email Our Team
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
              {QUESTIONS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-medium text-black transition-colors hover:text-maroon"
                    >
                      {item.q}
                      <ChevronDown
                        aria-hidden
                        className={`h-4 w-4 shrink-0 text-black/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5 text-sm text-black/60">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
