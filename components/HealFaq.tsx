"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long do I have access?",
    a: "Lifetime! Once you purchase, the content is yours forever. Go at your own pace.",
  },
  {
    q: "Do I need any experience with meditation or hypnosis?",
    a: "Nope! Everything is designed for complete beginners. I break it all down like I'm explaining it to my best friend.",
  },
  {
    q: "Can I buy just one module?",
    a: "Yes! The Starter tier lets you pick any single module for $47. You can always upgrade to full access later.",
  },
  {
    q: "What if it's not for me?",
    a: "I want you to feel confident in your investment. If you're not satisfied within 14 days, reach out and we'll make it right.",
  },
  {
    q: "When will new content be added?",
    a: "I'm constantly creating. VIP members get early access to all new modules, bonus videos, and audio tracks.",
  },
];

export default function HealFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#1E1530] rounded-2xl border border-amber-light dark:border-amber/20 overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
          >
            <span className="font-semibold text-dark dark:text-white text-sm md:text-base">
              {faq.q}
            </span>
            <span
              className={`text-amber text-2xl font-light flex-shrink-0 transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === i ? "max-h-40" : "max-h-0"
            }`}
          >
            <p className="px-6 pb-5 text-dark-soft dark:text-[#C4B0D8] text-sm leading-relaxed">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
