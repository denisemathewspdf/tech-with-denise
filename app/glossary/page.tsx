import { getAllGlossaryEntries } from "@/lib/glossary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Glossary",
  description:
    "Every confusing tech term, explained in plain English. No jargon, no gatekeeping.",
};

export default function GlossaryPage() {
  const entries = getAllGlossaryEntries();

  // Group entries by first letter for an alphabetical layout
  const grouped = entries.reduce<Record<string, typeof entries>>(
    (acc, entry) => {
      const letter = entry.term[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(entry);
      return acc;
    },
    {}
  );

  const letters = Object.keys(grouped).sort();

  return (
    <div className="relative z-10 px-6 md:px-10 pt-32 pb-24 max-w-3xl mx-auto">
      {/* Page header */}
      <p className="text-xs font-bold tracking-[3px] uppercase text-lavender mb-3">
        No jargon left behind
      </p>
      <h1 className="font-heading text-4xl md:text-5xl mb-4">Tech Glossary</h1>
      <p className="text-dark-soft text-lg mb-12 max-w-lg">
        Every confusing tech term, explained like you&apos;re five. Hover over
        highlighted terms in guides to see these definitions inline.
      </p>

      {/* Glossary entries by letter */}
      <div className="space-y-10">
        {letters.map((letter) => (
          <div key={letter}>
            {/* Letter heading */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-lavender-light rounded-xl flex items-center justify-center font-heading text-lg font-bold text-[#8878A8]">
                {letter}
              </span>
              <div className="flex-1 h-px bg-lavender-light" />
            </div>

            {/* Terms for this letter */}
            <div className="space-y-4">
              {grouped[letter].map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl p-6 border border-lavender-light/50 transition-all hover:shadow-soft"
                >
                  <h3 className="font-heading text-base font-bold text-dark mb-2">
                    {entry.term}
                  </h3>
                  <p className="text-dark-soft text-sm leading-relaxed">
                    {entry.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
