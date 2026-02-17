"use client";

import { useState } from "react";

type ELI5ToggleProps = {
  code: React.ReactNode; // The code/technical side
  explanation: React.ReactNode; // The plain-English side
};

/**
 * Side-by-side (desktop) or tabbed (mobile) component for guides.
 *
 * Shows code on the left and Denise's explanation on the right.
 * On mobile, it switches to tabs so readers can toggle between views.
 */
export default function ELI5Toggle({ code, explanation }: ELI5ToggleProps) {
  const [activeTab, setActiveTab] = useState<"code" | "explain">("code");

  return (
    <div className="my-10">
      {/* Mobile tabs — only visible on small screens */}
      <div className="flex md:hidden gap-2 mb-4">
        <button
          onClick={() => setActiveTab("code")}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
            activeTab === "code"
              ? "bg-dark text-white"
              : "bg-white text-dark-soft border border-lavender-light"
          }`}
        >
          Code View
        </button>
        <button
          onClick={() => setActiveTab("explain")}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
            activeTab === "explain"
              ? "bg-peach text-dark"
              : "bg-white text-dark-soft border border-lavender-light"
          }`}
        >
          Denise Explains ✨
        </button>
      </div>

      {/* Desktop: side by side | Mobile: tabbed */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Code panel */}
        <div
          className={`rounded-2xl overflow-hidden transition-all duration-300 ${
            activeTab !== "code" ? "hidden md:block" : ""
          }`}
        >
          <div className="bg-[#2D2139] rounded-2xl p-1">
            {/* Window dots */}
            <div className="flex gap-1.5 px-4 pt-3 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-peach" />
              <span className="w-2.5 h-2.5 rounded-full bg-gold" />
              <span className="w-2.5 h-2.5 rounded-full bg-mint" />
            </div>
            <div className="px-4 pb-4">{code}</div>
          </div>
        </div>

        {/* Explanation panel */}
        <div
          className={`transition-all duration-300 ${
            activeTab !== "explain" ? "hidden md:block" : ""
          }`}
        >
          <div className="bg-white rounded-2xl p-6 border border-peach-light h-full">
            <div className="border-l-4 border-peach pl-4">
              <p className="text-sm font-bold text-peach mb-3">
                Denise explains: ✨
              </p>
              <div className="text-dark-soft text-sm leading-relaxed font-body">
                {explanation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
