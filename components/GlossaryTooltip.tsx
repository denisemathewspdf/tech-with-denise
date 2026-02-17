"use client";

import { useState } from "react";
import { glossary } from "@/lib/glossary";

type TermProps = {
  id: string; // The glossary entry ID (e.g., "api", "function")
  children: React.ReactNode; // The word to display inline
};

/**
 * Inline glossary tooltip for MDX guides.
 *
 * Usage in MDX: <Term id="api">API</Term>
 *
 * On hover, shows a lavender tooltip with the ELI5 definition.
 * The word gets a dotted underline so readers know it's interactive.
 */
export default function GlossaryTooltip({ id, children }: TermProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Look up the definition from our glossary data
  const entry = glossary.find((e) => e.id === id);

  if (!entry) {
    // If the term isn't in our glossary, just render the text normally
    return <span>{children}</span>;
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* The word itself — dotted underline to hint it's interactive */}
      <span className="border-b-2 border-dotted border-lavender cursor-help text-dark font-semibold">
        {children}
      </span>

      {/* Tooltip popup */}
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-50">
          <span className="block bg-lavender-light border border-lavender/30 rounded-xl px-4 py-3 shadow-card text-left">
            <span className="block text-xs font-bold text-dark mb-1">
              {entry.term}
            </span>
            <span className="block text-xs text-dark-soft leading-relaxed">
              {entry.definition}
            </span>
          </span>
          {/* Little triangle pointer */}
          <span className="block w-3 h-3 bg-lavender-light border-r border-b border-lavender/30 rotate-45 mx-auto -mt-1.5" />
        </span>
      )}
    </span>
  );
}
