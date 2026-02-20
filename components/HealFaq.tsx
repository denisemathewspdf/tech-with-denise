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
          className="rounded-2xl overflow-hidden transition-all"
          style={{
            background: "#FBF8F3",
            border: `1px solid ${open === i ? "#C49A3C" : "#EDE6D6"}`,
            boxShadow: open === i ? "0 4px 20px rgba(196,154,60,0.1)" : "none",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
            style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            <span className="font-semibold text-sm md:text-base" style={{ color: "#2C2C2C" }}>
              {faq.q}
            </span>
            {/* Leaf/chevron icon */}
            <span
              className="flex-shrink-0 transition-transform duration-300"
              style={{
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                color: "#C49A3C",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C12 2 4 8 4 14a8 8 0 0 0 16 0C20 8 12 2 12 2z" />
                <line x1="12" y1="22" x2="12" y2="10" />
              </svg>
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: open === i ? "160px" : "0px" }}
          >
            <p
              className="px-6 pb-5 text-sm leading-relaxed"
              style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
