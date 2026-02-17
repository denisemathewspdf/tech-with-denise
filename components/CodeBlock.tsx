"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

type CodeBlockProps = {
  code: string;
  language: string;
  explanation: string; // The "Denise explains" plain-English breakdown
};

/**
 * The signature "Tech with Denise" code block.
 *
 * Shows syntax-highlighted code with a toggle to switch to a
 * conversational explanation. The code view has window-style dots
 * (pink, gold, sky blue) and the explanation view has a soft pink
 * left border with Quicksand font.
 */
export default function CodeBlock({
  code,
  language,
  explanation,
}: CodeBlockProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-lavender-light/50 shadow-card">
      {/* Tab bar */}
      <div className="flex items-center justify-between bg-[#2D2139] px-4 py-3">
        {/* Window dots — brand colors */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-peach" />
          <span className="w-3 h-3 rounded-full bg-gold" />
          <span className="w-3 h-3 rounded-full bg-mint" />
        </div>

        {/* Toggle buttons */}
        <div className="flex gap-1 bg-white/10 rounded-full p-0.5">
          <button
            onClick={() => setShowExplanation(false)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              !showExplanation
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setShowExplanation(true)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              showExplanation
                ? "bg-peach/30 text-peach-light"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Denise explains ✨
          </button>
        </div>
      </div>

      {/* Gradient bar under the tab bar */}
      <div className="h-[3px] bg-gradient-to-r from-peach via-lavender to-mint" />

      {/* Content area */}
      <div className="bg-[#2D2139] min-h-[120px]">
        {showExplanation ? (
          // "Denise explains" view — conversational, warm, approachable
          <div className="p-6 border-l-4 border-peach ml-4 mr-4 my-4 bg-white/5 rounded-r-xl">
            <p className="text-sm font-semibold text-peach mb-2">
              Denise explains:
            </p>
            <p className="text-peach-light/90 font-body text-sm leading-relaxed">
              {explanation}
            </p>
          </div>
        ) : (
          // Code view — syntax highlighted with pastel theme
          <Highlight
            theme={pastelTheme}
            code={(code || "").trim()}
            language={language}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {/* Line number */}
                    <span className="inline-block w-8 text-right mr-4 text-white/20 select-none text-xs">
                      {i + 1}
                    </span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        )}
      </div>
    </div>
  );
}

// Custom pastel theme that matches the "Tech with Denise" brand
const pastelTheme = {
  ...themes.nightOwl,
  plain: {
    color: "#e0d8eb",
    backgroundColor: "#2D2139",
  },
  styles: [
    ...themes.nightOwl.styles,
    {
      types: ["keyword", "builtin"],
      style: { color: "#F4A7BB" }, // peach
    },
    {
      types: ["string", "char"],
      style: { color: "#A8D8EA" }, // mint
    },
    {
      types: ["function"],
      style: { color: "#F0D9A0" }, // gold
    },
    {
      types: ["comment"],
      style: { color: "#A99BB5", fontStyle: "italic" as const },
    },
    {
      types: ["variable", "parameter"],
      style: { color: "#C4B8E8" }, // lavender
    },
    {
      types: ["number", "boolean"],
      style: { color: "#F5C2D0" }, // rose
    },
    {
      types: ["operator", "punctuation"],
      style: { color: "#e0d8eb" },
    },
  ],
};
